import { useState } from "react";

import Button from "../button/button.component";
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
        <Button value={"Submit"} />
      </form>
    </>
  );
};

export default Form;
