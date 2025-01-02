import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";

const OrganizzationList = () => {
  const [donarsRecord, setDonarsRecord] = useState([]);

  const getDonars = async () => {
    try {
      const { data } = await API.get("/admin/org-list");
      console.log("Donars data=", { data });
      if (data?.success) {
        setDonarsRecord(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are You Sure You Want To Delete This Organization",
        "Sure"
      );
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-record/${id}`);
      alert(data?.message);
      window.location.reload();
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
        <h1>Organizations</h1>
        <table className="table container">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Date & Time</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {donarsRecord?.map((record) => (
              <tr key={record._id}>
                <td>{record.name || record.organizationName + " (ORG)"}</td>
                <td>{record.email}</td>
                <td>{record.phone}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                <td>
                  <div
                    className="btn btn-danger"
                    onClick={() => handleDelete(record._id)}
                  >
                    Delete
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default OrganizzationList;
