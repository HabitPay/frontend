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
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

export default apiManager;
