import React, { useEffect, useRef, useState } from "react";
import { useAsyncError } from "../../hooks/asyncError";
import * as tf from "@tensorflow/tfjs";
import { useDemoVideo } from "./demoFrames";
// import testImgSrc from "../../assets/Archivo_043.jpeg";
import testImgSrc from "../../assets/demo_frames/frame_video4_0.jpg";
import "./detector.css";

const Detector = () => {
  const classes = 5;
  const frameRate = 42; // equivalent to 24 fps
  const fps = 24;
  const bufferSize = 1; // in seconds
  const bufferedFrames = bufferSize * fps; // one second buffer
  const detectionFramesToWait = useRef(24);
  const demoVideo = useRef(null);
  const [model, setModel] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const detectionBuffer = useRef([]);
  const canvas = useRef(null);
  const ctx = useRef(null);
  const throwError = useAsyncError();
  const [message, setMessage] = useState("");
  const getDemoVideo = useDemoVideo();
  const [detections, setDetections] = useState([null, null, null, null, null]);

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
    if (model && videoLoaded) {
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
  }, [model, videoLoaded]);

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
          className="detection"
          style={{
            display: box[3] === 0 ? "none" : "block",
            "--top": box[0],
            "--left": box[1],
            "--height": box[2],
            "--width": box[3],
            "--next_top": box[0],
            "--next_left": box[1],
            "--next_height": box[2],
            "--next_width": box[3]
          }}
        ></div>
      );
    });
    setDetections(_detections);
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
    setMessage("Detections per second = " + dps);
    console.log(
      "Frames to wait for detection = " + detectionFramesToWait.current
    );
  };

  return (
    <>
      <canvas
        ref={canvas}
        style={{ position: "absolute", top: "0px", left: "0px" }}
      ></canvas>
      <p
        style={{
          position: "absolute",
          bottom: "100px",
          left: "20",
          color: "blue"
        }}
      >
        {message}
      </p>
      {detections}
    </>
  );
};

export default Detector;
