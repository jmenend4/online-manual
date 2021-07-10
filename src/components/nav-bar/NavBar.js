import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AppTutorial from "../app-tutorial/AppTutorial";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCamera,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import "./nav-bar.css";
import Info from "../app-tutorial/Info";

const NavBar = ({ viewPortWidth, history }) => {
  const [firstTime, setFirstTime] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const _firstTime = window.localStorage.getItem("firstTime");
    setFirstTime(_firstTime !== "false");
  }, []);

  const navHome = () => {
    history.push("/");
  };
  const navCameraView = () => {
    history.push("/detector");
  };

  const navCameraDemo = () => {
    history.push("/demo");
  };
  const search = () => {};
  return (
    <>
      <div style={{ "--width": viewPortWidth, marginBottom: "88px" }}></div>
      <div className="nav-bar" style={{ "--width": viewPortWidth }}>
        <FontAwesomeIcon
          icon={faHome}
          style={{
            cursor: "pointer",
            height: "24px",
            width: "24px",
            color: "rgb(108,108,108)",
            marginTop: "16px",
            marginBottom: "24px"
          }}
          onClick={() => navHome()}
        />
        <FontAwesomeIcon
          icon={faCamera}
          style={{
            cursor: "pointer",
            height: "24px",
            width: "24px",
            color: "rgb(108,108,108)",
            marginTop: "16px",
            marginBottom: "24px"
          }}
          onClick={() => navCameraView()}
        />
        <div style={{ position: "relative" }}>
          <FontAwesomeIcon
            icon={faCamera}
            style={{
              cursor: "pointer",
              height: "24px",
              width: "24px",
              color: "rgb(108,108,108)",
              marginTop: "16px",
              marginBottom: "24px"
            }}
            onClick={() => navCameraDemo()}
          />
          <div className="icon-label">demo</div>
        </div>

        <FontAwesomeIcon
          icon={faInfoCircle}
          style={{
            cursor: "pointer",
            height: "24px",
            width: "24px",
            color: "rgb(108,108,108)",
            marginTop: "16px",
            marginBottom: "24px"
          }}
          onClick={() => setShowInfo(true)}
        />
      </div>
      {firstTime && (
        <AppTutorial setFirstTime={setFirstTime} setShowInfo={setShowInfo} />
      )}
      {showInfo && <Info setShowInfo={setShowInfo} />}
    </>
  );
};

NavBar.propTypes = {
  viewPortWidth: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    tutorials: state.tutorials,
    viewPortWidth: state.constants.viewPortWidth,
    widthScale: state.constants.widthScale
  };
};

export default connect(mapStateToProps)(NavBar);
