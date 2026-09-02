import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function getThreads() {
  const response = await apiClient.get("/api/threads");
  return response.data;
}

export async function createThread(data) {
  const response = await apiClient.post("/api/threads", data);
  return response.data;
}