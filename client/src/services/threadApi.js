// import axios from "axios";

// // A single, shared Axios instance. Base URL comes from client/.env.development.
// const apiClient = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// // Read the list.
// export async function getThreads() {
//   const response = await apiClient.get("/threads");
//   return response.data;
// }

// // Create a thread. Pure wrapper around the HTTP call — no React, no hooks.
// export async function createThread(data) {
//   const response = await apiClient.post("/threads", data);
//   return response.data;
// }
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001",
});

export async function getThreads() {
  const response = await apiClient.get("/api/threads");
  return response.data;
}

export async function createThread(data) {
  const response = await apiClient.post("/api/threads", data);
  return response.data;
}