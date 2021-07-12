import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as featuresActions from "../../redux/actions/featuresActions";
import PropTypes from "prop-types";
import { useDemoVideo } from "./demoFrames";
import NextStepButton from "../common/next-step/NextStepButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useModel } from "./useModel";
import { useDetector } from "./useDetector";
import DetectedFeatureCard from "../detected-feature-card/DetectedFeatureCard";
import "./detector.css";
import ControlsBar from "./ControlsBar";

const Detector = ({
  features,
  initializeFeatures,
  viewPortWidth,
  viewPortHeight,
  widthScale,
  heightScale,
  history
}) => {
  const [detect, setDetect] = useState(false);
  const [detectionPaused, setDetectionPaused] = useState(false);
  const [selectedDetection, setSelectedDetection] = useState(null);
  const canvas = useRef(null);
  const [demoVideo, videoLoaded] = useDemoVideo();
  const frame = useRef(null);
  const [dps, modelReady, message, predict] = useModel();
  const detections = useDetector(
    dps,
    frame,
    canvas,
    0,
    predict,
    detect,
    detectionPaused,
    setSelectedDetection,
    selectedDetection
  );

  useEffect(() => {
    if (features.length === 0) {
      initializeFeatures();
    }
  }, [features.length]);

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
      {!modelReady && !detect && (
        <div
          className="preparing"
          style={{ "--width": viewPortWidth, "--height-scale": heightScale }}
        >
          <h1 className="preparing-message">Preparando para detectar</h1>{" "}
          <h2 className="wait">Aguardá un instante por favor</h2>
        </div>
      )}
      {modelReady && !detect && videoLoaded && (
        <div
          className="preparing"
          style={{ "--width": viewPortWidth, "--height-scale": heightScale }}
        >
          <h1 className="preparing-message">Listo!</h1>
          <h2 className="prepared-message">Tocá la detección</h2>
          <div
            className="detection"
            style={{ margin: "16px 24px 16px 24px" }}
            onClick={(e) => {
              e.stopPropagation();
              setDetect(true);
            }}
          >
            <div className="plus-sign">+</div>
          </div>
          <h2 className="prepared-message">
            para obtener más información sobre el componente
          </h2>
          <h2 className="wait">{message}</h2>
          <NextStepButton
            legend="LANZAR DETECCIÓN SOBRE VIDEO"
            onNextClick={(e) => {
              e.stopPropagation();
              setDetect(true);
            }}
          />
        </div>
      )}
      {modelReady && detect && <> {detections} </>}
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
      {videoLoaded && detect && (
        <ControlsBar
          videoHeight={demoVideo.current[0].height}
          detectionPaused={detectionPaused}
          setDetectionPaused={setDetectionPaused}
        />
      )}
    </div>
  );
};

Detector.propTypes = {
  features: PropTypes.array.isRequired,
  initializeFeatures: PropTypes.func.isRequired,
  viewPortWidth: PropTypes.number.isRequired,
  viewPortHeight: PropTypes.number.isRequired,
  widthScale: PropTypes.number.isRequired,
  heightScale: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    features: state.features,
    viewPortWidth: state.constants.viewPortWidth,
    viewPortHeight: state.constants.viewPortHeight,
    widthScale: state.constants.widthScale,
    heightScale: state.constants.heightScale
  };
};

const mapDispatchToProps = {
  initializeFeatures: featuresActions.initializeFeatures
};

export default connect(mapStateToProps, mapDispatchToProps)(Detector);
