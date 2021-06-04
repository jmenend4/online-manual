import React, { useEffect, useState } from "react";
import Accordeon from "../components/common/accordeon/Accordeon";
import Shield from "../components/common/icons/Shield";

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
      case "with_icon": {
        return (
          <Accordeon
            key={"_STEP_SECTION_" + i}
            title={section.title}
            payload={
              <div className="section-with-icon">
                <Shield />
                <p
                  className="section-text-content"
                  style={{ marginTop: "16px" }}
                  dangerouslySetInnerHTML={{ __html: section.content }}
                ></p>
              </div>
            }
            type={section.type}
            initClosed={false}
          />
        );
      }
      default: {
        return (
          <Accordeon
            key={"_STEP_SECTION_" + i}
            title={section.title}
            payload={
              <p
                className="section-text-content"
                dangerouslySetInnerHTML={{ __html: section.content }}
              ></p>
            }
            type={section.type}
            initClosed={false}
          />
        );
      }
    }
  });
  return _sections;
};
