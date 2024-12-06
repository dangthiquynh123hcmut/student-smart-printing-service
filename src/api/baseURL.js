import axios from "axios";

const api = axios.create({
  // baseURL: "https://projectprintmachine-backend.onrender.com", 
  baseURL: "http://localhost:8080", 
});

export {api}; 

