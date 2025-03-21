import React, { useEffect } from "react";
import ReusableForm from "../../components/shared/Form/ReusableForm";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../../components/shared/Spinner";
import { resetError } from "../../redux/features/auth/authSlice";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //to display toast notification when state changes n reset the state on page change
  useEffect(() => {
    if (error) {
      toast.warning(error);
    }

    return () => {
      dispatch(resetError()); // Clear error state when unmounting
    };
  }, [error, dispatch]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="row g-0">
          <div className="col-md-8 form-banner">
            <img src="./assets/image1.webp" alt="LoginImage" />
          </div>
          <div className="col-md-4 form-container">
            <ReusableForm
              formTitle={"Register"}
              submitBtn={"Register"}
              formType={"Register"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
