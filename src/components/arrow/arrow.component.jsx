import "./arrow.styles.scss";

const Arrow = () => {
  return (
    <div className="arrow-container">
      <a href="#top">
        <div className="arrow">
          <i className="fa-solid fa-arrow-up fa-xl"></i>
          <p>Back to top</p>
        </div>
      </a>
    </div>
  );
};

export default Arrow;
