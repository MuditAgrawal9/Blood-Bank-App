import React from "react";
import ReusableForm from "../../components/shared/Form/ReusableForm";

const Register = () => {
  return (
    <>
      <div className="row g-0">
        <div className="col-md-8 form-banner">
          <img src="./assets/image1.webp" alt="LoginImage" />
        </div>
        <div className="col-md-4 form-container">
          <ReusableForm
            formTitle={"Register Page"}
            submitBtn={"Register"}
            formType={"Register"}
          />
        </div>
      </div>
    </>
  );
};

export default Register;
