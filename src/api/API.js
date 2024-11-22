import axios from "./axiosConfig";
const createUserApi = (firstname, email, password, lastname, id, date) => {
  const URL_API = "/users";
  const data = {
    firstname,
    email,
    password,
    lastname,
    id,
    date

  };
  return axios.post(URL_API, data);
};
const loginApi = (email, password) => {
  const URL_API = "/auth/token";
  const data = {
    email,
    password,
  };

  return axios.post(URL_API, data)
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });

};
const getMyInfoApi = (token) => {
  const URL_API = '/users/myInfo';
  return axios.get(URL_API, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
};

export { createUserApi, loginApi, getMyInfoApi};
