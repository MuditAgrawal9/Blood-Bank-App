import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/AuthService";

const ReusableForm = ({ formType, formTitle, submitBtn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <div>
      <form
        onSubmit={(e) => {
          if (formType === "Login") {
            handleLogin(e, email, password, role);
          } else if (formType === "Register") {
            handleRegister(
              e,
              name,
              role,
              email,
              password,
              organizationName,
              hospitalName,
              address,
              phone,
              website
            );
          }
        }}
      >
        <h1 className="text-center">{formTitle}</h1>
        <hr />
        <h5>Make sure you select the correct role</h5>
        <div className="d-flex pb-2">
          <div className="">
            <input
              type="radio"
              className=""
              name="role"
              id="donarRadio"
              value={"donar"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label>Donar</label>
          </div>
          {formType === "Login" && (
            <div className="ms-2">
              <input
                type="radio"
                className=""
                name="role"
                id="adminRadio"
                value={"admin"}
                onChange={(e) => setRole(e.target.value)}
              />
              <label>Admin</label>
            </div>
          )}
          <div className="ms-2">
            <input
              type="radio"
              className=""
              name="role"
              id="organizationRadio"
              value={"organization"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label>Organization</label>
          </div>
          <div className="ms-2">
            <input
              type="radio"
              className=""
              name="role"
              id="hospitalRadio"
              value={"hospital"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label>Hospital</label>
          </div>
        </div>
        <hr />
        {/* conditional redendering of fields */}

        {formType === "Login" && (
          <>
            <InputType
              labelText={"Email"}
              labelFor={"forEmail"}
              inputType={"email"}
              name={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputType
              labelText={"Password"}
              labelFor={"forPassword"}
              inputType={"password"}
              name={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}
        {formType === "Register" && (
          <>
            {(role === "admin" || role === "donar") && (
              <>
                <InputType
                  labelText={"Name"}
                  labelFor={"forname"}
                  inputType={"text"}
                  name={"name"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </>
            )}
            {role === "organization" && (
              <InputType
                labelText={"Organization Name"}
                labelFor={"fororganizationName"}
                inputType={"text"}
                name={"organizationName"}
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
              />
            )}
            {role === "hospital" && (
              <InputType
                labelText={"Hospital Name"}
                labelFor={"forhospitalName"}
                inputType={"text"}
                name={"hospitalName"}
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
              />
            )}

            <InputType
              labelText={"Email"}
              labelFor={"forEmail"}
              inputType={"email"}
              name={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputType
              labelText={"Password"}
              labelFor={"forPassword"}
              inputType={"password"}
              name={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <InputType
              labelText={"Website"}
              labelFor={"forwebsite"}
              inputType={"text"}
              name={"website"}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <InputType
              labelText={"Address"}
              labelFor={"foraddress"}
              inputType={"text"}
              name={"address"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <InputType
              labelText={"Phone"}
              labelFor={"forphone"}
              inputType={"text"}
              name={"phone"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </>
        )}
        <button className="btn btn-primary" type="submit">
          {submitBtn}
        </button>
        <div className="d-flex pt-3">
          {formType === "Login" && (
            <p>
              Not Registered yet?
              <Link to="/register">Register</Link>
            </p>
          )}
          {formType === "Register" && (
            <p>
              Already a user?
              <Link to="/login">Login</Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReusableForm;
