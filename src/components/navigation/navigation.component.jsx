import { Outlet, Link } from "react-router-dom";

import "./navigation.styles.scss";

const Navigation = () => {
  return (
    <>
      <div className="navigation-container">
        <Link to={"/"} className="navigation-element">
          <h2>Wouter van der Laan</h2>
        </Link>
        <Link to={"portfolio"} className="navigation-element">
          <h2>Portfolio</h2>
        </Link>
        <Link to={"resume"} className="navigation-element">
          <h2>Resume</h2>
        </Link>
        <Link to={"about"} className="navigation-element">
          <h2>About</h2>
        </Link>
        <Link to={"contact"} className="navigation-element">
          <h2>Contact</h2>
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
