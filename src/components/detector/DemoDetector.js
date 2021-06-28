import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useAsyncError } from "../../hooks/asyncError";
import * as tf from "@tensorflow/tfjs";
import { useDemoVideo } from "./demoFrames";
import NextStepButton from "../common/next-step/NextStepButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useModel } from "./model/useModel";
import { useDetector } from "./useDetector";
import "./detector.css";
import { useMovingMean } from "./useMovingMeans";

const Detector = ({ viewPortWidth, widthScale, history }) => {
  const [detect, setDetect] = useState(false);
  const [selectedDetection, setSelectedDetection] = useState(null);
  const [message, setMessage] = useState(null);
  const canvas = useRef(null);
  const [demoVideo, videoLoaded] = useDemoVideo();
  const frame = useRef(null);
  const [dps, predict] = useModel();
  const detections = useDetector(
    dps,
    frame,
    canvas,
    predict,
    detect,
    setSelectedDetection
  );

  // const frameRate = 42; // equivalent to 24 fps
  // const fps = 24;
  // const detectionFramesToWait = useRef(24);

  // const [movingMean, pushMovingMeanValue] = useMovingMean(12);

  // const [model, setModel] = useState(null);
  // const [readyToDetect, setReadyToDetect] = useState(false);
  // const detectionBuffer = useRef([]);
  // const ctx = useRef(null);
  // const [detections, setDetections] = useState([null, null, null, null, null]);

  useEffect(() => {
    setMessage(
      "Tu equipo puede realizar " +
        Math.floor(dps) +
        " detecciones por segundo."
    );
  }, [dps]);

  useEffect(() => {
    let intervalId;
    let i = 0;
    if (videoLoaded) {
      canvas.current.width = viewPortWidth;
      canvas.current.height = demoVideo.current[0].height;
      intervalId = setInterval(() => {
        frame.current = demoVideo.current[i];
        // const ctx = canvas.current.getContext("2d");
        // console.log(i);
        // ctx.drawImage(frame.current, 0, 0);
        i = i == demoVideo.current.length - 1 ? 0 : i + 1;
      }, 33);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [videoLoaded]);

  // useEffect(() => {
  //   // load test video and set handlers
  //   loadDemoVideo();
  // }, []);

  // const loadDemoVideo = async () => {
  //   demoVideo = await getDemoVideo();
  //   // initBuffers();
  //   canvas.current.width = viewPortWidth;
  //   canvas.current.height = demoVideo.current[0].height;
  //   // ctx.current = canvas.current.getContext("2d");
  //   setVideoLoaded(true);
  // };

  // const initBuffers = () => {
  //   for (let i = 0; i < demoVideo.current.length; i++) {
  //     detectionBuffer.current.push([
  //       [-1, -1, -1, -1],
  //       [-1, -1, -1, -1],
  //       [-1, -1, -1, -1],
  //       [-1, -1, -1, -1],
  //       [-1, -1, -1, -1]
  //     ]);
  //   }
  // };

  // useEffect(() => {
  //   // video buffer loader and consumer laucher
  //   let detectionIntervalId;
  //   let bufferingGapTimeoutId;
  //   let videoBufferConsumeIntervalId;
  //   if (model && videoLoaded && readyToDetect && detect) {
  //     detectionIntervalId = detectionloop();
  //     bufferingGapTimeoutId = setTimeout(() => {
  //       videoBufferConsumeIntervalId = videoBufferConsumeLoop();
  //     }, detectionFramesToWait.current * frameRate * 4);
  //   }
  //   return () => {
  //     if (detectionIntervalId) {
  //       clearInterval(detectionIntervalId);
  //     }
  //     if (bufferingGapTimeoutId) {
  //       clearTimeout(bufferingGapTimeoutId);
  //     }
  //     if (videoBufferConsumeIntervalId) {
  //       clearTimeout(videoBufferConsumeIntervalId);
  //     }
  //   };
  // }, [model, videoLoaded, readyToDetect, detect]);

  // const detectionloop = () => {
  //   const indexGen = bufferIndexGen(demoVideo.current.length);
  //   const intervalId = setInterval(() => {
  //     const i = indexGen.next().value;
  //     if (i % detectionFramesToWait.current === 0) {
  //       detectFrame(i);
  //     }
  //   }, frameRate);
  //   return intervalId;
  // };

  // const detectFrame = async (index) => {
  //   const frameTensor = tf.browser.fromPixels(demoVideo.current[index]);
  //   const detectionTensor = await model.executeAsync(frameTensor);
  //   const detection = detectionTensor.arraySync();
  //   detection[0].forEach((box) => {
  //     const cls = box[5];
  //     // center y, center x, height, width
  //     const height = box[2] - box[0];
  //     const width = box[3] - box[1];
  //     detectionBuffer.current[index][cls][0] = box[0] + height / 2;
  //     detectionBuffer.current[index][cls][1] = box[1] + width / 2;
  //     detectionBuffer.current[index][cls][2] = height;
  //     detectionBuffer.current[index][cls][3] = width;

  //     if (cls === 1) {
  //       clearDetection(detectionBuffer.current[index][cls]);
  //     }
  //   });
  //   // detectionBuffer.current[index] = await detection.arraySync();
  //   frameTensor.dispose();
  //   detectionTensor.dispose();
  // };

  // const clearDetection = (det) => {
  //   if (!det) {
  //     return;
  //   }
  //   det[0] = -1;
  //   det[1] = -1;
  //   det[2] = -1;
  //   det[3] = -1;
  // };

  // const videoBufferConsumeLoop = () => {
  //   const indexGen = bufferIndexGen(demoVideo.current.length);
  //   const intervalId = setInterval(() => {
  //     const index = indexGen.next().value;
  //     ctx.current.drawImage(demoVideo.current[index], 0, 0);
  //     if (index % detectionFramesToWait.current === 0) {
  //       drawDetection(index);
  //     }
  //   }, frameRate);
  //   return intervalId;
  // };

  // const drawDetection = (index) => {
  //   const _detections = [...detections];
  //   detectionBuffer.current[index].forEach((box, cls) => {
  //     const key = "__detection_class_" + cls;
  //     const [currDet, nextDet] = filterDetection(index, cls);
  //     _detections[cls] = (
  //       <div
  //         key={key}
  //         id={key}
  //         className="detection detection-position"
  //         style={{
  //           display: currDet[3] === -1 ? "none" : "flex",
  //           "--x": currDet[1],
  //           "--y": currDet[0]
  //           // "--next-x": nextDet[3] === -1 ? currDet[1] : nextDet[1],
  //           // "--next-y": nextDet[3] === -1 ? currDet[0] : nextDet[0],
  //           // "--animation-duration": frameRate * detectionFramesToWait.current
  //         }}
  //         onClick={(e) => {
  //           e.stopPropagation();
  //           detectionClicked(cls);
  //         }}
  //       >
  //         <div className="plus-sign">+</div>
  //       </div>
  //     );
  //   });
  //   setDetections(_detections);
  // };

  // const filterDetection = (index, cls) => {
  //   // todo test with kalman's
  //   const prePrevDet = getSteppedDetection(index, cls, -2);
  //   const prevDet = getSteppedDetection(index, cls, -1);
  //   const currDet = getSteppedDetection(index, cls, 0);
  //   const nextDet = getSteppedDetection(index, cls, 1);
  //   if (currDet[3] === -1 && (prevDet[3] === -1 || nextDet[3] === -1)) {
  //     clearDetection(prePrevDet);
  //     return [currDet, nextDet];
  //   }
  //   const postNextDet = getSteppedDetection(index, cls, 2);

  //   let xSum = 0;
  //   let ySum = 0;
  //   let q = 0;
  //   if (prePrevDet[3] !== -1) {
  //     xSum += prePrevDet[1];
  //     ySum += prePrevDet[0];
  //     q++;
  //     clearDetection(prePrevDet);
  //   }
  //   if (prevDet[3] !== -1) {
  //     xSum += 2 * prevDet[1];
  //     ySum += 2 * prevDet[0];
  //     q += 2;
  //   }
  //   if (currDet[3] !== -1) {
  //     xSum += 1 * currDet[1];
  //     ySum += 1 * currDet[0];
  //     q += 1;
  //   }
  //   if (nextDet[3] !== -1) {
  //     xSum += 1 * nextDet[1];
  //     ySum += 1 * nextDet[0];
  //     q += 1;
  //   }
  //   if (postNextDet[3] !== -1) {
  //     xSum += postNextDet[1];
  //     ySum += postNextDet[0];
  //     q++;
  //   }
  //   currDet[0] = ySum / q;
  //   currDet[1] = xSum / q;
  //   return [currDet, nextDet];
  // };

  // const getSteppedDetection = (index, cls, step = 1) => {
  //   const nextDetIndex = getSteppedDetectionIndex(index, step);
  //   return detectionBuffer.current[nextDetIndex][cls];
  // };

  // const getSteppedDetectionIndex = (index, step = 1) => {
  //   // todo mejorar esto
  //   let nextDetIndex = index + step * detectionFramesToWait.current;
  //   if (nextDetIndex >= detectionBuffer.current.length) {
  //     return 0;
  //   }
  //   if (nextDetIndex < 0) {
  //     for (let i = detectionBuffer.current.length; i >= 0; i--) {
  //       if (i === 0 || i % detectionFramesToWait === 0) {
  //         return i;
  //       }
  //     }
  //   }
  //   return nextDetIndex;
  // };

  // const detectionClicked = (cls) => {
  //   switch (cls) {
  //     case 0: {
  //       setSelectedDetection("Perilla de cambio de tracción");
  //       break;
  //     }
  //     case 1: {
  //       setSelectedDetection("Botones de control de tracción");
  //       break;
  //     }
  //     case 2: {
  //       setSelectedDetection("Control de tracción");
  //       break;
  //     }
  //     case 3: {
  //       setSelectedDetection("Bloqueo de diferencial");
  //       break;
  //     }
  //     case 4: {
  //       setSelectedDetection("Control de descenso");
  //       break;
  //     }
  //     default: {
  //       setSelectedDetection(null);
  //     }
  //   }
  // };

  // function* bufferIndexGen(maxIndex) {
  //   const top = maxIndex - 1;
  //   let i = 0;
  //   while (true) {
  //     yield i;
  //     i = i === top ? 0 : i + 1;
  //   }
  // }

  return (
    <>
      <canvas
        ref={canvas}
        style={{ position: "absolute", top: "0px", left: "0px" }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedDetection(-1);
          // detectionClicked(-1);
        }}
      ></canvas>
      {!dps && !detect && (
        <div className="preparing" style={{ "--width": viewPortWidth }}>
          <h1 className="preparing-message">Preparando para detectar</h1>{" "}
          <h2 className="wait">Aguardá un instante por favor</h2>
        </div>
      )}
      {dps && !detect && (
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
      {dps && detect && <> {detections} </>}
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
