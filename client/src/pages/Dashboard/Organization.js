import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
// import moment from "moment";
import { useSelector } from "react-redux";
import "./../../styles/Organization.css";

const Organization = () => {
  //get user
  const { user } = useSelector((state) => state.auth);

  const [organizationsRecord, setOrganizationsRecord] = useState([]);

  const getOrganizations = async () => {
    try {
      if (user?.role === "donar") {
        const { data } = await API.get("/inventory/get-organizations");
        console.log("Organizations data=", { data });
        if (data?.success) {
          setOrganizationsRecord(data?.organizations);
        }
      }
      if (user?.role === "hospital") {
        console.log("hi");
        const { data } = await API.get(
          "/inventory/get-organizations-for-hospital"
        );
        console.log("Organizations data=", { data });
        if (data?.success) {
          setOrganizationsRecord(data?.organizations);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrganizations();
    // eslint-disable-next-line
  }, [user]);

  return (
    <>
      <Layout>
        <div className="container">
          <h1>Organization</h1>
          {user?.role === "donar" && (
            <h5>
              All the organizations where you have donated your blood are listed
              here
            </h5>
          )}
          {user?.role === "hospital" && (
            <h5>
              All the organizations where you have requested blood are listed
              here
            </h5>
          )}
          <table className="table container">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
              </tr>
            </thead>
            <tbody>
              {organizationsRecord?.map((record) => (
                <tr key={record._id}>
                  <td>{record.name || record.organizationName + "(ORG)"}</td>
                  <td>{record.email}</td>
                  <td>{record.phone}</td>
                  <td>{record.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

export default Organization;
