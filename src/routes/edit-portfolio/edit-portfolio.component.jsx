import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsAdminLoggedIn } from "../../store/admin/admin.selector";

import {
  deleteImages,
  removePortfolioDocs,
} from "../../utils/firebase/firebase.utils";

import AddPortfolioForm from "../../components/add-portfolio-form/add-portfolio-form.component";
import Portfolio from "../portfolio/portfolio.component";
import Button from "../../components/button/button.component";

import "./edit-portfolio.styles.scss";

const EditPortfolio = () => {
  const isAdminLoggedIn = useSelector(selectIsAdminLoggedIn);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate("/login");
    }
  }, [isAdminLoggedIn, navigate]);

  const handleEditPortfolioForm = async (e) => {
    e.preventDefault();

    const formElements = [...e.target.elements];

    const ImagesToRemove = formElements
      .filter(
        (element) =>
          element.checked === true && element.className === "image-checkbox"
      )
      .map((item) => item.name);

    if (ImagesToRemove.length > 0) {
      try {
        await deleteImages(ImagesToRemove);
        await removePortfolioDocs(ImagesToRemove);
        console.log("done");
      } catch (error) {
        console.error(error);
      }
    }
    const newSeriesOrder = formElements
      .filter((element) => element.value >= 0)
      .map((item) => ({ series: item.id, order: item.value }));
    console.log(newSeriesOrder);
  };

  return (
    <>
      <AddPortfolioForm />
      <div className="edit-portfolio-container">
        <form name="edit-portfolio" onSubmit={handleEditPortfolioForm}>
          <Portfolio edit={true} />
          <Button value="Submit" />
        </form>
      </div>
    </>
  );
};

export default EditPortfolio;
