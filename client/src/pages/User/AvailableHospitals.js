import React, { useEffect, useState } from "react";
import API from "../../services/API";
import "../../styles/AvailableHospitals.css";

const AvailableHospitals = () => {
  const [donarsRecord, setDonarsRecord] = useState([]);

  const getDonars = async () => {
    try {
      const { data } = await API.get("/admin/hospital-list");
      console.log("Donars data=", { data });
      if (data?.success) {
        setDonarsRecord(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);

  return (
    <div className="available-hospitals-container">
      <h1>Hospitals</h1>
      <table className="available-hospitals-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Website</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <tbody>
          {donarsRecord?.map((record) => (
            <tr key={record._id}>
              <td>{record.hospitalName}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{record.website}</td>
              <td>{record.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableHospitals;
