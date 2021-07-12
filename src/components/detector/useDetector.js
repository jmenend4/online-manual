import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";

export const useDetector = (
  dps,
  video,
  canvas,
  headerHeight,
  predict,
  detect,
  detectionPaused,
  setClickedDetection,
  selectedDetection
) => {
  const FPS = 24;
  const FRAME_SPAN = Math.ceil(1000 / FPS);
  const CENTER_X = document.documentElement.clientWidth / 2;
  const CENTER_Y = document.documentElement.clientHeight / 2;
  const [launchTimeout, setLaunchTimeout] = useState(null);
  const detectionFramesInterval = useRef(null);
  const framesBuffer = useRef([]);
  const detectionsBuffer = useRef([]);
  const ctx = useRef(null);
  const classTracker = useRef([0, 0, 0, 0, 0]);
  const selectedDetectionRef = useRef(null);
  const [drawnDetections, setDrawnDetections] = useState([
    null,
    null,
    null,
    null,
    null
  ]);

  useEffect(() => {
    if (dps > 0) {
      detectionFramesInterval.current = Math.ceil(FPS / Math.floor(dps));
      setLaunchTimeout(detectionFramesInterval.current * FRAME_SPAN * 2);
      initBuffers();
      ctx.current = canvas.current.getContext("2d");
    }
  }, [dps]);

  useEffect(() => {
    selectedDetectionRef.current = selectedDetection;
  }, [selectedDetection]);

  const initBuffers = () => {
    const buffersSize = detectionFramesInterval.current * 10;
    for (let i = 0; i < buffersSize; i++) {
      framesBuffer.current.push(tf.zeros([320, 320, 3], "int32"));
      detectionsBuffer.current.push([
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1]
      ]);
    }
  };

  useEffect(() => {
    // video buffer loader and consumer laucher
    let detectionIntervalId;
    let bufferingGapTimeoutId;
    let videoBufferConsumeIntervalId;
    if (launchTimeout && detect && !detectionPaused) {
      detectionIntervalId = bufferingLoop();
      bufferingGapTimeoutId = setTimeout(() => {
        videoBufferConsumeIntervalId = renderingLoop();
        //   }, launchTimeout);
      }, 1000);
    }

    const clearEffects = () => {
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

    if (detectionPaused) {
      clearEffects();
    }

    return clearEffects;
  }, [launchTimeout, detect, detectionPaused]);

  const bufferingLoop = () => {
    const indexGen = bufferIndexGen(framesBuffer.current.length);
    const intervalId = setInterval(() => {
      const frameIndex = indexGen.next().value;
      const frame = video.current;
      framesBuffer.current[frameIndex] = frame;
      if (frameIndex % detectionFramesInterval.current === 0) {
        detectionsBuffer.current[frameIndex] = tf.tidy(() => {
          const frameTensor = tf.browser.fromPixels(frame);
          return predict(frameTensor);
        });
        // if (
        //   detectionsBuffer.current[frameIndex][2][0] > 0 &&
        //   detectionsBuffer.current[frameIndex][3][0] > 0 &&
        //   detectionsBuffer.current[frameIndex][4][0] > 0
        // ) {
        //   console.log(video.current);
        // }
        estimate(frameIndex);
      }
    }, FRAME_SPAN);
    return intervalId;
  };

  const estimate = (index) => {
    // todo apply kalman filter to the 3 estimations
    // const [
    //   estimatedMovedDet,
    //   estimatedStaticDet,
    //   estimatedZoomedDet,
    //   zoomIndex
    // ] = estimateDets(index);
    const currDet = detectionsBuffer.current[index];
    const prevDet =
      detectionsBuffer.current[getSteppedDetectionIndex(index, -1)];

    // for (let cls = 0; cls < 2; cls++) {
    //   const classDet = currDet[cls];
    currDet.forEach((classDet, cls) => {
      let sumX = 0;
      let sumY = 0;
      let sumWidth = 0;
      let sumHeight = 0;
      let estCount = 0;
      if (classDet[4] > 0) {
        classTracker.current[cls] = dps * 1.5;
        sumY += classDet[0];
        sumX += classDet[1];
        sumHeight += classDet[2];
        sumWidth += classDet[3];
        estCount++;
      }
      if (prevDet[cls][0] > 0 && classTracker.current[cls] > 0) {
        sumY += prevDet[cls][0] * 10;
        sumX += prevDet[cls][1] * 10;
        sumHeight += prevDet[cls][2] * 10;
        sumWidth += prevDet[cls][3] * 10;
        estCount += 10;
      }
      //     if (estimatedMovedDet[cls][0] > 0) {
      //       sumY += estimatedMovedDet[cls][0] * (100 - zoomIndex);
      //       sumX += estimatedMovedDet[cls][1] * (100 - zoomIndex);
      //       estCount += 100 - zoomIndex;
      //     }
      //   if (estimatedStaticDet[cls][0] > 0) {
      //     sumY += estimatedStaticDet[cls][0] * 2;
      //     sumX += estimatedStaticDet[cls][1] * 2;
      //     estCount += 2;
      //   }
      //     if (estimatedZoomedDet[cls][0] > 0) {
      //       sumY += estimatedZoomedDet[cls][0] * zoomIndex;
      //       sumX += estimatedZoomedDet[cls][1] * zoomIndex;
      //       estCount += zoomIndex;
      //     }
      if (estCount > 0) {
        classDet[0] = sumY / estCount;
        classDet[1] = sumX / estCount;
        classDet[2] = sumHeight / estCount;
        classDet[3] = sumWidth / estCount;
      }
      classTracker.current[cls]--;
      // }
    });
    calcDets(currDet);
  };

  const calcDets = (currDet) => {
    if (currDet[1][0] > 0) {
      calcTractionButtonsDets(currDet);
    }
  };

  const calcTractionButtonsDets = (currDet) => {
    // traction selector top left corner
    const ts = [
      currDet[0][1] - currDet[0][3] / 2,
      currDet[0][0] - currDet[0][2] / 2
    ];
    // traction menu top left corner
    const tm = [
      currDet[1][1] - currDet[1][3] / 2,
      currDet[1][0] - currDet[1][2] / 2
    ];
    // let's calculate the line that goes through all three buttons
    const ortoAngleTan =
      currDet[0][0] > 0 ? -1 / ((ts[1] - tm[1]) / (ts[0] - tm[0])) : 0;
    const orderedToZero = currDet[1][0] - ortoAngleTan * currDet[1][1];

    // traction control button x
    const tcX = tm[0] + 20;
    // hill descent button x
    const hdX = tm[0] + currDet[1][3] - 20;

    // let's get the coordinates of all three buttons
    // traction control button
    if (currDet[2][0] > 0) {
      currDet[2][1] = (tcX + currDet[2][1]) / 2;
      currDet[2][0] =
        (ortoAngleTan * tcX + orderedToZero + 5 * currDet[2][0]) / 6;
    } else {
      currDet[2][1] = tcX;
      currDet[2][0] = ortoAngleTan * tcX + orderedToZero;
    }

    // differential lock button is set equal to the menu detection
    currDet[3][0] = currDet[1][0];
    currDet[3][1] = currDet[1][1];
    // hill descent button
    currDet[4][1] = hdX;
    currDet[4][0] = ortoAngleTan * hdX + orderedToZero;

    // remove class 1 from rendering
    // currDet[1][0] = -1;
  };

  const estimateDets = (index) => {
    const currDet = detectionsBuffer.current[index];
    const prevDet =
      detectionsBuffer.current[getSteppedDetectionIndex(index, -1)];
    const estimatedMovedDet = [
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1]
    ];
    const estimatedZoomedDet = [
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1]
    ];
    const estimatedStaticDet = [
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1]
    ];
    const [xMov, yMov, xZoom, yZoom, zoomIndex] = calcMovement(index);
    currDet.forEach((classDet, cls) => {
      if (classDet[4] > 0) {
        classTracker.current[cls] = 12; // increase this to track for more time in case no detection is provided by the model
      }

      if (classTracker.current[cls] > 0) {
        classTracker.current[cls]--;
        if (prevDet[cls][0] > 0) {
          // estimate on camera vertical and lateral movement
          estimatedMovedDet[cls][0] = prevDet[cls][0] + yMov;
          estimatedMovedDet[cls][1] = prevDet[cls][1] + xMov;

          // estimate on camera zoom
          estimatedZoomedDet[cls][0] =
            prevDet[cls][0] > CENTER_Y
              ? prevDet[cls][0] + yZoom / 2
              : prevDet[cls][0] - yZoom / 2;
          estimatedZoomedDet[cls][1] =
            prevDet[cls][1] > CENTER_X
              ? prevDet[cls][1] + xZoom / 2
              : prevDet[cls][1] - xZoom / 2;
        }
      }
      // soften the detection movement based on previous detection location
      if (classDet[0] > 0) {
        if (prevDet[cls][0] > 0) {
          estimatedStaticDet[cls][0] = (classDet[0] + prevDet[cls][0]) / 2;
          estimatedStaticDet[cls][1] = (classDet[1] + prevDet[cls][1]) / 2;
        }
      } else if (classTracker.current[cls] - 3 > 0) {
        estimatedStaticDet[cls][0] = prevDet[cls][0];
        estimatedStaticDet[cls][1] = prevDet[cls][1];
      }
      classTracker.current[cls]--;
    });
    return [
      estimatedMovedDet,
      estimatedStaticDet,
      estimatedZoomedDet,
      zoomIndex
    ];
  };

  const calcMovement = (index) => {
    const currDet = detectionsBuffer.current[index];
    const prevDet =
      detectionsBuffer.current[getSteppedDetectionIndex(index, -1)];
    let xMovSum = 0;
    let xZoomSum = 0;
    let yMovSum = 0;
    let yZoomSum = 0;
    let zoomIndexSum = 0;
    let classesCount = 0;
    currDet.forEach((classDet, cls) => {
      if (classDet[0] > 0 && prevDet[cls][0] > 0) {
        xMovSum += classDet[1] - prevDet[cls][1];
        yMovSum += classDet[0] - prevDet[cls][0];
        xZoomSum += classDet[3] - prevDet[cls][3];
        yZoomSum += classDet[2] - prevDet[cls][2];
        const prevBoxArea = prevDet[cls][3] * prevDet[cls][2];
        let zoomIndex = Math.abs(
          (classDet[3] * classDet[2] - prevBoxArea) / prevBoxArea
        );
        zoomIndex = zoomIndex > 1 ? 1 : zoomIndex;
        zoomIndexSum += zoomIndex;
        classesCount++;
      }
    });
    return classesCount > 0
      ? [
          xMovSum / classesCount,
          yMovSum / classesCount,
          xZoomSum / classesCount,
          yZoomSum / classesCount,
          Math.trunc((zoomIndexSum * 100) / classesCount)
        ]
      : [0, 0];
  };

  const getSteppedDetectionIndex = (index, step = 1) => {
    let steppedDetIndex = index + step * detectionFramesInterval.current;
    if (steppedDetIndex >= detectionsBuffer.current.length) {
      return steppedDetIndex - detectionsBuffer.current.length;
    }
    if (steppedDetIndex < 0) {
      return detectionsBuffer.current.length + steppedDetIndex;
    }
    return steppedDetIndex;
  };

  const renderingLoop = () => {
    const indexGen = bufferIndexGen(framesBuffer.current.length);
    const intervalId = setInterval(async () => {
      const frameIndex = indexGen.next().value;
      const frame = framesBuffer.current[frameIndex];
      ctx.current.drawImage(frame, 0, 0);
      if (frameIndex % detectionFramesInterval.current === 0) {
        drawDetection(frameIndex);
      }
    }, FRAME_SPAN);
    return intervalId;
  };

  const drawDetection = (index) => {
    // const _detections = [...drawnDetections];
    const _detections = detectionsBuffer.current[index].map((det, cls) => (
      // <>
      <div
        key={"__detection_class_" + cls}
        id={"__detection_class_" + cls}
        className={
          "detection detection-position" +
          (selectedDetectionRef.current === cls ? " selected-detection" : "")
        }
        style={{
          display: det[0] < 0 || cls === 1 ? "none" : "flex",
          "--x": det[1],
          "--y": det[0] + headerHeight
          // "--next-x": nextDet[3] === -1 ? currDet[1] : nextDet[1],
          // "--next-y": nextDet[3] === -1 ? currDet[0] : nextDet[0],
          // "--animation-duration": frameRate * detectionFramesToWait.current
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setClickedDetection(cls);
        }}
      >
        <div className="plus-sign">+</div>
      </div>
      //   {/* {cls === 1 && (
      //     <div
      //       key={"__detection_class_" + cls}
      //       style={{
      //         position: "absolute",
      //         left: det[1] - det[3] / 2,
      //         top: det[0] - det[2] / 2,
      //         width: det[3],
      //         height: det[2],
      //         border: "2px solid blue"
      //       }}
      //     ></div>
      //   )}
      // </> */}
    ));
    // _detections[1] = null;
    setDrawnDetections(_detections);
  };

  function* bufferIndexGen(maxIndex) {
    const top = maxIndex - 1;
    let i = 0;
    while (true) {
      yield i;
      i = i === top ? 0 : i + 1;
    }
  }

  return drawnDetections;
};
