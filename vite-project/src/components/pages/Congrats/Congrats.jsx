import "./Congrats.scss";
import { useContext } from "react";
import { Context } from "../../../App";

const Congrats = () => {
  const [formData, setFormData] = useContext(Context);

  const {
    firstName,
    lastName,
    phoneNr,
    emailAddress,
    addressLine1,
    addressLine2,
    country,
    state,
    city,
  } = formData;
  return (
    <section className="congrats">
      <div className="congrats__wrapper">
        {formData.firstName !== "" ? (
          <div className="congrats__wrapper__text">
            <h2>Excellent</h2>
            <h2>See you in November 2023!</h2>
            <p className="congrats__title">Submission Summary:</p>
            <div className="congrats__form">
              <p>First Name: {firstName}</p>
              <p>Last Name: {lastName}</p>
              <p>Phone Number: {phoneNr}</p>
              <p>Email: {emailAddress}</p>
              <p>Address: {`${addressLine1} ${addressLine2}`}</p>
              <p>Country: {country}</p>
              <p>State: {state !== "" ? state : "none"}</p>
              <p>City: {city}</p>
            </div>
          </div>
        ) : (
          <h4>Please make sure to fill out a form first!</h4>
        )}
      </div>
    </section>
  );
};

export default Congrats;
