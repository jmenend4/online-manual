import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import RedWarningSmall from "../icons/RedWarningSmall";
import "./accordeon.css";

const Accordeon = ({
  title,
  payload,
  initClosed = true,
  border = true,
  type = "regular",
  widthScale,
  height
}) => {
  const [closed, setClosed] = useState(initClosed);

  useEffect(() => {
    if (!initClosed) {
      setClosed(false);
    }
  }, []);

  return (
    <div
      className={border ? "accordeon" : ""}
      style={{
        "--width-scale": widthScale,
        height: !closed && height ? height + "px" : "auto"
      }}
    >
      <div className="accordeon-header">
        <div className="accordeon-icon-title-container">
          {type === "warning" && <RedWarningSmall />}
          <p
            className="accordeon-title"
            style={{
              margin: closed ? "0" : "0 0 24px 0",
              color: type === "warning" ? "rgba(255, 59, 48)" : "#171717"
            }}
          >
            {title}
          </p>
        </div>

        {closed ? (
          <FontAwesomeIcon
            icon={faChevronDown}
            className="accordeon-chevron"
            style={{ margin: "0" }}
            onClick={() => setClosed(!closed)}
            color={type === "warning" ? "rgba(255, 59, 48)" : "#171717"}
          />
        ) : (
          <FontAwesomeIcon
            icon={faChevronUp}
            className="accordeon-chevron"
            style={{ margin: "0 0 24px 0" }}
            onClick={() => setClosed(!closed)}
            color={type === "warning" ? "rgba(255, 59, 48)" : "#171717"}
          />
        )}
      </div>
      {!closed && payload}
    </div>
  );
};

Accordeon.propTypes = {
  title: PropTypes.string.isRequired,
  payload: PropTypes.any.isRequired,
  initClosed: PropTypes.bool,
  border: PropTypes.bool,
  type: PropTypes.string,
  widthScale: PropTypes.number.isRequired,
  height: PropTypes.number
};

const mapStateToProps = (state) => {
  return { widthScale: state.constants.widthScale };
};

export default connect(mapStateToProps)(Accordeon);
