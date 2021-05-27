import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./accordeon.css";

const Accordeon = ({
  title,
  payload,
  initClosed = true,
  border = true,
  widthScale
}) => {
  const [closed, setClosed] = useState(true);
  useEffect(() => {
    if (!initClosed) {
      setClosed(false);
    }
  }, []);
  return (
    <div
      className={border ? "accordeon" : ""}
      style={{ "--width-scale": widthScale }}
    >
      <div className="accordeon-header">
        <p className="accordeon-title">{title}</p>
        {closed ? (
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{ cursor: "pointer" }}
            onClick={() => setClosed(!closed)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faChevronUp}
            style={{ cursor: "pointer" }}
            onClick={() => setClosed(!closed)}
          />
        )}
      </div>
      {!closed && payload}
    </div>
  );
};

Accordeon.propTypes = {
  title: PropTypes.string.isRequired,
  payload: PropTypes.object.isRequired,
  initClosed: PropTypes.bool,
  border: PropTypes.bool,
  widthScale: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return { widthScale: state.constants.widthScale };
};

export default connect(mapStateToProps)(Accordeon);
