import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AdminContext } from "../../store/admin/admin.reducer";

import { adminLoginWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import Form from "../../components/form/form.component";

import "./login.styles.scss";

const Login = () => {
  const { isAdminLoggedIn, logInAdmin } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdminLoggedIn) navigate("/compose");
  }, [isAdminLoggedIn, navigate]);

  const handleSubmit = async (e, { email, password }) => {
    e.preventDefault();
    try {
      const adminRef = await adminLoginWithEmailAndPassword({
        email,
        password,
      });
      logInAdmin(adminRef);
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
