import { useEffect, useState, Fragment } from "react";

import { getAboutDoc } from "../../utils/firebase/firebase.utils";

import LoadingIcon from "../../components/loading-icon/loading-icon.component";
import ABOUT_BACKUP_TEXT from "../../backup/about-backup";
import "./about.styles.scss";

const formatAboutText = (text) => {
  const formattedText = text.split(" <br> ").map((paragraph, index) => {
    return (
      <Fragment key={index}>
        <p>{paragraph}</p>
        <br />
      </Fragment>
    );
  });

  return formattedText;
};

const About = () => {
  const [aboutText, setAboutText] = useState("");

  useEffect(() => {
    const getText = async () => {
      try {
        const [{ text }] = await getAboutDoc();
        setAboutText(formatAboutText(text));
      } catch (error) {
        console.log(error);

        setAboutText(formatAboutText(ABOUT_BACKUP_TEXT));
      }
    };
    getText();
  }, []);

  return aboutText === "" ? (
    <LoadingIcon />
  ) : (
    <div className="about-container">{aboutText}</div>
  );
};

export default About;
