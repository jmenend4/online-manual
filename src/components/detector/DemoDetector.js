import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as featuresActions from "../../redux/actions/featuresActions";
import PropTypes from "prop-types";
import { useDemoVideo } from "./demoFrames";
import NextStepButton from "../common/next-step/NextStepButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useModel } from "./model/useModel";
import { useDetector } from "./useDetector";
import DetectedFeatureCard from "../detected-feature-card/DetectedFeatureCard";
import "./detector.css";

const Detector = ({
  features,
  initializeFeatures,
  viewPortWidth,
  viewPortHeight,
  widthScale,
  history
}) => {
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
    setSelectedDetection,
    selectedDetection
  );

  useEffect(() => {
    if (features.length === 0) {
      initializeFeatures();
    }
  }, [features.length]);

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

  return (
    <div
      className="detector-background"
      style={{ "--width": viewPortWidth, "--height": viewPortHeight }}
    >
      <canvas
        ref={canvas}
        style={{ position: "absolute", top: "0px", left: "0px" }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedDetection(null);
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
      <DetectedFeatureCard
        cls={selectedDetection}
        setSelectedDetection={setSelectedDetection}
        features={features}
      />
    </div>
  );
};

Detector.propTypes = {
  features: PropTypes.array.isRequired,
  initializeFeatures: PropTypes.func.isRequired,
  viewPortWidth: PropTypes.number.isRequired,
  viewPortHeight: PropTypes.number.isRequired,
  widthScale: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    features: state.features,
    viewPortWidth: state.constants.viewPortWidth,
    viewPortHeight: state.constants.viewPortHeight,
    widthScale: state.constants.widthScale
  };
};

const mapDispatchToProps = {
  initializeFeatures: featuresActions.initializeFeatures
};

export default connect(mapStateToProps, mapDispatchToProps)(Detector);
