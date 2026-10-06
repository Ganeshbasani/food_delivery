import axios from "axios";
export const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "");
export const api = axios.create({ baseURL: `${API_URL}/api/v1`, timeout: 15000 });
export const authHeaders = (token) => token ? { Authorization: `Bearer ${token}` } : {};
