import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetError } from "../redux/features/auth/authSlice";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";

const HomePage = () => {
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
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1>Home Page</h1>
        </>
      )}
    </Layout>
  );
};

export default HomePage;
