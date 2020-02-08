import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/v1",
  headers: {
    Authorization: "Token ..."
  }
});

export default api;
