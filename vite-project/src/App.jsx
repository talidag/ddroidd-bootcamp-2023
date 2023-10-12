import FooterComponent from "./components/molecules/FooterComponent/FooterComponent";
import HeaderComponent from "./components/molecules/HeaderComponent/HeaderComponent";
import ApplicationForm from "./components/pages/ApplicationForm/ApplicationForm";
import Hero from "./components/pages/Hero/Hero";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Congrats from "./components/pages/Congrats/Congrats";
import { useState, createContext } from "react";

export const Context = createContext();

const App = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNr: "",
    emailAddress: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    state: "",
    city: "",
  });

  return (
    <Router>
      <div>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route
            path="/form"
            element={
              <Context.Provider value={[formData, setFormData]}>
                <ApplicationForm />
              </Context.Provider>
            }
          />
          <Route
            path="/congrats"
            element={
              <Context.Provider value={[formData, setFormData]}>
                <Congrats />
              </Context.Provider>
            }
          />
        </Routes>
        <FooterComponent />
      </div>
    </Router>
  );
};

export default App;
