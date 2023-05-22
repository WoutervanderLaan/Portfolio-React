import { useState } from "react";

const Form = ({ name, label, inputs, handleSubmit }) => {
  const defaultFormValues = {
    startDate: "",
    endDate: "",
    name: "",
    email: "",
    password: "",
  };
  const [inputValues, setInputValues] = useState(defaultFormValues);

  const changeHandler = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e, inputValues);
          setInputValues(defaultFormValues);
        }}
        data-title={name}
      >
        <label>{label}</label>
        <br />
        {inputs.map((input, index) => {
          return (
            <input
              key={index}
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              value={inputValues[input.name]}
              onChange={changeHandler}
              required
            />
          );
        })}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Form;
