import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faInfoCircle,
  faVrCardboard
} from "@fortawesome/free-solid-svg-icons";
import tutorialIcon from "../../assets/tutorial-icon.png";
import "./app-tutorial.css";

const AppTutorial = ({
  setShowInfo,
  setFirstTime,
  viewPortHeight,
  viewPortWidth
}) => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (step === 6) {
      setFirstTime(false);
      window.localStorage.setItem("firstTime", "false");
    }
  }, [step]);

  return (
    <div
      className="app-tutorial-background"
      style={{ "--height": viewPortHeight, "--width": viewPortWidth }}
    >
      {step === 1 && (
        <div className="app-tutorial-step-one-card">
          <div className="app-tutorial-step-icon">
            <FontAwesomeIcon
              icon={faVrCardboard}
              style={{
                height: "24px",
                width: "24px",
                color: "rgb(108,108,108)",
                marginBottom: "16px"
              }}
            />
          </div>
          <p className="app-tutorial-content">
            Bienvenido a la guía AR.
            <br />
            <br /> Esta es una demo sobre cómo concebimos la tecnología de{" "}
            <a
              href="https://en.wikipedia.org/wiki/Object_detection"
              target="_blank"
              rel="noreferrer"
            >
              Detección de Objetos
            </a>{" "}
            creando una nueva manera de interacturar con el producto.
          </p>
          <a
            className="app-tutorial-nav app-tutorial-nav-next"
            onClick={() => setStep(step + 1)}
          >
            Siguiente
          </a>
        </div>
      )}
      {step === 2 && (
        <div className="app-tutorial-step-one-card">
          <p className="app-tutorial-content">
            Nuestra visión está construida alrededor de guiar al usuario en
            situaciones de la vida real.
          </p>
          <div className="app-tutorial-step-icon">
            <img
              src={tutorialIcon}
              style={{
                height: "72px",
                marginTop: "16px",
                marginBottom: "16px"
              }}
            />
          </div>
          <p className="app-tutorial-content">
            Podés explorar los tutoriales desde la página principal.
          </p>
          <a
            className="app-tutorial-nav app-tutorial-nav-next"
            onClick={() => setStep(step + 1)}
          >
            Siguiente
          </a>
          <a
            className="app-tutorial-nav app-tutorial-nav-prev"
            onClick={() => setStep(step - 1)}
          >
            Anterior
          </a>
        </div>
      )}
      {step === 3 && (
        <div className="app-tutorial-step-one-card">
          <div className="app-tutorial-step-icon">
            <FontAwesomeIcon
              icon={faCamera}
              style={{
                height: "24px",
                width: "24px",
                color: "rgb(108,108,108)",
                marginBottom: "16px"
              }}
            />
          </div>
          <p className="app-tutorial-content">
            Abrí tu camara y experimentá interactuar con el producto usando
            Realidad Aumentada.
            <br />
            <br />
            Esta demo fue entrenada para detectar los controles de tracción
            ubicados en el panel del selector de velocidades de una Ford Ranger
            LTD 2020.
          </p>
          <a
            className="app-tutorial-nav app-tutorial-nav-next"
            onClick={() => setStep(step + 1)}
          >
            Siguiente
          </a>
          <a
            className="app-tutorial-nav app-tutorial-nav-prev"
            onClick={() => setStep(step - 1)}
          >
            Anterior
          </a>
        </div>
      )}
      {step === 4 && (
        <div className="app-tutorial-step-one-card">
          <div className="app-tutorial-step-icon">
            <FontAwesomeIcon
              icon={faCamera}
              style={{
                cursor: "pointer",
                height: "24px",
                width: "24px",
                color: "rgb(108,108,108)"
              }}
            />
            <div className="app-tutorial-step-icon-label">demo</div>
          </div>
          <p className="app-tutorial-content">
            Si no tenés una Ranger a mano, esta opción simulará la experiencia
            usando un video y tu dispositivo para detectar los componentes que
            allí aparezcan.
          </p>
          <a
            className="app-tutorial-nav app-tutorial-nav-next"
            onClick={() => setStep(step + 1)}
          >
            Siguiente
          </a>
          <a
            className="app-tutorial-nav app-tutorial-nav-prev"
            onClick={() => setStep(step - 1)}
          >
            Anterior
          </a>
        </div>
      )}
      {step === 5 && (
        <div className="app-tutorial-step-one-card">
          <div className="app-tutorial-step-icon">
            <FontAwesomeIcon
              icon={faInfoCircle}
              style={{
                cursor: "pointer",
                height: "24px",
                width: "24px",
                color: "rgb(108,108,108)",
                marginBottom: "16px"
              }}
            />
          </div>
          <p className="app-tutorial-content">
            Ingresá{" "}
            <a
              style={{ color: "rgb(0, 122, 255)", cursor: "pointer" }}
              onClick={() => setShowInfo(true)}
            >
              acá
            </a>{" "}
            para conocer más sobre la tecnología usada.
          </p>
          <a
            className="app-tutorial-nav app-tutorial-nav-next"
            onClick={() => setStep(step + 1)}
          >
            Finalizar
          </a>
          <a
            className="app-tutorial-nav app-tutorial-nav-prev"
            onClick={() => setStep(step - 1)}
          >
            Anterior
          </a>
        </div>
      )}
    </div>
  );
};

AppTutorial.propTypes = {
  setShowInfo: PropTypes.func.isRequired,
  setFirstTime: PropTypes.func.isRequired,
  viewPortWidth: PropTypes.number.isRequired,
  viewPortHeight: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    viewPortHeight: state.constants.viewPortHeight,
    viewPortWidth: state.constants.viewPortWidth
  };
};

export default connect(mapStateToProps)(AppTutorial);
