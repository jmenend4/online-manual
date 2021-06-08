import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as vehicleActions from "../../redux/actions/vehicleActions";
import PropTypes from "prop-types";
import "./main.css";

const YourVehicleFeatures = ({ vehicle, widthScale, getVehicle }) => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    if (vehicle.id === undefined) {
      getVehicle();
    } else {
      buildFeatures();
    }
  }, [vehicle]);

  const buildFeatures = () => {
    const _features = vehicle.features.map((feature, i) => (
      <div
        key={"__VEHICLE_FEATURE_" + i}
        className="your-vehicle-feature-option"
      >
        <div className="your-vehicle-feature-icon">
          <img src={feature.icon} />
        </div>
        <p className="your-vehicle-feature-value">{feature.type}</p>
      </div>
    ));
    setFeatures(_features);
  };

  return (
    <div
      className="your-vehicle-features-options"
      style={{ "--width-scale": widthScale }}
    >
      {features}
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
