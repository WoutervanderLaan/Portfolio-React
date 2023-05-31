import { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectMappedPortfolioItems } from "../../store/portfolio/portfolio.selector";
import { setPortfolioItems } from "../../store/portfolio/portfolio.reducer";
import { getPortfolioDocs } from "../../utils/firebase/firebase.utils";
import { formatText } from "../../utils/formatting.utils";

import Arrow from "../../components/arrow/arrow.component";
import EditInputs from "../../components/edit-inputs/edit-inputs.component";

import "./portfolio.styles.scss";

const Portfolio = ({ edit = false }) => {
  const [arrowBoolean, setArrowBoolean] = useState(false);

  const selectPortfolioMap = useSelector(selectMappedPortfolioItems);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPortfolioData = async () => {
      const response = await getPortfolioDocs();
      dispatch(setPortfolioItems(response));
    };
    fetchPortfolioData();
  }, [dispatch]);

  if (!edit) {
    window.addEventListener("scroll", (e) => {
      window.scrollY > 1500 ? setArrowBoolean(true) : setArrowBoolean(false);
    });
  }

  return (
    <>
      <div className={`${edit ? "edit " : ""}portfolio-container`}>
        {selectPortfolioMap.map((item, index) => {
          return (
            <div key={index} className="portfolio-series-container">
              {edit && <EditInputs item={item} index={index} />}
              <div className="info-container">
                <p>{item.titleAndYear}</p>
                {item.material && <p>{item.material}</p>}
                {item.dimensions && <p>{item.dimensions}</p>}
                {item.description && formatText(item.description)}
              </div>
              <div className="images-container">
                {item.image.map((img, index) => {
                  return (
                    <div key={index} className="image-container">
                      {edit && (
                        <input
                          type="checkbox"
                          name={img}
                          className="image-checkbox"
                        ></input>
                      )}
                      <a href={img}>
                        <img src={img} alt="art" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {arrowBoolean && <Arrow />}
    </>
  );
};

export default Portfolio;
