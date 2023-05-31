import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import {
  uploadFileToStorage,
  fetchFileUrlFromStorage,
  addPortfolioDoc,
  getPortfolioDocs,
} from "../../utils/firebase/firebase.utils";

import { selectPortfolioSeries } from "../../store/portfolio/portfolio.selector";
import { setPortfolioItems } from "../../store/portfolio/portfolio.reducer";

import "./add-portfolio-form.styles.scss";

const defaultValues = {
  series: "",
  titleAndYear: "",
  material: "",
  dimensions: "",
  description: "",
  image: "",
};

const AddPortfolioForm = () => {
  const [formFields, setformFields] = useState(defaultValues);
  const { series, titleAndYear, material, dimensions, description } =
    formFields;

  const allSeries = useSelector(selectPortfolioSeries);

  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setformFields({ ...formFields, [name]: value });
  };

  const handleAddPortfolioForm = async (e, inputFields) => {
    e.preventDefault();
    if (!inputFields.series) return;

    const files = Object.values(e.target.image.files);

    try {
      const uploadedFiles = await uploadFileToStorage(
        files,
        inputFields.series
      );
      uploadedFiles.forEach(async (file) => {
        const fileUrl = await fetchFileUrlFromStorage(
          file.metadata.name,
          inputFields.series
        );
        await addPortfolioDoc({ ...inputFields, image: fileUrl });
      });
      alert("Succesfully uploaded files");
      dispatch(setPortfolioItems(await getPortfolioDocs())); // maybe not necessary
      setformFields(defaultValues);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-portfolio-container">
      <form
        name="add-portfolio"
        encType="multipart/form-data"
        method="post"
        onSubmit={(e) => {
          handleAddPortfolioForm(e, formFields);
        }}
      >
        <input type="hidden" name="form-name" value="add-portfolio" />

        <div className="info-container">
          <p>Upload image:</p>
          <input
            name="series"
            type="text"
            placeholder="Series"
            value={series}
            onChange={changeHandler}
          />
          <input
            name="titleAndYear"
            type="text"
            placeholder="Title & Year"
            value={titleAndYear}
            onChange={changeHandler}
          />
          <input
            name="material"
            type="text"
            placeholder="Materials"
            value={material}
            onChange={changeHandler}
          />
          <input
            name="dimensions"
            type="text"
            placeholder="Dimensions"
            value={dimensions}
            onChange={changeHandler}
          />
          <textarea
            name="description"
            placeholder="Describe work here."
            rows="8"
            value={description}
            onChange={changeHandler}
          ></textarea>
        </div>

        <input type="file" name="image" multiple={true} accept="image/*" />

        <p>Series:</p>
        <div className="portfolio-series">
          {allSeries.map((series, index) => {
            return <p key={index}>{`${index}: ${series}`}</p>;
          })}
        </div>

        <input type="submit" value="Upload" />
      </form>
    </div>
  );
};

export default AddPortfolioForm;
