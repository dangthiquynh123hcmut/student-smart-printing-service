import axios from "./axiosConfig";
const createUserApi = (name, email, password) => {
  const URL_API = "/users";
  const mssv =123456
  const birthday="2004-01-01"
  const username ="quangthanh123" 
  const data = {
    name,
    email,
    password,
    mssv,
    birthday,
    username
    
  };
  return axios.post(URL_API, data);
};
const loginApi = (email, password) => {
  const URL_API = "/auth/token";
  const data = {
    email,
    password,
  };
  return axios.post(URL_API, data);
};
export { createUserApi, loginApi };
