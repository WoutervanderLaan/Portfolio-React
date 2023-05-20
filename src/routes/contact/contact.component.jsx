import "./contact.styles.scss";

const Contact = () => {
  return (
    <div className="contact-container">
      <p>Email: woutervdlaan93@gmail.com</p>
      <p>Phone: +31 (0)6 5758 2654</p>
      <div className="icon-container">
        <a
          href="https://www.instagram.com/wvanderlaan/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-instagram fa-xl"></i>
        </a>
        <a
          href="https://www.facebook.com/vdlaan93"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-facebook fa-xl"></i>
        </a>
      </div>
    </div>
  );
};

export default Contact;
