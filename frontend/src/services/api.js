import axios from "axios";

let baseURL = "https://brainhi-api.rauln.com/v1";

if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:8000/v1";
} else if (process.env.NODE_ENV === "mirage") {
  baseURL = "http://localhost:3000/v1";
}
const api = axios.create({
  baseURL: baseURL
});

export default api;
