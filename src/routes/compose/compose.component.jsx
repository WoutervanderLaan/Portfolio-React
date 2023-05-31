import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  setAboutDoc,
  addResumeDoc,
  getResumeDocs,
  removeResumeDocs,
} from "../../utils/firebase/firebase.utils";

import { selectRawAboutText } from "../../store/about/about.selector";
import { setAboutText } from "../../store/about/about.reducer";
import { selectIsAdminLoggedIn } from "../../store/admin/admin.selector";

import { setResumeItems } from "../../store/resume/resume.reducer";

import Form from "../../components/form/form.component";
import Resume from "../resume/resume.component";
import Button from "../../components/button/button.component";

import "./compose.styles.scss";

const Compose = () => {
  const [textareaText, setTextareaText] = useState("");

  const rawAboutText = useSelector(selectRawAboutText);
  const isAdminLoggedIn = useSelector(selectIsAdminLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate("/login");
    }

    setTextareaText(rawAboutText);
  }, [rawAboutText, isAdminLoggedIn, navigate]);

  const changeHandler = (e) => {
    setTextareaText(e.target.value);
  };

  const handleSubmit = async (e, inputFields) => {
    e.preventDefault();

    const formType = e.target.dataset.title;
    if (!inputFields || !formType) return;

    if (formType === "about") {
      try {
        await setAboutDoc(textareaText);
        dispatch(setAboutText(textareaText));
        console.log("Text succesfully updated.");
      } catch (error) {
        console.error(`Error changing text: ${error}`);
      }
    }
    if (formType !== "about") {
      const newitem = {
        ...inputFields,
        category: formType,
      };
      try {
        await addResumeDoc(newitem);
        const data = await getResumeDocs();
        dispatch(setResumeItems(data));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    const formElements = [...e.target.elements];
    const itemsToRemove = formElements
      .filter((element) => element.checked === true)
      .map((item) => item.name);
    try {
      await removeResumeDocs(itemsToRemove);
      formElements.forEach((input) => (input.checked = false));
      const data = await getResumeDocs();
      dispatch(setResumeItems(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="compose-container">
      <p>Change About text:</p>
      <form
        onSubmit={(e) => {
          handleSubmit(e, { textareaText });
        }}
        data-title="about"
      >
        <textarea
          name="about"
          onChange={changeHandler}
          rows="20"
          value={textareaText}
        ></textarea>
        <Button value={"Submit"} />
      </form>
      <p>Add/remove Resume items:</p>
      <Form
        name="Education & Residencies"
        handleSubmit={handleSubmit}
        label="Education & Residencies"
        inputs={[
          { type: "number", name: "startDate", placeholder: "Starting year" },
          { type: "number", name: "endDate", placeholder: "Ending year" },
          {
            type: "text",
            name: "name",
            placeholder: "Name of institution",
          },
        ]}
      />
      <Form
        name="Exhibitions"
        handleSubmit={handleSubmit}
        label="Exhibitions:"
        inputs={[
          { type: "number", name: "startDate", placeholder: "Year" },
          {
            type: "text",
            name: "name",
            placeholder: "Name of institution",
          },
        ]}
      />
      <Form
        name="Prizes, Grants & Nominations"
        handleSubmit={handleSubmit}
        label="Prizes, Grants & Nominations:"
        inputs={[
          { type: "number", name: "startDate", placeholder: "Year" },
          { type: "text", name: "name", placeholder: "Name of prize" },
        ]}
      />
      <Form
        name="Publications"
        handleSubmit={handleSubmit}
        label="Publications:"
        inputs={[
          { type: "number", name: "startDate", placeholder: "Year" },
          {
            type: "text",
            name: "name",
            placeholder: "Name of publication",
          },
        ]}
      />
      <Form
        name="Other"
        handleSubmit={handleSubmit}
        label="Other:"
        inputs={[
          { type: "number", name: "startDate", placeholder: "Year" },
          { type: "text", name: "name", placeholder: "Name of other" },
        ]}
      />
      <form className="resume-form" onSubmit={handleDeleteSubmit}>
        <Resume compose={true} />
        <Button value={"Delete"} />
        {/* <button type="submit">Delete</button> */}
      </form>
    </div>
  );
};

export default Compose;
