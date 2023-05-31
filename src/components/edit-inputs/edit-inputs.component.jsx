import { useState } from "react";

import "./edit-inputs.styles.scss";

const EditInputs = ({ item, index }) => {
  const [orderValue, setOrderValue] = useState(index);

  const changeHandler = (e) => {
    setOrderValue(e.target.value);
    // write a doc to db that holds amount of portfolio series and order of series

    // fetch portofliodata
    // organise series and allow auto index
    // auto index sets values for order doc (determining amount of series and order)

    // write doc to db

    // fetch orderdoc in portfolio mapping selector so it can incorporate order
  };

  const checkboxHandler = (e) => {
    const isChecked = e.target.checked;
    const imageCheckboxes = [
      ...e.target
        .closest(".portfolio-series-container")
        .getElementsByClassName("image-checkbox"),
    ];
    imageCheckboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
  };

  return (
    <div className="edit-inputs">
      <input
        type="checkbox"
        name={`${item.series}-delete`}
        id={item.series}
        onChange={checkboxHandler}
      />
      <input
        type="number"
        name={`${item.series}-order`}
        id={item.series}
        value={orderValue}
        onChange={changeHandler}
      />
    </div>
  );
};

export default EditInputs;
