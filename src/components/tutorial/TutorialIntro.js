import React, { useEffect, useState } from "react";
import { useSections } from "../../hooks/useSections";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Accordeon from "../common/accordeon/Accordeon";
import "./tutorial.css";
import NextStepButton from "../common/next-step/NextStepButton";

const TutorialIntro = ({
  tutorial,
  vehicle,
  widthScale,
  onBackClick,
  onInitClick
}) => {
  // const [mainSections, setMainSections] = useState([]);
  const sections = useSections(tutorial.steps[0]);

  // useEffect(() => {
  //   const sections = tutorial.steps[0].sections.map((section, i) => (
  //     <Accordeon
  //       key={"_TUTORIAL_SECTION_ID_" + tutorial.id + "_SECTION_" + i}
  //       initClosed={false}
  //       title={section.title}
  //       payload={
  //         <p
  //           className="section-text-content"
  //           dangerouslySetInnerHTML={{ __html: section.content }}
  //         ></p>
  //       }
  //     />
  //   ));
  //   setMainSections(sections);
  // }, []);
  return (
    <>
      <div className="tutorial-title" style={{ "--width-scale": widthScale }}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="chevron-back"
          onClick={() => onBackClick()}
        />
        <p className="tutorial-name">{tutorial.name}</p>
        <p className="subtitle">{vehicle.description}</p>
      </div>
      {sections}
      <div style={{ marginBottom: "88px" }}></div>
      <NextStepButton legend="INICIAR TUTORIAL" onNextClick={onInitClick} />
    </>
  );
};

TutorialIntro.propTypes = {
  tutorial: PropTypes.object.isRequired,
  vehicle: PropTypes.object.isRequired,
  widthScale: PropTypes.number.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onInitClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return { widthScale: state.constants.widthScale };
};

export default connect(mapStateToProps)(TutorialIntro);
