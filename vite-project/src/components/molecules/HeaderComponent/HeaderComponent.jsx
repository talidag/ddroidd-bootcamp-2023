import "./HeaderComponent.scss";
import ddroiddLogo from "../../../assets/ddroidd_logo 1.svg";
import { useNavigate, useLocation } from "react-router-dom";

const MainHeader = () => {
  const navigate = useNavigate();

  // To conditionally render the Join Us in the Header button based on the page
  const location = useLocation().pathname;

  const handleClick = () => {
    navigate("/form");
  };

  return (
    <header>
      <a href="/">
        <img src={ddroiddLogo} alt="ddroidd logo" className="header__logo" />
      </a>
      <h1 className="header__heading">Autumn - Winter Bootcamp</h1>
      {location === "/" && <button onClick={handleClick}>Join Us</button>}
    </header>
  );
};

export default MainHeader;
