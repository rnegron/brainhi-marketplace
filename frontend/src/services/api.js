import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Authorization: "Token ..."
  }
});

export default api;
