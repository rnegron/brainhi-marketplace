import axios from "axios";

let baseURL = "http://localhost:3000/v1";

if (process.env.NODE_ENV !== "development") {
  baseURL = "https://brainhi-api.rauln.com/v1";
}

const api = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: "Token ..."
  }
});

export default api;
