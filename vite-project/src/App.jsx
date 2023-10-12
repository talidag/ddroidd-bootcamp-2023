import FooterComponent from "./components/molecules/FooterComponent/FooterComponent";
import HeaderComponent from "./components/molecules/HeaderComponent/HeaderComponent";
import ApplicationForm from "./components/pages/ApplicationForm/ApplicationForm";
import Hero from "./components/pages/Hero/Hero";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Congrats from "./components/pages/Congrats/Congrats";

const App = () => {
  return (
    <Router>
      <div>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/form" element={<ApplicationForm />} />
          <Route path="/congrats" element={<Congrats />} />
        </Routes>
        <FooterComponent />
      </div>
    </Router>
  );
};

export default App;
