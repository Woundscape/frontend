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

export function getInstanceLocal(config?: CreateAxiosDefaults) {
  if (!instance) createInstanceLocal(config);
  return instance;
}

export function createInstanceLocal(config?: CreateAxiosDefaults) {
  instance = axios.create({
    baseURL: "http://localhost:3000/api",
    ...config,
  });
}