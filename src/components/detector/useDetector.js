import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";

export const useDetector = (
  dps,
  video,
  canvas,
  predict,
  detect,
  setClickedDetection
) => {
  const FPS = 24;
  const FRAME_SPAN = Math.ceil(1000 / FPS);
  const [launchTimeout, setLaunchTimeout] = useState(null);
  const detectionFramesInterval = useRef(null);
  const framesBuffer = useRef([]);
  const detectionsBuffer = useRef([]);
  const ctx = useRef(null);
  const [drawnDetections, setDrawnDetections] = useState([
    null,
    null,
    null,
    null,
    null
  ]);

  useEffect(() => {
    if (dps) {
      detectionFramesInterval.current = Math.ceil(FPS / Math.floor(dps));
      setLaunchTimeout(detectionFramesInterval.current * FRAME_SPAN * 2);
      initBuffers();
      ctx.current = canvas.current.getContext("2d");
    }
  }, [dps]);

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
    if (launchTimeout && detect) {
      detectionIntervalId = bufferingLoop();
      bufferingGapTimeoutId = setTimeout(() => {
        videoBufferConsumeIntervalId = renderingLoop();
        //   }, launchTimeout);
      }, 1000);
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
  }, [launchTimeout, detect]);

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
      }
    }, FRAME_SPAN);
    return intervalId;
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
      <div
        key={"__detection_class_" + cls}
        id={"__detection_class_" + cls}
        className="detection detection-position"
        style={{
          display: det[4] === -1 ? "none" : "flex",
          "--x": det[1],
          "--y": det[0]
          // "--next-x": nextDet[3] === -1 ? currDet[1] : nextDet[1],
          // "--next-y": nextDet[3] === -1 ? currDet[0] : nextDet[0],
          // "--animation-duration": frameRate * detectionFramesToWait.current
        }}
        onClick={(e) => {
          e.stopPropagation();
          setClickedDetection(cls);
        }}
      >
        <div className="plus-sign">+</div>
      </div>
    ));
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
