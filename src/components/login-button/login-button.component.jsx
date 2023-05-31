import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <Link to={"/login"} className="login-element">
      <div></div>
    </Link>
  );
};

export default LoginButton;
