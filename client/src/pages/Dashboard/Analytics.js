import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "../../services/API";
import moment from "moment";
import "../../styles/Analytics.css";
import Layout from "../../components/shared/Layout/Layout";

const Analytics = () => {
  const [analytics, setAnalytics] = useState([]);
  const [recordData, setRecordData] = useState([]);

  const colors = [
    "#F3F4F6", // Light Gray
    "#FCA5A5", // Pale Red
    "#E5E7EB", // Soft Silver
    "#FDE68A", // Soft Yellow
    "#BFDBFE", // Light Sky Blue
    "#D1D5DB", // Muted Gray
    "#A7F3D0", // Soft Mint
    "#CBD5E1", // Light Blue-Gray
  ];

  // Fetch analytics data
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
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
      <Layout>
        <div className="analytics-container">
          <h1 className="analytics-title">Analytics</h1>

          <div className="cards-container">
            {analytics?.map((record, i) => (
              <div
                className="card"
                key={i}
                style={{ backgroundColor: `${colors[i % colors.length]}` }}
              >
                <h5 className="card-title">{record.bloodGroup}</h5>
                <div className="card-body">
                  <p>
                    Total In: <b>{record.totalIn} mL</b>
                  </p>
                  <p>
                    Total Out: <b>{record.totalOut} mL</b>
                  </p>
                </div>
                <div className="card-footer">
                  Total Available: <b>{record.availableBlood} mL</b>
                </div>
              </div>
            ))}
          </div>

          <div className="table-container">
            <h2>Recent Blood Transactions</h2>
            <table>
              <thead>
                <tr>
                  <th>Blood Group</th>
                  <th>Inventory Type</th>
                  <th>Quantity</th>
                  <th>Email</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {recordData?.map((record) => (
                  <tr key={record._id}>
                    <td>{record.bloodGroup}</td>
                    <td>{record.inventoryType}</td>
                    <td>{record.quantity} mL</td>
                    <td>{record.email}</td>
                    <td>
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Analytics;
