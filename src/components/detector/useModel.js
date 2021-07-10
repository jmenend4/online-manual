import { useState, useEffect, useRef } from "react";
import { useAsyncError } from "../../hooks/asyncError";
import * as tf from "@tensorflow/tfjs";
import testImgSrc from "../../assets/Archivo_043.jpeg";
// import testImgSrc from "../../../assets/demo_frames/frame_video4_0.jpg";
// import testImgSrc from "../../../assets/Archivo_019.jpeg";
import { useDemoVideo } from "./demoFrames";

export const useModel = () => {
  // const NUM_CLASSES = 5;
  const SCORE_THRESH = 0.8;

  const model = useRef(null);
  const [demoVideo, demoVideoLoaded] = useDemoVideo();
  const throwError = useAsyncError();
  const [dps, setDps] = useState(null);
  const [modelReady, setModelReady] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (model.current === null && demoVideoLoaded) {
      tf.ready()
        .then(() => {
          const backend = tf.getBackend();
          console.log("Using backend: " + backend);
          if (backend === "webgl") {
            initModel();
          } else {
            setDps(-1);
          }
        })
        .catch((error) => {
          setDps(-2);
          throwError(error);
        });
    }
    return () => {
      if (model.current) {
        model.current.dispose();
      }
    };
  }, [demoVideoLoaded]);

  useEffect(() => {
    if (dps > 0) {
      setMessage(
        "Este dispositivo puede realizar " +
          Math.floor(dps) +
          " detecciones por segundo."
      );
      setModelReady(true);
    } else if (dps === 0) {
      setMessage(
        "Este dispositivo no tiene el desempeño suficiente para realizar detecciones en vivo."
      );
    } else if (dps === -1) {
      setMessage("Este dispositivo no es compatible con WebGL.");
    } else if (dps === -2) {
      setMessage("Ocurrió un error al cargar Tensorflow.");
    }
  }, [dps]);

  const initModel = () => {
    tf.loadGraphModel("./model/model.json")
      .then((_model) => {
        const testImage = new Image();
        testImage.src = testImgSrc;
        testImage.onload = () => {
          //   console.log(tf.memory().numTensors);
          tf.tidy(() => {
            const initTensor = tf.browser.fromPixels(testImage);
            // const initialDetection =
            _model.execute(initTensor);
            // console.log(initialDetection);
            calcDps(_model);
          });
          model.current = _model;
        };
      })
      .catch((error) => {
        throwError(error);
      });
  };

  const calcDps = async (_model) => {
    // DPS stands for detections per second
    let _dps = window.localStorage.getItem("dps");
    if (!_dps) {
      // _dps = await nmsTest(_model);
      _dps = await noNmsTest(_model, 1);
      window.localStorage.setItem("dps", _dps);
    }
    console.log("Detections per second = " + _dps);
    setDps(_dps);
  };

  const nmsTest = async (_model, loops) => {
    console.log("Running test with NMS");
    let timeAcc = 0;
    let loopCount = 0;
    for (let i = 0; i < loops; i++) {
      for (let j = 0; j < demoVideo.current.length; j++) {
        const initTime = new Date();
        const classDetections = [
          [-1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1]
        ];
        const [boxesTensor, scoresTensor, classesTensor] = tf.tidy(() => {
          const frameTensor = tf.browser.fromPixels(demoVideo[j]);
          const initialDetection = _model.execute(frameTensor);
          const boxes = tf.reshape(initialDetection[0], [-1, 4]);
          const scores = tf.reshape(initialDetection[3], [-1]);
          const classes = tf.reshape(initialDetection[1], [-1]);
          const scale = initialDetection[2];
          const nmsResult = tf.image.nonMaxSuppressionWithScore(
            boxes,
            scores,
            100,
            0.5,
            SCORE_THRESH
          );
          const nmsScores = nmsResult.selectedScores;
          const nmsBoxes = tf
            .gather(boxes, nmsResult.selectedIndices)
            .mul(scale);
          const nmsClasses = tf.gather(classes, nmsResult.selectedIndices);
          return [nmsBoxes, nmsScores, nmsClasses];
        });
        const classes = classesTensor.arraySync();
        const boxes = boxesTensor.arraySync();
        const scores = scoresTensor.arraySync();
        classes.forEach((cls, i) => {
          const height = boxes[i][2] - boxes[i][0];
          const width = boxes[i][3] - boxes[i][1];
          classDetections[cls] = [
            boxes[i][0] + height / 2,
            boxes[i][1] + width / 2,
            height,
            width,
            scores[i]
          ];
        });
        classesTensor.dispose();
        boxesTensor.dispose();
        scoresTensor.dispose();
        timeAcc += new Date() - initTime;
        // console.log(tf.memory().numTensors);
        loopCount++;
      }
    }
    const dps = 1 / (timeAcc / (loopCount * 1000));
    return dps;
  };

  // const cls0Sum = useRef([]);
  // const cls1Sum = useRef([]);

  const noNmsTest = async (_model, loops) => {
    console.log("Running test without NMS but with top of class");
    let timeAcc = 0;
    let loopCount = 0;
    for (let i = 0; i < loops; i++) {
      for (let j = 0; j < 48; j++) {
        // for (let j = 0; j < demoVideo.current.length; j++) {
        const initTime = new Date();
        const classDetections = [
          [-1, -1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1, -1]
        ];
        const [boxesTensor, scoresTensor, classesTensor] = tf.tidy(() => {
          const frameTensor = tf.browser.fromPixels(demoVideo.current[j]);
          const initialDetection = _model.execute(frameTensor);
          const boxes = tf.reshape(initialDetection[0], [-1, 4]);
          const scores = tf.reshape(initialDetection[3], [-1]);
          const classes = tf.reshape(initialDetection[1], [-1]);
          const scale = initialDetection[2];
          const mask = scores.greater(tf.tensor1d([SCORE_THRESH]));
          const filteredBoxes = booleanMaskSync(boxes, mask).mul(scale);
          const filteredScores = booleanMaskSync(scores, mask);
          const filteredClasses = booleanMaskSync(classes, mask);
          return [filteredBoxes, filteredScores, filteredClasses];
        });
        const classes = classesTensor.arraySync();
        const boxes = boxesTensor.arraySync();
        const scores = scoresTensor.arraySync();
        classes.forEach((cls, i) => {
          if (scores[i] > classDetections[cls][4]) {
            classDetections[cls] = [
              boxes[i][0],
              boxes[i][1],
              boxes[i][2],
              boxes[i][3],
              scores[i]
            ];
          }
        });
        classesTensor.dispose();
        boxesTensor.dispose();
        scoresTensor.dispose();
        timeAcc += new Date() - initTime;
        loopCount++;
        // console.log(tf.memory().numTensors);
        // if (classDetections[0][4] > 0) {
        //   cls0Sum.current.push(classDetections[0][4]);
        // }
        // if (classDetections[1][4] > 0) {
        //   cls1Sum.current.push(classDetections[1][4]);
        // }
      }
    }
    // console.log(
    //   "class 0 score mean: " +
    //     cls0Sum.current.reduce((sum, score) => sum + score) /
    //       cls0Sum.current.length
    // );
    // console.log(
    //   "class 1 score mean: " +
    //     cls1Sum.current.reduce((sum, score) => sum + score) /
    //       cls1Sum.current.length
    // );
    const dps = 1 / (timeAcc / (loopCount * 1000));
    return dps;
  };

  const booleanMaskSync = (tensor, mask) => {
    const axisFrom = 0;
    const maskDim = mask.rank;
    const tensorShape = tensor.shape;

    let leadingSize = 1;
    for (let i = axisFrom; i < axisFrom + maskDim; i++) {
      leadingSize *= tensorShape[i];
    }
    const targetTensorShape = tensorShape
      .slice(0, axisFrom)
      .concat([leadingSize], tensorShape.slice(axisFrom + maskDim));
    const reshapedTensor = tf.reshape(tensor, targetTensorShape);
    const reshapedMask = tf.reshape(mask, [-1]);
    const positivePositions = whereSync(reshapedMask);
    const indices = tf.squeeze(positivePositions, [1]);

    const res = tf.gather(reshapedTensor, indices, axisFrom);

    return res;
  };

  const whereSync = (condition) => {
    const vals = condition.dataSync();
    const res = whereImpl(condition.shape, vals);
    return res;
  };

  const whereImpl = (condShape, condVals) => {
    const indices = [];
    for (let i = 0; i < condVals.length; i++) {
      if (condVals[i]) {
        indices.push(i);
      }
    }
    const inBuffer = tf.buffer(condShape, "int32");

    const out = tf.buffer([indices.length, condShape.length], "int32");
    for (let i = 0; i < indices.length; i++) {
      const loc = inBuffer.indexToLoc(indices[i]);
      const offset = i * condShape.length;
      out.values.set(loc, offset);
    }
    return out.toTensor();
  };

  const predictNms = (imageTensor) => {
    const classDetections = [
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1]
    ];
    const [boxesTensor, scoresTensor, classesTensor] = tf.tidy(() => {
      const initialDetection = model.current.execute(imageTensor);
      const boxes = tf.reshape(initialDetection[0], [-1, 4]);
      const scores = tf.reshape(initialDetection[3], [-1]);
      const classes = tf.reshape(initialDetection[1], [-1]);
      const scale = initialDetection[2];
      const nmsResult = tf.image.nonMaxSuppressionWithScore(
        boxes,
        scores,
        100,
        0.5,
        SCORE_THRESH
      );
      const nmsScores = nmsResult.selectedScores;
      const nmsBoxes = tf.gather(boxes, nmsResult.selectedIndices).mul(scale);
      const nmsClasses = tf.gather(classes, nmsResult.selectedIndices);
      return [nmsBoxes, nmsScores, nmsClasses];
    });
    const classes = classesTensor.arraySync();
    const boxes = boxesTensor.arraySync();
    const scores = scoresTensor.arraySync();
    classes.forEach((cls, i) => {
      const height = boxes[i][2] - boxes[i][0];
      const width = boxes[i][3] - boxes[i][1];
      classDetections[cls] = [
        boxes[i][0] + height / 2,
        boxes[i][1] + width / 2,
        height,
        width,
        scores[i]
      ];
    });
    classesTensor.dispose();
    boxesTensor.dispose();
    scoresTensor.dispose();
    return classDetections;
  };

  const predictNoNms = (imageTensor) => {
    const classDetections = [
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1]
    ];
    const [boxesTensor, scoresTensor, classesTensor] = tf.tidy(() => {
      const initialDetection = model.current.execute(imageTensor);
      const boxes = tf.reshape(initialDetection[0], [-1, 4]);
      const scores = tf.reshape(initialDetection[3], [-1]);
      const classes = tf.reshape(initialDetection[1], [-1]);
      const scale = initialDetection[2];
      const mask = scores.greater(tf.tensor1d([SCORE_THRESH]));
      const filteredBoxes = booleanMaskSync(boxes, mask).mul(scale);
      const filteredScores = booleanMaskSync(scores, mask);
      const filteredClasses = booleanMaskSync(classes, mask);
      return [filteredBoxes, filteredScores, filteredClasses];
    });
    const classes = classesTensor.arraySync();
    const boxes = boxesTensor.arraySync();
    const scores = scoresTensor.arraySync();
    classes.forEach((cls, i) => {
      if (scores[i] > classDetections[cls][4]) {
        classDetections[cls] = [
          boxes[i][0],
          boxes[i][1],
          boxes[i][2],
          boxes[i][3],
          scores[i]
        ];
      }
    });
    classesTensor.dispose();
    boxesTensor.dispose();
    scoresTensor.dispose();
    // classDetections[2] = [-1, -1, -1, -1, -1];
    // classDetections[3] = [-1, -1, -1, -1, -1];
    // classDetections[4] = [-1, -1, -1, -1, -1];
    // console.log(tf.memory().numTensors);
    return classDetections;
  };

  return [dps, modelReady, message, predictNoNms];
  // return [dps, modelReady, message, predictNms];
};
