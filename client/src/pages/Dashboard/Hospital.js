import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import './../../styles/Organization.css'


const Hospital = () => {
  const [hospitalRecod, setHospitalRecord] = useState([]);

  const getHospital = async () => {
    // console.log("Inside getHospital");
    const { data } = await API.get("/inventory/get-hospitals");
    console.log("Hospital data = ", { data });
    if (data?.success) {
      setHospitalRecord(data?.hospitals);
    }
  };

  useEffect(() => {
    getHospital();
  }, []);

  return (
    <>
      <Layout>
        <div className="container">
          <h1>Hospital</h1>
          <h5>The hospitals that have requested blood are listed here</h5>
          <table className="table container">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
                <th scope="col">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {hospitalRecod?.map((record) => (
                <tr key={record._id}>
                  <td>{record.hospitalName}</td>
                  <td>{record.email}</td>
                  <td>{record.phone}</td>
                  <td>{record.address}</td>
                  <td>
                    {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

export default Hospital;
