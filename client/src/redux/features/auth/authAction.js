import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";

//login
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      console.log("Sending Login Request:", { email, password, role });

      const { data } = await API.post("/auth/login", { role, email, password });
      console.log("data=", { data });
      //store token
      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success(data.message);
      }
      //    else {
      //     toast.success("Invalid Username or Password");
      //   }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//register
export const userRegister = createAsyncThunk(
  "/auth/registrer",
  async (
    {
      name,
      role,
      email,
      password,
      organizationName,
      hospitalName,
      address,
      phone,
      website,
    },
    { rejectWithValue }
  ) => {
    try {
      console.log("Sending Register Request:", {
        name,
        role,
        email,
        password,
        organizationName,
        hospitalName,
        address,
        phone,
        website,
      });
      const { data } = await API.post("/auth/register", {
        name,
        role,
        email,
        password,
        organizationName,
        hospitalName,
        address,
        phone,
        website,
      });
      console.log("data=", { data });
      if (data.success) {
        toast.success(`${data.message} | Redirecting to Login Page`);
        //redirect after some seconds
        setTimeout(() => {
          window.location.replace("/login");
        }, 4000);
      }
      return data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
