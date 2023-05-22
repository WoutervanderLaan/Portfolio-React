import { useContext } from "react";
import LoadingIcon from "../../components/loading-icon/loading-icon.component";
import TableCategory from "../../components/table-category/table-category.component";

import { ResumeContext } from "../../store/resume/resume.reducer";

import "./resume.styles.scss";

const orderResumeCategories = (resumeItems) => {
  const orderedResumeItems = resumeItems.map((item) => {
    switch (item.category) {
      case "Education & Residencies":
        return {
          ...item,
          position: 1,
        };
      case "Exhibitions":
        return {
          ...item,
          position: 2,
        };
      case "Prizes, Grants & Nominations":
        return {
          ...item,
          position: 3,
        };
      case "Publications":
        return {
          ...item,
          position: 4,
        };
      case "Other":
        return {
          ...item,
          position: 5,
        };
      default:
        return item;
    }
  });
  return orderedResumeItems;
};

const Resume = ({ compose = false }) => {
  const { selectMappedResumeItems } = useContext(ResumeContext);
  const resumeItems = selectMappedResumeItems();
  const positionedResumeItems = orderResumeCategories(resumeItems);

  return (
    <>
      <div className={`resume-container ${compose ? "resume-compose" : ""} `}>
        <p>
          Wouter van der Laan (Huizen, NL, 1993) <br />
          Lives and works in Amsterdam (NL)
        </p>
        <br />
        {resumeItems.length === 0 ? (
          <LoadingIcon />
        ) : (
          positionedResumeItems.map(({ category, items, position }, index) => {
            return (
              <TableCategory
                position={position}
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
