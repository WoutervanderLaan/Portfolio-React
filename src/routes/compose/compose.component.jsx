import { useState, useEffect } from "react";

import {
  getAboutDoc,
  setAboutDoc,
  addResumeDoc,
  removeResumeDocs,
} from "../../utils/firebase/firebase.utils";

import Form from "../../components/form/form.component";
import Resume from "../resume/resume.component";
import ABOUT_BACKUP_TEXT from "../../backup/about-backup";

import "./compose.styles.scss";

const Compose = () => {
  const [textareaText, setTextareaText] = useState("");

  useEffect(() => {
    const getText = async () => {
      try {
        const [{ text }] = await getAboutDoc();
        setTextareaText(text);
      } catch (error) {
        console.log(error);
        setTextareaText(ABOUT_BACKUP_TEXT);
      }
    };
    getText();
  }, []);

  const changeHandler = (e) => {
    setTextareaText(e.target.value);
  };

  const handleSubmit = async (e, inputFields) => {
    e.preventDefault();

    const formType = e.target.dataset.title.slice(0, -4);
    if (!inputFields || !formType) return;

    if (formType === "about") {
      const response = await setAboutDoc(textareaText);
      console.log(response);
    }
    if (formType !== "about") {
      const response = await addResumeDoc({ ...inputFields, kind: formType });
      console.log(response);
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="compose-container">
      <p>Change About text:</p>
      <form
        onSubmit={(e) => {
          handleSubmit(e, { textareaText });
        }}
        data-title="aboutForm"
      >
        <textarea
          name="about"
          onChange={changeHandler}
          rows="20"
          value={textareaText}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <p>Add/remove Resume items:</p>
      <Form
        name="educationForm"
        handleSubmit={handleSubmit}
        label="Education & Residencies:"
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
        name="exhibitionForm"
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
        name="prizeForm"
        handleSubmit={handleSubmit}
        label="Prizes, Grants & Nominations:"
        inputs={[
          { type: "number", name: "startDate", placeholder: "Year" },
          { type: "text", name: "name", placeholder: "Name of prize" },
        ]}
      />
      <Form
        name="publicationForm"
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
        name="otherForm"
        handleSubmit={handleSubmit}
        label="Other:"
        inputs={[
          { type: "number", name: "startDate", placeholder: "Year" },
          { type: "text", name: "name", placeholder: "Name of other" },
        ]}
      />
      <form className="resume-form" onSubmit={handleDeleteSubmit}>
        <Resume compose={true} />
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};

export default Compose;
