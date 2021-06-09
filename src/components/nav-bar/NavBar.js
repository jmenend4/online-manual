import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCamera, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./nav-bar.css";

const NavBar = ({ history }) => {
  const navHome = (e) => {
    history.push("/");
  };
  const navCameraView = () => {};
  const search = () => {};
  return (
    <>
      <div style={{ marginBottom: "88px" }}></div>
      <div className="nav-bar">
        <FontAwesomeIcon
          icon={faHome}
          style={{
            cursor: "pointer",
            height: "32px",
            width: "32px",
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
            height: "32px",
            width: "32px",
            color: "rgb(108,108,108)",
            marginTop: "16px",
            marginBottom: "24px"
          }}
          onClick={() => navCameraView()}
        />
        <FontAwesomeIcon
          icon={faSearch}
          style={{
            cursor: "pointer",
            height: "32px",
            width: "32px",
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
  history: PropTypes.object.isRequired
};

export default NavBar;
