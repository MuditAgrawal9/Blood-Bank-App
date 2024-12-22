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
      console.log("data=",{data});
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
