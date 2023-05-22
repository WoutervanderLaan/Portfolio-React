import { useState } from "react";

import "./portfolio.styles.scss";

import Arrow from "../../components/arrow/arrow.component";

import PORTFOLIO_BACKUP_ITEMS from "../../backup-items/portfolio-backup-items";

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState(PORTFOLIO_BACKUP_ITEMS);
  const [arrowBoolean, setArrowBoolean] = useState(false);

  window.addEventListener("scroll", (e) => {
    window.scrollY > 1500 ? setArrowBoolean(true) : setArrowBoolean(false);
  });

  const newPortfolioMap = portfolioItems.reduce((acc, cur) => {
    const existingSeries = acc.find((item) => item.series === cur.series);
    if (!existingSeries) {
      const itemWithImageToArray = { ...cur, img: [cur.img] };
      return [...acc, itemWithImageToArray];
    }
    if (existingSeries) {
      const updatedArray = acc.map((item) => {
        if (item === existingSeries) {
          const title = item.title ? item.title : cur.title;
          const material = item.material ? item.material : cur.material;
          const dimensions = item.dimensions ? item.dimensions : cur.dimensions;
          const description = item.description
            ? item.description
            : cur.description;

          return {
            ...item,
            title,
            material,
            dimensions,
            description,
            img: [...item.img, cur.img],
          };
        }
        return item;
      });

      return updatedArray;
    }
  }, []);

  return (
    <>
      <div className="portfolio-container">
        {newPortfolioMap.map((item, index) => {
          return (
            <div key={index} className="portfolio-series-container">
              <p>{item.title}</p>
              {item.material && <p>{item.material}</p>}
              {item.dimensions && <p>{item.dimensions}</p>}
              {item.description && <p>{item.description}</p>}
              <div className="image-container">
                {item.img.map((img, index) => {
                  return (
                    <a href={img} key={index}>
                      <img src={img} alt="art" />
                    </a>
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
