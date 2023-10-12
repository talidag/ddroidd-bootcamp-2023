import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ApplicationForm.scss";
import InputBox from "../../molecules/InputBox/InputBox";
import { useContext } from "react";
import { Context } from "../../../App";

const API_CITIES = "https://countriesnow.space/api/v0.1/countries";
const API_STATES = "https://countriesnow.space/api/v0.1/countries/states";
const phonePattern = /^\+407\d{8}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ApplicationForm = () => {
  const [formData, setFormData] = useContext(Context);

  const [apiData, setApiData] = useState([]);
  const [states, setStates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [countryIndex, setCountryIndex] = useState("");
  const [errorMessage, setErrorMessage] = useState({});

  const [apiCountryError, setApiCountryError] = useState("");
  const [apiStateError, setApiStateError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_CITIES)
      .then((res) => res.json())
      .then((data) => {
        setApiData(data.data);
        setIsLoading(false);
      })
      .catch((error) => setApiCountryError(error));
  }, []);

  useEffect(() => {
    if (countryIndex !== "") {
      fetch(API_STATES, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country: formData.country }),
      })
        .then((response) => {
          if (!response.ok) {
            setApiStateError("Error to fetch states.");
            return;
          }
          return response.json();
        })
        .then((data) => {
          setStates(data.data.states);
        })
        .catch((error) => setApiStateError(error));
    }
  }, [countryIndex]);

  useEffect(() => {
    if (Object.keys(errorMessage).length === 0 && formData.firstName !== "") {
      navigate("/congrats");
    }
  }, [errorMessage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleInputClick = (e) => {
    const { name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: "",
    }));
  };

  const handleDropdownChange = (e) => {
    setApiStateError("");
    if (e.target.value === "Country") {
      return;
    } else {
      setCountryIndex(e.target.value);
      setFormData((prevData) => ({
        ...prevData,
        country: apiData[e.target.value].country,
      }));
    }
  };
  const handleSubmit = (e) => {
    setErrorMessage({});
    e.preventDefault();
    const {
      firstName,
      lastName,
      phoneNr,
      emailAddress,
      addressLine1,
      country,
      city,
    } = formData;

    if (firstName.length == 0) {
      setErrorMessage((prevData) => ({
        ...prevData,
        firstName: "First name is required",
      }));
    }
    if (lastName.length === 0) {
      setErrorMessage((prevData) => ({
        ...prevData,
        lastName: "Last name is required",
      }));
    }
    if (phoneNr.length !== 12 || phoneNr.substring(0, 4) !== "+407") {
      setErrorMessage((prevData) => ({
        ...prevData,
        phoneNr: "Wrong phone number format",
      }));
    }
    if (!emailRegex.test(emailAddress)) {
      setErrorMessage((prevData) => ({
        ...prevData,
        emailAddress: "Email is required",
      }));
    }
    if (addressLine1.length === 0) {
      setErrorMessage((prevData) => ({
        ...prevData,
        addressLine1: "Address is required",
      }));
    }
    if (country.length === 0) {
      setErrorMessage((prevData) => ({
        ...prevData,
        country: "Country is required",
      }));
    }
    if (city.length === 0) {
      setErrorMessage((prevData) => ({
        ...prevData,
        city: "City is required",
      }));
    }
  };

  return (
    <section className="application">
      <div className="application__wrapper">
        <h2>Application Form</h2>
        <form className="application__form">
          <h3 className="application__wrapper__contact">Contact Information</h3>
          <div className="application__contact">
            <InputBox
              id="firstName"
              label="First Name"
              placeholder="First Name"
              handleInputChange={handleInputChange}
              formData={formData}
              handleInputClick={handleInputClick}
              required
              invalidStyle={errorMessage.firstName && formData.firstName === ""}
            />
            <InputBox
              id="lastName"
              label="Last Name"
              placeholder="Last Name"
              handleInputChange={handleInputChange}
              formData={formData}
              handleInputClick={handleInputClick}
              required
              invalidStyle={errorMessage.lastName && formData.lastName === ""}
            />
            <InputBox
              id="phoneNr"
              label="Phone number"
              placeholder="+40 711  111 111"
              handleInputChange={handleInputChange}
              formData={formData}
              handleInputClick={handleInputClick}
              required
              invalidStyle={
                errorMessage.phoneNr && !phonePattern.test(formData.phoneNr)
              }
            />
            <InputBox
              id="emailAddress"
              label="Email address"
              placeholder="john@doe.com"
              handleInputChange={handleInputChange}
              formData={formData}
              handleInputClick={handleInputClick}
              required
              type="email"
              invalidStyle={
                errorMessage.emailAddress &&
                !emailRegex.test(formData.emailAddress)
              }
            />
          </div>
          <h3>Address</h3>
          <div className="application__address">
            <InputBox
              id="addressLine1"
              placeholder="Street name & number"
              label="Address Line 1"
              handleInputChange={handleInputChange}
              formData={formData}
              handleInputClick={handleInputClick}
              required
              invalidStyle={
                errorMessage.addressLine1 && formData.addressLine1 === ""
              }
            />
            <InputBox
              id="addressLine2"
              placeholder="Suite, apartment"
              label="Address Line 2"
              handleInputChange={handleInputChange}
              formData={formData}
              handleInputClick={handleInputClick}
              required={false}
            />
            <div className="application__address__dropdown">
              <div className="dropbox">
                <div className="dropbox__country">
                  <label htmlFor="country">
                    Country <span style={{ color: "#f00" }}> *</span>
                  </label>
                  {!isLoading && apiCountryError === "" && (
                    <select
                      name="country"
                      value={countryIndex}
                      onChange={handleDropdownChange}
                      required
                      style={{
                        border: errorMessage.country ? "1px solid red" : "",
                      }}
                    >
                      <option defaultValue="country">Country</option>
                      {apiData.map((country, index) => (
                        <option value={index} key={index}>
                          {country.country}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="dropbox__state">
                  <label htmlFor="state">State</label>
                  <select
                    name="state"
                    id="state"
                    value={formData["state"]}
                    onChange={handleInputChange}
                  >
                    <option defaultValue="state">State</option>

                    {apiStateError === "" && states.length > 0 ? (
                      states.map((state, index) => (
                        <option key={index} value={state.name}>
                          {state.name}
                        </option>
                      ))
                    ) : (
                      <option key="no-state" value="no-state" disabled>
                        No state found
                      </option>
                    )}
                  </select>
                </div>
                <div className="dropbox__city">
                  <label htmlFor="city">
                    City <span style={{ color: "#f00" }}> *</span>
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    style={{
                      border: errorMessage.city ? "1px solid red" : "",
                    }}
                  >
                    <option defaultValue="city">City</option>
                    {countryIndex ? (
                      apiData[countryIndex].cities.map((city, index) => (
                        <option value={city} key={index}>
                          {city}
                        </option>
                      ))
                    ) : (
                      <option key="no-city" value="no-city" disabled>
                        No city found
                      </option>
                    )}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="application__error__btn">
            {Object.keys(errorMessage).length !== 0 && (
              <div className="application__error">
                <p>Please fix the following errors to proceed:</p>
                <ul>
                  {Object.keys(errorMessage).map((key, index) => (
                    <li key={index}>{errorMessage[key]}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="application__btn">
              <button onClick={handleSubmit}>Join Us</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ApplicationForm;
