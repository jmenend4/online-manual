import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useAsyncError } from "../../hooks/asyncError";
import * as tf from "@tensorflow/tfjs";
import { useDemoVideo } from "./demoFrames";
import NextStepButton from "../common/next-step/NextStepButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
// import testImgSrc from "../../assets/Archivo_043.jpeg";
import testImgSrc from "../../assets/demo_frames/frame_video4_0.jpg";
import "./detector.css";
import { set } from "immer/dist/internal";

const Detector = ({ widthScale, history }) => {
  const classes = 5;
  const frameRate = 42; // equivalent to 24 fps
  const fps = 24;
  const bufferSize = 1; // in seconds
  const bufferedFrames = bufferSize * fps; // one second buffer
  const detectionFramesToWait = useRef(24);
  const demoVideo = useRef(null);
  const [model, setModel] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [readyToDetect, setReadyToDetect] = useState(false);
  const [detect, setDetect] = useState(false);
  const detectionBuffer = useRef([]);
  const canvas = useRef(null);
  const ctx = useRef(null);
  const throwError = useAsyncError();
  const [message, setMessage] = useState(null);
  const getDemoVideo = useDemoVideo();
  const [detections, setDetections] = useState([null, null, null, null, null]);
  const [selectedDetection, setSelectedDetection] = useState(null);

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
                // console.log(initialDetection.arraySync());
                initialDetection.dispose();
                await calcInitialDps(initTensor, _model);
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

  useEffect(() => {
    // load test video and set handlers
    loadDemoVideo();
  }, []);

  const loadDemoVideo = async () => {
    demoVideo.current = await getDemoVideo();
    initBuffer();
    // canvas.current.width = demoVideo.current[0].shape[1];
    canvas.current.width = demoVideo.current[0].width;
    // canvas.current.height = demoVideo.current[0].shape[0];
    canvas.current.height = demoVideo.current[0].height;
    ctx.current = canvas.current.getContext("2d");
    setVideoLoaded(true);
  };

  const initBuffer = () => {
    for (let i = 0; i < demoVideo.current.length; i++) {
      const clearDetection = [];
      for (let j = 0; j < classes; j++) {
        clearDetection.push([0, 0, 0, 0]);
      }
      detectionBuffer.current.push(clearDetection);
    }
  };

  useEffect(() => {
    // video buffer loader and consumer laucher
    let detectionIntervalId;
    let bufferingGapTimeoutId;
    let videoBufferConsumeIntervalId;
    if (model && videoLoaded && readyToDetect && detect) {
      detectionIntervalId = detectionloop();
      bufferingGapTimeoutId = setTimeout(() => {
        videoBufferConsumeIntervalId = videoBufferConsumeLoop();
      }, detectionFramesToWait.current * frameRate * 2);
    }
    return () => {
      if (detectionIntervalId) {
        clearInterval(detectionIntervalId);
      }
      if (bufferingGapTimeoutId) {
        clearTimeout(bufferingGapTimeoutId);
      }
      if (videoBufferConsumeIntervalId) {
        clearTimeout(videoBufferConsumeIntervalId);
      }
    };
  }, [model, videoLoaded, readyToDetect, detect]);

  const detectionloop = () => {
    const indexGen = bufferIndexGen(demoVideo.current.length);
    const intervalId = setInterval(() => {
      const i = indexGen.next().value;
      if (i % detectionFramesToWait.current === 0) {
        detectFrame(i);
      }
    }, frameRate);
    return intervalId;
  };

  const detectFrame = async (index) => {
    const frameTensor = tf.browser.fromPixels(demoVideo.current[index]);
    const detectionTensor = await model.executeAsync(frameTensor);
    const detection = detectionTensor.arraySync();
    detection[0].forEach((box) => {
      const cls = box[5] - 1;
      detectionBuffer.current[index][cls][0] = box[0];
      detectionBuffer.current[index][cls][1] = box[1];
      detectionBuffer.current[index][cls][2] = box[2] - box[0];
      detectionBuffer.current[index][cls][3] = box[3] - box[1];
    });
    // detectionBuffer.current[index] = await detection.arraySync();
    frameTensor.dispose();
    detectionTensor.dispose();
  };

  const videoBufferConsumeLoop = () => {
    const indexGen = bufferIndexGen(demoVideo.current.length);
    const intervalId = setInterval(() => {
      const index = indexGen.next().value;
      ctx.current.drawImage(demoVideo.current[index], 0, 0);
      if (index % detectionFramesToWait.current === 0) {
        drawDetection(index);
      }
    }, frameRate);
    return intervalId;
  };

  const drawDetection = (index) => {
    const _detections = [...detections];
    detectionBuffer.current[index].forEach((box, cls) => {
      const key = "__detection_class_" + cls + 1;
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

  function* bufferIndexGen(maxIndex) {
    const top = maxIndex - 1;
    let i = 0;
    while (true) {
      yield i;
      i = i === top ? 0 : i + 1;
    }
  }

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

  return (
    <>
      {!readyToDetect && !detect && (
        <div className="preparing">
          <h1 className="preparing-message">Preparando para detectar</h1>{" "}
          <h2 className="wait">Aguardá un instante por favor</h2>
        </div>
      )}
      {readyToDetect && !detect && (
        <div className="preparing">
          <h1 className="preparing-message">
            Listo! <br></br> Tocá la detección para obtener más información
            sobre el componente
          </h1>
          <div className="detection" style={{ margin: "16px 24px 32px 24px" }}>
            <div className="plus-sign">+</div>
          </div>
          <h2 className="wait">{message}</h2>
          <NextStepButton
            legend="INICIAR DETECCIÓN"
            onNextClick={() => {
              // setMessage("holahola");
              setDetect(true);
            }}
          />
        </div>
      )}
      <canvas
        ref={canvas}
        style={{ position: "absolute", top: "0px", left: "0px" }}
        onClick={(e) => {
          e.stopPropagation();
          detectionClicked(-1);
        }}
      ></canvas>
      {readyToDetect && detect && <> {detections} </>}
      <div
        className="detector-header"
        style={{
          "--width-scale": widthScale
        }}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="chevron-back"
          onClick={() => history.push("/")}
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
  widthScale: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return { widthScale: state.constants.widthScale };
};

export default connect(mapStateToProps)(Detector);
