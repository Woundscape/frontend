import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

let instance: AxiosInstance;

export function getInstance(config?: CreateAxiosDefaults) {
  if (!instance) createInstance(config);
  return instance;
}

export function createInstance(config?: CreateAxiosDefaults) {
  instance = axios.create({
    baseURL: "https://wound-backend.vercel.app",
    ...config,
  });
}
