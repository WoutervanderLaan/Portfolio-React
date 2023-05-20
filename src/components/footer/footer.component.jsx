import "./footer.styles.scss";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="copyright-container">
      <p>{`© Wouter van der Laan ${year}`}</p>
    </div>
  );
};

export default Footer;
