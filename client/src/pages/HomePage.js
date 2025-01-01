import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetError } from "../redux/features/auth/authSlice";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import API from "../services/API";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [recordData, setRecordData] = useState([]);

  const navigate = useNavigate();
  //get function
  const getBloodRecord = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      // console.log(data);
      if (data?.success) {
        setRecordData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //to display toast notification when state changes n reset the state on page change
  useEffect(() => {
    getBloodRecord();

    if (error) {
      toast.warning(error);
    }

    return () => {
      dispatch(resetError()); // Clear error state when unmounting
    };
  }, [error, dispatch]);

  return (
    <>
      <Layout>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {user?.role === 'admin' && navigate("/admin")}
            <div className="container">
              <h4
                className="ms-4"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style={{ cursor: "pointer" }}
              >
                <i className="fa-solid fa-plus text-success py-4"></i>
                Add Inventory
              </h4>
              <Modal />
              <table className="table container">
                <thead>
                  <tr>
                    <th scope="col">Blood Group</th>
                    <th scope="col">Inventory Type</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Donar Email</th>
                    <th scope="col">Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recordData?.map((record) => (
                    <tr key={record._id}>
                      <td>{record.bloodGroup}</td>
                      <td>{record.inventoryType}</td>
                      <td>{record.quantity} (mL)</td>
                      <td>{record.email}</td>
                      <td>
                        {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default HomePage;
