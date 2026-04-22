import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

// Predict API
export const predictCKD = (data) => API.post("/predict", data);

// History API
export const getHistory = () => API.get("/history");

// Metrics API
export const getMetrics = () => API.get("/model-metrics");