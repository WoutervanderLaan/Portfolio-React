import "./button.styles.scss";

const Button = ({ value, onClick, className }) => {
  return (
    <>
      <button
        className={`${className ? className : ""}`}
        onClick={onClick}
        type="submit"
      >
        {value}
      </button>
    </>
  );
};

export default Button;
