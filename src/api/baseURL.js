import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_DB_URL,
});

export { api };
