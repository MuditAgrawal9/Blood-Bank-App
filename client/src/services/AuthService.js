export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if(!role || !email || !password){
        return alert('Please Fill All Fields')
    }
    console.log("Login", email, password, role);
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
