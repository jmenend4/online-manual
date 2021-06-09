import React from "react";
import PropTypes from "prop-types";

const RedWarningSmall = ({ style = {} }) => {
  return (
    <svg
      width="24px"
      height="25px"
      viewBox="0 0 24 25"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={style}
    >
      <title>46988FB6-69A8-49B0-B09F-52D4F35BD0AE</title>
      <defs>
        <rect id="path-1" x="0" y="0" width="398" height="72" rx="8"></rect>
        <filter
          x="-5.0%"
          y="-22.2%"
          width="110.1%"
          height="155.6%"
          filterUnits="objectBoundingBox"
          id="filter-2"
        >
          <feMorphology
            radius="2"
            operator="dilate"
            in="SourceAlpha"
            result="shadowSpreadOuter1"
          ></feMorphology>
          <feOffset
            dx="0"
            dy="4"
            in="shadowSpreadOuter1"
            result="shadowOffsetOuter1"
          ></feOffset>
          <feGaussianBlur
            stdDeviation="4"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          ></feGaussianBlur>
          <feColorMatrix
            values="0 0 0 0 0.0909131921   0 0 0 0 0.0909131921   0 0 0 0 0.0909131921  0 0 0 0.1 0"
            type="matrix"
            in="shadowBlurOuter1"
          ></feColorMatrix>
        </filter>
      </defs>
      <g
        id="Computer-Vision-MVP"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="manejar-en-nieve---paso-1"
          transform="translate(-32.000000, -797.000000)"
        >
          <rect fill="#F9F9F9" x="0" y="0" width="414" height="1665"></rect>
          <g
            id="advertencias.card/closed"
            transform="translate(8.000000, 774.000000)"
          >
            <g id="card">
              <g id="Shadow">
                <use
                  fill="black"
                  fillOpacity="1"
                  filter="url(#filter-2)"
                  xlinkHref="#path-1"
                ></use>
                <use
                  fill="#FFFFFF"
                  fillRule="evenodd"
                  xlinkHref="#path-1"
                ></use>
              </g>
              <rect
                id="Rectangle"
                fill="#FFFFFF"
                x="0"
                y="0"
                width="398"
                height="72"
                rx="8"
              ></rect>
            </g>
            <g
              id="icons/warning"
              transform="translate(24.000000, 24.000000)"
              fill="#FF3B30"
              fontFamily="SFProText-Bold, SF Pro Text"
              fontSize="16"
              fontWeight="bold"
              letterSpacing="-0.38588235"
              line-spacing="24"
            >
              <text id="􀇾">
                <tspan x="2.20856617" y="15">
                  􀇾
                </tspan>
              </text>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

RedWarningSmall.propTypes = {
  style: PropTypes.object
};

export default RedWarningSmall;
