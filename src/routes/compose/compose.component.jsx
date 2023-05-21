import { useState, useEffect, useContext } from "react";

import {
  setAboutDoc,
  addResumeDoc,
  removeResumeDocs,
} from "../../utils/firebase/firebase.utils";

import { AboutContext } from "../../store/about/about.reducer";
import { ResumeContext } from "../../store/resume/resume.reducer";

import Form from "../../components/form/form.component";
import Resume from "../resume/resume.component";

import "./compose.styles.scss";

const Compose = () => {
  const { aboutText, setAboutText } = useContext(AboutContext);
  const { addResumeItem, removeResumeItems } = useContext(ResumeContext);

  const [textareaText, setTextareaText] = useState("");

  useEffect(() => {
    setTextareaText(aboutText);
  }, [aboutText]);

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
        setAboutText(textareaText);
        console.log("Text succesfully updated.");
      } catch (error) {
        console.error(error);
        setAboutText(textareaText + " (Submit Failed...)");
      }
    }
    if (formType !== "about") {
      await addResumeDoc({
        ...inputFields,
        category: formType,
      });
      addResumeItem();
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
      removeResumeItems();
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
        data-title="about"
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
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};

export default Compose;
