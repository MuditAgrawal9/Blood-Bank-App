import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import API from "../../services/API";
import moment from "moment";

const Donation = () => {
  const [donations, setDonations] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const getdonations = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "in",
          donar: user?._id,
        },
      });
      console.log("donations data=", { data });
      if (data?.success) {
        setDonations(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdonations();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Layout>
        <div className="container">
          <h1>Donations</h1>
          <h5>All your donations at one place</h5>
          <table className="table container">
            <thead>
              <tr>
                <th scope="col">Blood Group</th>
                <th scope="col">Inventory Type</th>
                <th scope="col">Quantity</th>
                <th scope="col">Email</th>
                <th scope="col">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {donations?.map((record) => (
                <tr key={record._id}>
                  <td>{record.bloodGroup}</td>
                  <td>{record.inventoryType}</td>
                  <td>{record.quantity}(mL)</td>
                  <td>{record.email}</td>
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

export default Donation;
