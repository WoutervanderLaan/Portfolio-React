import { useContext } from "react";

import { AboutContext } from "../../store/about/about.reducer";

import LoadingIcon from "../../components/loading-icon/loading-icon.component";

import "./about.styles.scss";

const About = () => {
  const { selectFormattedText } = useContext(AboutContext);

  return !selectFormattedText ? (
    <LoadingIcon />
  ) : (
    <div className="about-container">{selectFormattedText}</div>
  );
};

export default About;
