import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDemoVideo } from "./demoFrames";
import NextStepButton from "../common/next-step/NextStepButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useModel } from "./model/useModel";
import { useDetector } from "./useDetector";
import "./detector.css";
import DetectedFeatureCard from "../detected-feature-card/DetectedFeatureCard";

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
        i = i == demoVideo.current.length - 1 ? 0 : i + 1;
      }, 132);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [videoLoaded]);

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
        // <div
        //   className="selected-component"
        //   style={{
        //     "--width-scale": widthScale
        //   }}
        // >
        //   <p className="component-detector-title">{selectedDetection}</p>
        // </div>
        <DetectedFeatureCard />
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
