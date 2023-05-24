import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./edit-portfolio.styles.scss";

const defaultValues = {
  series: "",
  titleAndYear: "",
  material: "",
  dimensions: "",
  description: "",
};

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const EditPortfolio = () => {
  const [formFields, setformFields] = useState(defaultValues);
  //   const [img, setImg] = useState("");
  const { series, titleAndYear, material, dimensions, description } =
    formFields;

  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setformFields({ ...formFields, [name]: value });
  };

  //   const imageChangeHandler = (e) => {
  //     console.log(e.target.value);
  //     setImg(e.target.value);
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/", {
        method: "POST",
        body: encode({ formname: "portfolio", ...formFields }),
      });
      console.log(response);
      alert("Success!");
      navigate("/portfolio");
    } catch (error) {
      alert(error);
    }
  };

  return (
    // <div className="portfolio-form-container">
    <form
      name="portfolio"
      encType="multipart/form-data"
      method="post"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="portfolio" />
      <p>Upload image:</p>
      <input
        name="series"
        type="text"
        placeholder="Series"
        value={series}
        onChange={changeHandler}
      />
      <br />
      <input
        name="titleAndYear"
        type="text"
        placeholder="Title & Year"
        value={titleAndYear}
        onChange={changeHandler}
      />
      <br />
      <input
        name="material"
        type="text"
        placeholder="Materials"
        value={material}
        onChange={changeHandler}
      />
      <br />
      <input
        name="dimensions"
        type="text"
        placeholder="Dimensions"
        value={dimensions}
        onChange={changeHandler}
      />{" "}
      <br />
      <textarea
        name="description"
        placeholder="Describe work here."
        rows="5"
        value={description}
        onChange={changeHandler}
      ></textarea>
      <input
        type="file"
        name="image"
        //   value={img}
        accept="image/*"
        //   onInput={imageChangeHandler}
      />
      <br />
      <p>Series:</p>
      <div className="portfolio-series"></div>
      <br />
      <input type="submit" value="Upload" />
    </form>
    // </div>
  );
};

export default EditPortfolio;
