import { useSelector } from "react-redux";

import { selectFormattedText } from "../../store/about/about.selector";

import LoadingIcon from "../../components/loading-icon/loading-icon.component";

import "./about.styles.scss";

const About = () => {
  const aboutText = useSelector(selectFormattedText);

  return !aboutText ? (
    <LoadingIcon />
  ) : (
    <div className="about-container">{aboutText}</div>
  );
};

export default About;
