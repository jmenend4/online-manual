import React, { useEffect, useState } from "react";
import Accordeon from "../components/common/accordeon/Accordeon";
import RelatedComponentCard from "../components/common/carousel/related-component/RelatedComponentCard";
import VideoCard from "../components/common/carousel/video-card/VideoCard";
import Shield from "../components/common/icons/Shield";
import Gear from "../components/common/icons/Gear";
import Cow from "../components/common/icons/Cow";
import FourWheelDrive from "../components/common/icons/FourWheelDrive";
import HandleWarning from "../components/common/icons/HandleWarning";
import PickUp from "../components/common/icons/PickUp";
import Speedometer from "../components/common/icons/Speedometer";
import "../components/tutorial/tutorial.css";

export const useSections = (step) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    setSections(buildSections(step));
  }, []);

  return sections;
};

const buildSections = (step) => {
  const _sections = step.sections.map((section, i) => {
    switch (section.type) {
      case "videos": {
        const videos = section.content.map((video, i) => (
          <VideoCard
            key={"__STEP_" + step.order + "_RELATED_VIDEO__" + i}
            cardIndex={i}
            videos={section.content}
          />
        ));
        return (
          <Accordeon
            key={"__STEP_" + step.order + "_STEP_SECTION_" + i}
            title={section.title}
            payload={videos}
            type={section.type}
            // initClosed={false}
            height={316}
          />
        );
      }
      case "related_features": {
        const components = section.content.map((component, i) => (
          <RelatedComponentCard
            key={"__STEP_" + step.order + "_RELATED_COMPONENT__" + i}
            cardIndex={i}
            components={section.content}
          />
        ));
        return (
          <Accordeon
            key={"__STEP_" + step.order + "_STEP_SECTION_" + i}
            title={section.title}
            payload={components}
            type={section.type}
            // initClosed={false}
            height={316}
          />
        );
      }
      default: {
        const subSections = section.content.map((subSection, i) => (
          <div
            key={
              "__STEP_" + step.order + "_" + section.title + "_SUBSECTION__" + i
            }
            className="section-with-icon"
          >
            {subSection.icon && selectIcon(subSection.icon, i)}
            <p
              className="section-text-content"
              style={{ marginTop: subSection.icon ? "16px" : 0 }}
              dangerouslySetInnerHTML={{ __html: subSection.text }}
            ></p>
          </div>
        ));
        return (
          <Accordeon
            key={"__STEP_" + step.order + "_STEP_SECTION_" + i}
            title={section.title}
            payload={subSections}
            type={section.type}
            initClosed={false}
          />
        );
      }
    }
  });
  return _sections;
};

const selectIcon = (iconDescriptor, index) => {
  const style = index > 0 ? { marginTop: "24px" } : {};
  switch (iconDescriptor) {
    case "shield": {
      return <Shield style={style} />;
    }
    case "gear": {
      return <Gear style={style} />;
    }
    case "cow": {
      return <Cow style={style} />;
    }
    case "fourWheelDrive": {
      return <FourWheelDrive style={style} />;
    }
    case "handleWarning": {
      return <HandleWarning style={style} />;
    }
    case "pickUp": {
      return <PickUp style={style} />;
    }
    case "speedometer": {
      return <Speedometer style={style} />;
    }
    default: {
      return <Shield style={style} />;
    }
  }
};
