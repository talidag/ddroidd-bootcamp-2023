import "./Hero.scss";
import destructuring from "../../../assets/destructuring.svg";
import webPage from "../../../assets/WebPage_logo.svg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/form");
  };
  return (
    <section className="hero">
      <div className="hero__wrapper">
        <div className="hero__images">
          <img
            src={destructuring}
            alt="front-end programming languages"
            className="hero__languages"
          />
          <img src={webPage} alt="a webpage structure" className="hero__page" />
        </div>
        <div className="hero__button">
          <button onClick={handleClick}>Join Us</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
