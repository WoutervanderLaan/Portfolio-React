import { useContext } from "react";
import LoadingIcon from "../../components/loading-icon/loading-icon.component";
import TableCategory from "../../components/table-category/table-category.component";

import { ResumeContext } from "../../contexts/resume/resume.context";

import "./resume.styles.scss";

const Resume = ({ compose = false }) => {
  const { resumeItems } = useContext(ResumeContext);

  return (
    <>
      <div className={`resume-container ${compose && "resume-compose"} `}>
        <p>
          Wouter van der Laan (Huizen, NL, 1993) <br />
          Lives and works in Amsterdam (NL)
        </p>
        <br />
        {!resumeItems ? (
          <LoadingIcon />
        ) : (
          resumeItems.map(({ category, items }, index) => {
            return (
              <TableCategory
                key={index}
                category={category}
                items={items}
                compose={compose}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default Resume;
