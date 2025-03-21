import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import './../../styles/Organization.css'

const Donar = () => {
  const [donarsRecord, setDonarsRecord] = useState([]);

  const getDonars = async () => {
    try {
      const { data } = await API.get("/inventory/get-donars");
      console.log("Donars data=", {data});
      if (data?.success) {
        setDonarsRecord(data?.donars);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);
  return (
    <Layout>
      <div className="container">
        <h1>Donars</h1>
        <h5>The blood donars are listed here</h5>
        <table className="table container">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {donarsRecord?.map((record) => (
              <tr key={record._id}>
                <td>
                  {record.name || record.organization + " (ORG)"}
                </td>
                <td>{record.email}</td>
                <td>{record.phone}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Donar;
