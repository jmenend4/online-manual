import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as vehicleActions from "../../redux/actions/vehicleActions";
import Accordeon from "../common/accordeon/Accordeon";
import YourVehicleFeatures from "./YourVehicleFeatures";
import fordLogo from "../../assets/ford-logo.png";
import "./main.css";

const YourVehicleCard = ({
  vehicle,
  viewPortWidth,
  widthScale,
  heightScale,
  getVehicle
}) => {
  useEffect(() => {
    if (vehicle.id === undefined) {
      getVehicle();
    }
  }, [vehicle]);
  return (
    <>
      <div
        className="card"
        style={{
          "--width": viewPortWidth - 16,
          "--width-scale": widthScale,
          "--height-scale": heightScale
        }}
      >
        {/* <div className="your-vehicle-title">Tu Vehículo</div> */}
        <img src={fordLogo} height={36} width={94} />
        <img className="your-vehicle-picture" src={vehicle.picture} />
        <Accordeon
          title={vehicle.description === undefined ? "" : vehicle.description}
          payload={<YourVehicleFeatures />}
          initClosed={false}
          border={false}
        />
      </div>
    </>
  );
};

YourVehicleCard.propTypes = {
  vehicle: PropTypes.object.isRequired,
  viewPortWidth: PropTypes.number.isRequired,
  widthScale: PropTypes.number.isRequired,
  heightScale: PropTypes.number.isRequired,
  getVehicle: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    vehicle: state.vehicle,
    viewPortWidth: state.constants.viewPortWidth,
    widthScale: state.constants.widthScale,
    heightScale: state.constants.heightScale
  };
};

const mapDispatchToProps = {
  getVehicle: vehicleActions.getVehicle
};

export default connect(mapStateToProps, mapDispatchToProps)(YourVehicleCard);
