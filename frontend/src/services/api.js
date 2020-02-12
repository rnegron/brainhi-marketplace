import axios from "axios";

let baseURL = "https://brainhi-api.rauln.com/v1";

if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:8000/v1";
}

if (process.env.REACT_APP_MIRAGE) {
  baseURL = "http://localhost:3000/v1";
}

const api = axios.create({
  baseURL: baseURL,
  validateStatus: function(status) {
    return status < 500;
  }
});

export default api;
