import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import testVideoSrc from "../../assets/video_perilla_4_rotated.mp4";
import testImgSrc from "../../assets/Archivo_043.jpeg";
// import testImgSrc1 from "../../assets/Archivo_019.jpeg";
// import testImgSrc2 from "../../assets/Archivo_053.jpeg";
// import testImgSrc3 from "../../assets/Archivo_088.jpeg";
// import testImgSrc4 from "../../assets/Archivo_204.jpeg";

const Detector = () => {
  const frameRate = 42; // equivalent to 24 fps
  const fps = 24;
  const bufferSize = 1; // in seconds
  const bufferedFrames = bufferSize * fps; // one second buffer
  const detectionFramesToWait = useRef(24);
  const [model, setModel] = useState(null);
  const [testVideoLoaded, setTestVideoLoaded] = useState(false);
  const testVideo = useRef(null);
  const playing = useRef(false);
  const videoBuffer = useRef([]);
  const detectionBuffer = useRef([]);
  const canvas = useRef(null);
  const ctx = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
                // const initTensor = tf.stack([
                //   tf.browser.fromPixels(testImage),
                //   tf.browser.fromPixels(testImage),
                //   tf.browser.fromPixels(testImage)
                // ]);
                const initialDetection = await _model.executeAsync(initTensor);
                console.log(initialDetection);
                initialDetection.dispose();
                await calcInitialDps(initTensor, _model);
                // createImageBatch(_model);
                setModel(_model);
              };
            })
            .catch((error) => {
              console.error(error);
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage(error.message);
        });
    }
  }, []);

  useEffect(() => {
    // load test video and set handlers
    testVideo.current = document.createElement("video");
    testVideo.current.src = testVideoSrc;
    testVideo.current.onloadeddata = () => {
      canvas.current.width = testVideo.current.videoWidth;
      canvas.current.height = testVideo.current.videoHeight;
      ctx.current = canvas.current.getContext("2d");
      initBuffers(testVideo.current.videoHeight, testVideo.current.videoWidth);
      setTestVideoLoaded(true);
    };
    testVideo.current.onplay = () => {
      playing.current = true;
    };
    testVideo.current.onpause = () => {
      playing.current = false;
    };
  }, []);

  const initBuffers = (height, width) => {
    for (let i = 0; i < bufferedFrames; i++) {
      videoBuffer.current.push(tf.zeros([height, width, 3], "int32"));
      detectionBuffer.current.push([[]]);
    }
  };

  useEffect(() => {
    // video buffer loader and consumer laucher
    let videoBufferLoadIntervalId;
    let bufferingGapTimeoutId;
    let videoBufferConsumeIntervalId;
    if (model && testVideoLoaded) {
      videoBufferLoadIntervalId = videoBufferLoadloop();
      bufferingGapTimeoutId = setTimeout(() => {
        videoBufferConsumeIntervalId = videoBufferConsumeLoop();
      }, 500);
    }
    return () => {
      if (videoBufferLoadIntervalId) {
        clearInterval(videoBufferLoadIntervalId);
      }
      if (bufferingGapTimeoutId) {
        clearTimeout(bufferingGapTimeoutId);
      }
      if (videoBufferConsumeIntervalId) {
        clearTimeout(videoBufferConsumeIntervalId);
      }
    };
  }, [model, testVideoLoaded]);

  const videoBufferLoadloop = () => {
    const indexGen = bufferIndexGen(bufferedFrames);
    const intervalId = setInterval(() => {
      const i = indexGen.next().value;
      videoBuffer.current[i] = tf.browser.fromPixels(testVideo.current);
      if (i % detectionFramesToWait.current === 0) {
        detectFrame(i);
      }
    }, frameRate);
    return intervalId;
  };

  const detectFrame = async (index) => {
    const detection = await model.executeAsync(videoBuffer.current[index]);
    detectionBuffer.current[index] = await detection.arraySync();
    detection.dispose();
  };

  const videoBufferConsumeLoop = () => {
    const indexGen = bufferIndexGen(bufferedFrames);
    const intervalId = setInterval(() => {
      // ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
      const index = indexGen.next().value;
      tf.browser.toPixels(videoBuffer.current[index], canvas.current);
      ctx.current.strokeStyle = "#0000FF";
      detectionBuffer.current[index][0].forEach((box) => {
        ctx.current.strokeRect(
          box[1],
          box[0],
          box[3] - box[1],
          box[2] - box[0]
        );
      });
    }, frameRate);
    return intervalId;
  };

  function* bufferIndexGen(bufferedFrames) {
    let i = 0;
    while (true) {
      yield i;
      i = i === bufferedFrames ? 0 : i++;
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
    console.log(
      "Frames to wait for detection = " + detectionFramesToWait.current
    );
  };

  // const imageTensors = useRef([]);

  // const createImageBatch = (_model) => {
  //   console.log("creating batch");
  //   const imagesPaths = [];
  //   imagesPaths.push(testImgSrc);
  //   imagesPaths.push(testImgSrc1);
  //   imagesPaths.push(testImgSrc2);

  //   imagesPaths.forEach((path) => {
  //     const image = new Image();
  //     image.src = path;
  //     image.onload = () => {
  //       imageTensors.current.push(tf.browser.fromPixels(image));
  //       if (imageTensors.current.length === 3) {
  //         calcBatchFps(_model);
  //       }
  //     };
  //   });
  // };

  // const calcBatchFps = async (_model) => {
  //   console.log("calculating fps for batch detection...");
  //   const batchTensor = tf.stack([
  //     imageTensors.current[0],
  //     imageTensors.current[1],
  //     imageTensors.current[2]
  //   ]);
  //   let acc = 0;
  //   for (let i = 0; i < 20; i++) {
  //     const initTime = new Date();
  //     const [boxes, classes, scales, scores] = await _model.executeAsync(
  //       batchTensor
  //     );
  //     for (let i = 0; i < 3; i++) {
  //       const nmsResult = await tf.image.nonMaxSuppressionWithScoreAsync(
  //         tf.reshape(boxes.slice([i, 0, 0], [1, -1, -1]), [-1, 4]),
  //         tf.reshape(scores.slice([i, 0], [1, -1]), [-1]),
  //         10,
  //         0.0,
  //         0.4
  //       );
  //       console.log(nmsResult);
  //     }
  //     acc += new Date() - initTime;
  //   }
  //   setDetectionLoopDuration(50 + acc / 20);
  //   console.log("FPS: " + 1 / (acc / 20000));
  // };

  return (
    <>
      {/* {modelReady && (
        <video
          ref={testVideo}
          src={videoSrc}
          onLoadedData={onVideoLoad}
          onPlay={onPlay}
          onPause={onPause}
          height={480}
          width={848}
          // autoPlay
          // controls
          muted
          // loop
          style={{ display: "none" }}
        ></video>
        // <img ref={testImage} src={testImgSrc} onLoad={onVideoLoad}></img>
      )} */}
      <canvas ref={canvas}></canvas>
      {errorMessage && (
        <p style={{ position: "absolute", top: "0", left: "0", color: "red" }}>
          {errorMessage}
        </p>
      )}
      {model && (
        <button
          style={{ position: "absolute", left: "100px", top: "100px" }}
          onClick={() =>
            playing.current
              ? testVideo.current.pause()
              : testVideo.current.play()
          }
        >
          {playing.current ? "pause" : "play"}
        </button>
      )}
    </>
  );
};

export default Detector;
