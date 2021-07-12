import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import cnnLogo from "../../assets/deep-learning.jpg";
import tfLogo from "../../assets/tensorflow-logo.png";
import reactLogo from "../../assets/react-logo.png";
import tractionSwitch from "../../assets/traction_switch.png";
import appleLogo from "../../assets/apple-logo.png";
import webglLogo from "../../assets/webgl-logo.png";
import "./app-tutorial.css";

const Info = ({ setShowInfo, viewPortHeight, viewPortWidth }) => {
  return (
    <div
      className="app-tutorial-background"
      style={{ "--height": viewPortHeight, "--width": viewPortWidth }}
    >
      <div
        className="info-card"
        style={{ "--height": viewPortHeight, "--width": viewPortWidth }}
      >
        <FontAwesomeIcon
          icon={faTimes}
          className="info-card-close"
          onClick={() => setShowInfo(false)}
        />
        <div className="info-content">
          <p className="app-tutorial-content">
            Esta demo usa para la detección de objetos una Red Neuronal
            Convolucional de la familia{" "}
            <a
              href="https://ai.googleblog.com/2019/05/efficientnet-improving-accuracy-and.html"
              target="_blank"
              rel="noreferrer"
            >
              EfficientNet.
            </a>{" "}
            <br />
            <br />{" "}
          </p>
          <div className="app-info-icon">
            <img
              src={cnnLogo}
              style={{
                height: "48px",
                marginBottom: "16px",
                marginLeft: "48px"
              }}
            ></img>
            <FontAwesomeIcon icon={faPlus} style={{ marginBottom: "8px" }} />
            <img
              src={tractionSwitch}
              style={{
                height: "48px",
                marginBottom: "16px",
                marginRight: "48px"
              }}
            ></img>
          </div>
          <p className="app-tutorial-content">
            Fue entrenado para detectar los controles de tracción de una Ranger
            LTD 2020 con luz de día y sin retroiluminación. Incluye solamente la
            perilla de cambio de tracción (2H, 4H, 4L) y los botones de
            desconexión del control de tracción, bloqueo de diferencial y
            control de descenso.
            <br />
            <br />
          </p>
          <div className="app-info-icon">
            <img
              src={appleLogo}
              style={{ height: "48px", marginBottom: "16px" }}
            />
          </div>
          <p className="app-tutorial-content">
            Se planteó como objetivo su funcionamiento en equipos iPhone 7 o
            superiores. El modelo seleccionado alcanzó una precisión de apenas
            48% para un 95% de certeza, proporcionando entre 5 y 7 detecciones
            por segundo. Debido a la baja precisión algunas detecciones son
            erróneas, hecho corregible en detrimento de la performance en
            equipos de gama media o baja.
            <br />
            <br />
          </p>
          <div className="app-info-icon">
            <img
              src={reactLogo}
              style={{
                height: "48px",
                marginBottom: "16px",
                marginLeft: "48px"
              }}
            />
            <FontAwesomeIcon icon={faPlus} style={{ marginBottom: "8px" }} />
            <img
              src={tfLogo}
              style={{
                height: "48px",
                marginBottom: "16px",
                marginRight: "48px"
              }}
            />
          </div>
          <p className="app-tutorial-content">
            Fue implementado usando la API de{" "}
            <a
              href="https://www.tensorflow.org/"
              target="_blank"
              rel="noreferrer"
            >
              Tensorflow
            </a>{" "}
            para JavaScript en una aplicación{" "}
            <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
              React JS
            </a>
            . Las detecciones se filtran manteniendo la de mayor puntaje de cada
            clase que supere al menos el 80% de certeza. Luego se dibujan de
            manera que sean estables y acompañen el movimiento de la cámara
            suavemente para dar al usuario la posibilidad de seleccionarlas. Con
            el mismo propósito, en caso de no detectarse el objeto, el algoritmo
            intentará predecir su posición por al menos 2 segundos más.
            <br />
            <br />
          </p>
          <div className="app-info-icon">
            <img
              src={webglLogo}
              style={{ height: "48px", marginBottom: "16px" }}
            />
          </div>
          <p className="app-tutorial-content">
            Tensorflow fue configurado para usar la aceleración gráfica
            proporcionada por{" "}
            <a href="https://get.webgl.org/" target="_blank" rel="noreferrer">
              WebGL
            </a>
            . Pudiéndose habilitar un backend Web Assembly (
            <a href="https://webassembly.org/" target="_blank" rel="noreferrer">
              WASM
            </a>
            ) para equipos con baja performance o que no tengan una unidad de
            procesamiento gráfico (GPU).
          </p>
        </div>
      </div>
    </div>
  );
};

Info.propTypes = {
  setShowInfo: PropTypes.func.isRequired,
  viewPortWidth: PropTypes.number.isRequired,
  viewPortHeight: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    viewPortHeight: state.constants.viewPortHeight,
    viewPortWidth: state.constants.viewPortWidth
  };
};

export default connect(mapStateToProps)(Info);
