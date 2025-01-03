import React, { useState } from "react";
import InputType from "../Form/InputType";
import { toast } from "react-toastify";
import API from "../../../services/API";
import { useSelector } from "react-redux";

const Modal = () => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState("0");
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => state.auth);
  //handle modal data
  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || !inventoryType || !quantity || !email) {
        return toast.info("Please Provide All Fields");
      }
      const { data } = await API.post("/inventory/create-inventory", {
        email,
        organization: user?._id,
        inventoryType,
        bloodGroup,
        quantity,
      });
      if (data?.success) {
        toast.success(data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
      window.location.reload();
    }
  };

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Manage Blood Record
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="d-flex mb-1">
                Blood Type: &nbsp;
                {/* in out radio */}
                <div className="form-check ms-3">
                  <input
                    type="radio"
                    name="inRadio"
                    className="form-check-input"
                    defaultChecked
                    value={"in"}
                    onChange={(e) => setInventoryType(e.target.value)}
                  />
                  <label htmlFor="in" className="form-check-label">
                    IN
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    type="radio"
                    name="inRadio"
                    className="form-check-input"
                    // defaultChecked
                    value={"out"}
                    onChange={(e) => setInventoryType(e.target.value)}
                  />
                  <label htmlFor="out" className="form-check-label">
                    OUT
                  </label>
                </div>
              </div>
              <select
                className="form-select mb-3"
                aria-label="Default select example"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="" disabled>
                  Open this select menu
                </option>
                <option value={"O+"}>O+</option>
                <option value={"O-"}>O-</option>
                <option value={"AB+"}>AB+</option>
                <option value={"AB-"}>AB-</option>
                <option value={"A+"}>A+</option>
                <option value={"A-"}>A-</option>
                <option value={"B+"}>B+</option>
                <option value={"B-"}>B-</option>
              </select>
              {inventoryType === "in" && (
                <InputType
                  labelText={"Donar Email"}
                  labelFor={"donarEmail"}
                  inputType={"email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
              {inventoryType === "out" && (
                <InputType
                  labelText={"Hospital Email"}
                  labelFor={"hospitalEmail"}
                  inputType={"email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}

              <InputType
                labelText={"Quantity (mL)"}
                labelFor={"quantity"}
                inputType={"Number"}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            {/* button */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleModalSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
