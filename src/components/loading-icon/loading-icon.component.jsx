import { useState } from "react";

import "./loading-icon.styles.scss";

const LoadingIcon = () => {
  const [errorTimeout, setErrorTimeout] = useState(false);

  setTimeout(() => {
    setErrorTimeout(true);
  }, 10000);

  return errorTimeout ? (
    <div className="loading-icon">
      <p>Error loading data. Please try again later.</p>
    </div>
  ) : (
    <div className="loading-icon">
      <i className="fa-solid fa-spinner fa-spin-pulse fa-xl"></i>
    </div>
  );
};

export default LoadingIcon;
