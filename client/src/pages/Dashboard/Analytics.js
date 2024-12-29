import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "../../services/API";
import moment from "moment";

const Analytics = () => {
  const [analytics, setAnalytics] = useState([]);
  const [recordData, setRecordData] = useState([]);

  const colors = [
    "#edede9",
    "#d6ccc2",
    "#f5ebe0",
    "#e3d5ca",
    "#d5bdaf",
    "#fefae0",
    "#faedcd",
    "#d4a373",
  ];
  //get blood data
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        // console.log("Analytics data=", data);
        setAnalytics(data?.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodGroupData();
  }, []);

  const getBloodRecord = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      console.log("Recent data=", data);
      if (data?.success) {
        setRecordData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecord();
  }, []);

  return (
    <>
      <Header />
      <h1 className="text-center">Analytics</h1>
      <div className="d-flex flex-row flex-wrap container">
        {analytics?.map((record, i) => (
          <div
            className="card m-2 p-1"
            key={i}
            style={{ width: "18rem", backgroundColor: `${colors[i]}` }}
          >
            <div className="card-body">
              <h5 className="card-title bg-light text-dark text-center mb-3">
                {record.bloodGroup}
              </h5>
              <p className="card-text">
                Total In:<b>{record.totalIn}(mL)</b>
              </p>
              <p className="card-text">
                Total Out:<b>{record.totalOut}(mL)</b>
              </p>
            </div>
            <div className="card-footer bg-dark text-light text-center">
              Total Available: <b>{record.availableBlood}(mL)</b>
            </div>
          </div>
        ))}
      </div>
      <div className="container mt-3">
        <h1>Recent Blood Transactions</h1>
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
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analytics;
