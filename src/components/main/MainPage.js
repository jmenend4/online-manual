import React from "react";
import PropTypes from "prop-types";
import NavBar from "../nav-bar/NavBar";
import TutorialsCard from "./TutorialsCard";
import YourVehicleCard from "./YourVehicleCard";

const MainPage = ({ history }) => {
  return (
    <>
      <YourVehicleCard />
      <TutorialsCard history={history} />
      <NavBar history={history} />
    </>
  );
};

MainPage.propTypes = { history: PropTypes.object.isRequired };

export default MainPage;
