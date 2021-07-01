import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useAsyncError } from "../../hooks/asyncError";
import * as tf from "@tensorflow/tfjs";
import NextStepButton from "../common/next-step/NextStepButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import testImgSrc from "../../assets/Archivo_043.jpeg";
import "./detector.css";

const Detector = ({ viewPortWidth, widthScale, history }) => {
  const classes = 5;
  const frameRate = 42; // equivalent to 24 fps
  const fps = 24;
  const bufferSize = 2; // in seconds
  const bufferedFrames = bufferSize * fps; // one second buffer
  const detectionFramesToWait = useRef(24);
  const [model, setModel] = useState(null);
  const [readyToDetect, setReadyToDetect] = useState(false);
  const [detect, setDetect] = useState(false);
  const framesBuffer = useRef([]);
  const detectionBuffer = useRef([]);
  const canvas = useRef(null);
  const ctx = useRef(null);
  const throwError = useAsyncError();
  const [message, setMessage] = useState("");
  const [selectedDetection, setSelectedDetection] = useState(null);
  const [detections, setDetections] = useState([null, null, null, null, null]);
  const cam = useRef(null);
  const [camReady, setCamReady] = useState(false);

  useEffect(() => {
    if (model === null) {
      tf.ready()
        .then(() => {
          // tf.setBackend("cpu");
          console.log("Using backend: " + tf.getBackend());
          tf.loadGraphModel("./model/model.json")
            .then(async (_model) => {
              const testImage = new Image();
              testImage.src = testImgSrc;
              testImage.onload = async () => {
                const initTensor = tf.browser.fromPixels(testImage);
                const initialDetection = await _model.executeAsync(initTensor);
                initialDetection.dispose();
                await calcInitialDps(initTensor, _model);
                initBuffers();
                setModel(_model);
              };
            })
            .catch((error) => {
              throwError(error);
            });
        })
        .catch((error) => {
          throwError(error);
        });
    }
  }, []);

  const initBuffers = () => {
    for (let i = 0; i < bufferedFrames; i++) {
      framesBuffer.current.push(tf.zeros([320, 320, 3], "int32"));
      detectionBuffer.current.push([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]); //todo issue a deep copy
    }
  };

  useEffect(() => {
    let track;
    const constraints = {
      video: {
        facingMode: "environment"
      },
      audio: false
    };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      track = stream.getTracks()[0];
      cam.current.srcObject = stream;
      cam.current.playsinline = true;
      cam.current.onloadedmetadata = () => {
        initCanvas(
          document.documentElement.clientHeight,
          document.documentElement.clientWidth
        );
        cam.current.play();
        setCamReady(true);
      };
    });
    return () => {
      if (track) {
        track.stop();
      }
    };
  }, []);

  const initCanvas = (height, width) => {
    canvas.current.height = height;
    canvas.current.width = width;
    ctx.current = canvas.current.getContext("2d");
  };

  function* bufferIndexGen(maxIndex) {
    const top = maxIndex - 1;
    let i = 0;
    while (true) {
      yield i;
      i = i === top ? 0 : i + 1;
    }
  }

  useEffect(() => {
    let bufferingIntervalId;
    let bufferingGapTimeoutId;
    let renderingIntervalId;
    if (camReady && detect) {
      bufferingIntervalId = bufferingLoop();
      bufferingGapTimeoutId = setTimeout(() => {
        renderingIntervalId = renderingLoop();
      }, detectionFramesToWait.current * frameRate * 2);
    }
    return () => {
      if (bufferingIntervalId) {
        clearInterval(bufferingIntervalId);
      }
      if (bufferingGapTimeoutId) {
        clearTimeout(bufferingGapTimeoutId);
      }
      if (renderingIntervalId) {
        clearInterval(renderingIntervalId);
      }
    };
  }, [camReady, detect]);

  const bufferingLoop = () => {
    const indexGen = bufferIndexGen(framesBuffer.current.length);
    const intervalId = setInterval(() => {
      const nextFrameIndex = indexGen.next().value;
      const frameTensor = tf.browser.fromPixels(cam.current);
      framesBuffer.current[nextFrameIndex] = frameTensor;
      if (nextFrameIndex % detectionFramesToWait.current === 0) {
        detectFrame(nextFrameIndex, frameTensor);
      }
    }, frameRate);
    return intervalId;
  };

  const detectFrame = async (index, frameTensor) => {
    const detectionTensor = await model.executeAsync(frameTensor);
    const detection = detectionTensor.arraySync();
    detection.length > 0 &&
      detection[0].forEach((box) => {
        const cls = box[5] - 1;
        detectionBuffer.current[index][cls][0] = box[0];
        detectionBuffer.current[index][cls][1] = box[1];
        detectionBuffer.current[index][cls][2] = box[2] - box[0];
        detectionBuffer.current[index][cls][3] = box[3] - box[1];
      });
    detectionTensor.dispose();
  };

  const renderingLoop = () => {
    const indexGen = bufferIndexGen(framesBuffer.current.length);
    const intervalId = setInterval(async () => {
      const nextFrameIndex = indexGen.next().value;
      const frameTensor = framesBuffer.current[nextFrameIndex];
      const imageData = await tf.browser.toPixels(frameTensor);
      const frame = new ImageData(
        imageData,
        frameTensor.shape[1],
        frameTensor.shape[0]
      );
      ctx.current.putImageData(frame, 0, 0);
      if (nextFrameIndex % detectionFramesToWait.current === 0) {
        drawDetection(nextFrameIndex);
      }
      frameTensor.dispose();
    }, frameRate);
    return intervalId;
  };

  const drawDetection = (index) => {
    //todo hacerlo async
    const _detections = [...detections];
    const thisFrameDetections = [...detectionBuffer.current[index]];
    thisFrameDetections.forEach((box, cls) => {
      const key = "__detection_class_" + cls;
      _detections[cls] = (
        <div
          key={key}
          id={key}
          className="detection detection-position"
          style={{
            display: box[3] === 0 ? "none" : "flex",
            "--top": box[0],
            "--left": box[1],
            "--height": box[2],
            "--width": box[3],
            "--next_top": box[0],
            "--next_left": box[1],
            "--next_height": box[2],
            "--next_width": box[3]
          }}
          onClick={(e) => {
            e.stopPropagation();
            detectionClicked(cls);
          }}
        >
          <div className="plus-sign">+</div>
        </div>
      );
    });
    setDetections(_detections);
    detectionBuffer.current[index] = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
  };

  const calcInitialDps = async (imageTensor, _model) => {
    // DPS stands for detections per second
    let acc = 0;
    for (let i = 0; i < 20; i++) {
      const initTime = new Date();
      const detection = await _model.executeAsync(imageTensor);
      detection.dispose();
      acc += new Date() - initTime;
    }
    const dps = Math.floor(1 / (acc / 20000));
    detectionFramesToWait.current = Math.ceil(fps / dps);
    console.log("Detections per second = " + dps);
    setMessage("Tu equipo puede realizar " + dps + " detecciones por segundo.");
    setReadyToDetect(true);
    console.log(
      "Frames to wait for detection = " + detectionFramesToWait.current
    );
  };

  const detectionClicked = (cls) => {
    switch (cls) {
      case 0: {
        setSelectedDetection("Perilla de cambio de tracción");
        break;
      }
      case 1: {
        setSelectedDetection("Botones de control de tracción");
        break;
      }
      case 2: {
        setSelectedDetection("Control de tracción");
        break;
      }
      case 3: {
        setSelectedDetection("Bloqueo de diferencial");
        break;
      }
      case 4: {
        setSelectedDetection("Control de descenso");
        break;
      }
      default: {
        setSelectedDetection(null);
      }
    }
  };

  return (
    <>
      <canvas
        ref={canvas}
        style={{ position: "absolute", top: "0px", left: "0px" }}
        onClick={(e) => {
          e.stopPropagation();
          detectionClicked(-1);
        }}
      ></canvas>
      <video ref={cam} playsInline style={{ display: "none" }}></video>
      {!readyToDetect && !detect && (
        <div className="preparing" style={{ "--width": viewPortWidth }}>
          <h1 className="preparing-message">Preparando para detectar</h1>{" "}
          <h2 className="wait">Aguardá un instante por favor</h2>
        </div>
      )}
      {readyToDetect && !detect && (
        <div className="preparing" style={{ "--width": viewPortWidth }}>
          <h1 className="preparing-message">
            Listo! <br></br> Tocá la detección para obtener más información
            sobre el componente
          </h1>
          <div
            className="detection"
            style={{ margin: "16px 24px 32px 24px" }}
            onClick={(e) => {
              e.stopPropagation();
              setDetect(true);
            }}
          >
            <div className="plus-sign">+</div>
          </div>
          <h2 className="wait">{message}</h2>
          <NextStepButton
            legend="INICIAR DETECCIÓN"
            onNextClick={(e) => {
              e.stopPropagation();
              setDetect(true);
            }}
          />
        </div>
      )}
      {readyToDetect && detect && <>{detections} </>}
      <div
        className="detector-header"
        style={{
          "--width-scale": widthScale
        }}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="chevron-back"
          onClick={() => {
            history.push("/");
          }}
        />
        <p className="component-detector-title">Detectar componentes</p>
      </div>
      {selectedDetection && (
        <div
          className="selected-component"
          style={{
            "--width-scale": widthScale
          }}
        >
          <p className="component-detector-title">{selectedDetection}</p>
        </div>
      )}
    </>
  );
};

Detector.propTypes = {
  viewPortWidth: PropTypes.number.isRequired,
  widthScale: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    viewPortWidth: state.constants.viewPortWidth,
    widthScale: state.constants.widthScale
  };
};

export default connect(mapStateToProps)(Detector);
