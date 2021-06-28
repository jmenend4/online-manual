import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCamera, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./nav-bar.css";

const NavBar = ({ viewPortWidth, history }) => {
  const navHome = (e) => {
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
          onClick={(e) => navHome(e)}
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
          icon={faSearch}
          style={{
            cursor: "pointer",
            height: "24px",
            width: "24px",
            color: "rgb(108,108,108)",
            marginTop: "16px",
            marginBottom: "24px"
          }}
          onClick={() => search()}
        />
      </div>
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
