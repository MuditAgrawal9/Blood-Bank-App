import { userLogin } from "../redux/features/auth/authAction";
import store from "../redux/Store";
import { toast } from "react-toastify";


export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if(!role || !email || !password){
        return toast.info("Please Fill All Fields")
    }
    console.log("Login", email, password, role);
    store.dispatch(userLogin({role,email,password}))
  } catch (error) {
    console.log(error);
  }
};

export const handleRegister = (
  e,
  name,
  role,
  email,
  password,
  organizationName,
  hospitalName,
  address,
  phone,
  website
) => {
  e.preventDefault();
  try {
    if(!role || !email || !password){
        return alert('Please Fill The Fields')
    }
    console.log(
      "Register",
      name,
      role,
      email,
      password,
      organizationName,
      hospitalName,
      address,
      phone,
      website
    );
  } catch (error) {
    console.log(error);
  }
};
