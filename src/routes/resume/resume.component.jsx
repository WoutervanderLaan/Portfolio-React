import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getResumeDocs } from "../../utils/firebase/firebase.utils";

import { selectOrderedResumeItemsMap } from "../../store/resume/resume.selector";

import { setResumeItems } from "../../store/resume/resume.reducer";

import LoadingIcon from "../../components/loading-icon/loading-icon.component";
import TableCategory from "../../components/table-category/table-category.component";

import "./resume.styles.scss";

const Resume = ({ compose = false }) => {
  const resumeItems = useSelector(selectOrderedResumeItemsMap);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchResumeDocs = async () => {
      try {
        const data = await getResumeDocs();
        dispatch(setResumeItems(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchResumeDocs();
  }, [dispatch]);

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
          resumeItems.map(({ category, items, position }, index) => {
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
