import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logInAdmin } from "../../store/admin/admin.reducer";
import { selectIsAdminLoggedIn } from "../../store/admin/admin.selector";

import { adminLoginWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import Form from "../../components/form/form.component";

import "./login.styles.scss";

const Login = () => {
  const isAdminLoggedIn = useSelector(selectIsAdminLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdminLoggedIn) navigate("/");
  }, [isAdminLoggedIn, navigate]);

  const handleSubmit = async (e, { email, password }) => {
    e.preventDefault();
    try {
      const adminRef = await adminLoginWithEmailAndPassword({
        email,
        password,
      });
      if (adminRef !== process.env.REACT_APP_UID_ADMIN_REF)
        throw new Error("Invalid User");
      dispatch(logInAdmin(adminRef));
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="login-container">
      <Form
        name="Login"
        handleSubmit={handleSubmit}
        label="Please log in:"
        inputs={[
          { type: "email", name: "email", placeholder: "Email address" },
          {
            type: "password",
            name: "password",
            placeholder: "Password",
          },
        ]}
      />
    </div>
  );
};

export default Login;
