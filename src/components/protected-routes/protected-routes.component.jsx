import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logOutAdmin } from "../../store/admin/admin.reducer";
import { adminLogOut } from "../../utils/firebase/firebase.utils";

import Button from "../button/button.component";

import "./protected-routes.styles.scss";

const ProtectedRoutes = () => {
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      await adminLogOut();
      dispatch(logOutAdmin());
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <Link to={"compose"} className="navigation-element">
        <h2 className="protected">Compose</h2>
      </Link>
      <Link to={"edit-portfolio"} className="navigation-element">
        <h2 className="protected">Edit Portfolio</h2>
      </Link>
      <Button
        value="Log Out"
        className="logout-element"
        onClick={handleClick}
      />
    </>
  );
};

export default ProtectedRoutes;
