import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

const Detector = () => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    if (model === null) {
      tf.ready()
        .then(() =>
          tf
            .loadGraphModel("../../model/model.json")
            .then((_model) => setModel(_model))
            .catch((error) => console.error(error))
        )
        .catch((error) => console.error(error));
    }
  }, []);
  return <>{"hola"}</>;
};

export default Detector;
