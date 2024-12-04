import axios from "axios";

const api = axios.create({
  baseURL: "https://projectprintmachine-backend.onrender.com", 
});
const localApi = axios.create({
  baseURL: "http://localhost:8080", 
});

export {api, localApi}; 

