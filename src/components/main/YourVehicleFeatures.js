import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as vehicleActions from "../../redux/actions/vehicleActions";
import PropTypes from "prop-types";
import "./main.css";

const YourVehicleFeatures = ({ vehicle, widthScale, getVehicle }) => {
  useEffect(() => {
    if (vehicle.id === undefined) {
      getVehicle();
    }
  }, [vehicle]);

  return (
    <div
      className="your-vehicle-features-options"
      style={{ "--width-scale": widthScale }}
    >
      <div className="your-vehicle-feature-option">
        <div className="your-vehicle-feature-icon">
          <img
            src="../../assets/crew-cab_feature.png"
            width="24px"
            height="12px"
          />
        </div>
        <p className="your-vehicle-feature-value">
          {vehicle.id !== undefined
            ? vehicle.crewCab
              ? "Cabina Doble"
              : "Cabina Simple"
            : ""}
        </p>
      </div>
      <div className="your-vehicle-feature-option">
        <div className="your-vehicle-feature-icon">
          <img
            src="../../assets/traction_feature.png"
            width="19px"
            height="22px"
          />
        </div>
        <p className="your-vehicle-feature-value">
          {vehicle.traction !== undefined ? vehicle.traction : ""}
        </p>
      </div>
      <div className="your-vehicle-feature-option">
        <div className="your-vehicle-feature-icon">
          <img src="../../assets/fuel_feature.png" width="24px" height="12px" />
        </div>
        <p className="your-vehicle-feature-value">
          {vehicle.fuel !== undefined ? vehicle.fuel : ""}
        </p>
      </div>
    </div>
  );
};

YourVehicleFeatures.propTypes = {
  vehicle: PropTypes.object.isRequired,
  widthScale: PropTypes.number.isRequired,
  getVehicle: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return { vehicle: state.vehicle, widthScale: state.constants.widthScale };
};

const mapDispatchToProps = { getVehicle: vehicleActions.getVehicle };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YourVehicleFeatures);
