import "./FooterComponent.scss";
import cookies from "../../../assets/cookies.svg";

const FooterComponent = () => {
  return (
    <footer>
      <div className="footer__wrapper">
        <p>Come to the dark side... we have</p>
        <img src={cookies} alt="cookie icon" className="footer__cookie" />
      </div>
    </footer>
  );
};

export default FooterComponent;
