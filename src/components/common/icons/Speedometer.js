import React from "react";
import PropTypes from "prop-types";

const Speedometer = ({ style = {} }) => {
  return (
    <svg
      width="32px"
      height="33px"
      viewBox="0 0 32 33"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={style}
    >
      <title>644C757A-EAD1-47EC-BE2F-2089DA5BC9A9</title>
      <defs>
        <rect id="path-1" x="0" y="0" width="398" height="312" rx="8"></rect>
        <filter
          x="-5.0%"
          y="-5.1%"
          width="110.1%"
          height="112.8%"
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
        <filter id="filter-3">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0 0 0 0 0.400000 0 0 0 0 0.400000 0 0 0 0 0.400000 0 0 0 1.000000 0"
          ></feColorMatrix>
        </filter>
        <filter id="filter-4">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0 0 0 0 0.400000 0 0 0 0 0.400000 0 0 0 0 0.400000 0 0 0 1.000000 0"
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
          id="Manejar-en-nieve---paso-4"
          transform="translate(-191.000000, -719.000000)"
        >
          <rect fill="#F9F9F9" x="0" y="0" width="414" height="1332"></rect>
          <g id="Consejos.card" transform="translate(8.000000, 528.000000)">
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
                height="312"
                rx="8"
              ></rect>
            </g>
            <g
              id="VehicleHandling/TrailFeaturesBronco/32"
              transform="translate(24.000000, 192.000000)"
              filter="url(#filter-3)"
            >
              <g
                transform="translate(159.000000, 0.000000)"
                filter="url(#filter-4)"
              >
                <g transform="translate(1.000000, 3.000000)">
                  <path
                    d="M15,0 C23.1555076,0 30,6.53519278 30,14.8129614 C30,19.285644 27.9848812,23.2848236 24.812095,26 L20.3563715,21.5998359 L21.8725702,20.1025431 L24.7969762,22.990484 C26.4773218,21.0324856 27.5680346,18.5753897 27.7969762,15.8708778 L23.5723542,15.8708778 L23.5723542,13.7550451 L27.8099352,13.7550451 C27.5788337,11.0484003 26.488121,8.58277276 24.8077754,6.62264151 L17.062635,14.2712059 C17.1101512,14.4439705 17.1425486,14.6231337 17.1425486,14.8129614 C17.1425486,15.9817884 16.1835853,16.9287941 15,16.9287941 C13.8164147,16.9287941 12.8574514,15.9817884 12.8574514,14.8129614 C12.8574514,13.6441345 13.8164147,12.6971288 15,12.6971288 C15.1900648,12.6971288 15.3714903,12.7291222 15.5485961,12.7760459 L23.2807775,5.13814602 C21.2980562,3.47875308 18.812095,2.39950779 16.0712743,2.17555373 L16.0712743,6.34963084 L13.9287257,6.34963084 L13.9287257,2.17768663 C11.1900648,2.40164069 8.69978402,3.47875308 6.71706263,5.14027892 L9.64362851,8.02608696 L8.12742981,9.52337982 L5.19006479,6.62264151 C3.51187905,8.58277276 2.42116631,11.0505332 2.19006479,13.7550451 L6.42764579,13.7550451 L6.42764579,15.8708778 L2.20302376,15.8708778 C2.43196544,18.5753897 3.52267819,21.0324856 5.20302376,22.990484 L8.12742981,20.1025431 L9.64362851,21.5998359 L5.18790497,26 C2.01511879,23.2848236 0,19.285644 0,14.8129614 C0,6.58211649 6.80993521,0 15,0"
                    id="Gauges"
                    fill="#000000"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

Speedometer.propTypes = {
  style: PropTypes.object
};

export default Speedometer;
