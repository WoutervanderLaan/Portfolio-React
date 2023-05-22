import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";

import { adminLogOut } from "../../utils/firebase/firebase.utils";
import { AdminContext } from "../../store/admin/admin.reducer";

import "./navigation.styles.scss";

const Navigation = () => {
  const { isAdminLoggedIn, logOutAdmin } = useContext(AdminContext);

  const handleClick = async () => {
    try {
      await adminLogOut();
      logOutAdmin();
    } catch (error) {
      alert(error);
    }
  };

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
        <Link to={"compose"} className="admin-element compose">
          <div></div>
        </Link>
        {isAdminLoggedIn && <button onClick={handleClick}>LOG OUT</button>}

        {/* <Link to={"edit-portfolio"} className="admin-element edit-portfolio">
          <div></div>
        </Link> */}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
