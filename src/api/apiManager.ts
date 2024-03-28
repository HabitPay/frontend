"use client";

import axios, { AxiosInstance } from "axios";

const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("accessToken");
  }
  return null;
};

const apiManager: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_SERVER}`,
  timeout: 3000,
});

apiManager.interceptors.request.use(
  (config) => {
    const token: String | null = getAccessToken();
    if (token) {
      config.headers.setAuthorization(`Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default apiManager;
