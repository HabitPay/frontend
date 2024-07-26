"use client";

import { removeJwtFromSessionStorage } from "@/libs/jwt";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useRouter } from "next/navigation";

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("accessToken");
  }
  return null;
};

const getTokenType = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("tokenType");
  }
  return null;
};

const apiManager: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api`,
  timeout: 3000,
});

apiManager.interceptors.request.use(
  (config) => {
    const token: String | null = getAccessToken();
    let tokenType: String | null = getTokenType();
    if (!tokenType) {
      tokenType = "Bearer";
    }
    if (token) {
      config.headers.setAuthorization(`${tokenType} ${token}`);
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

apiManager.interceptors.response.use(
  async function (response: AxiosResponse): Promise<AxiosResponse> {
    return response;
  },
  async function (error: AxiosError): Promise<AxiosResponse | Promise<never>> {
    const router = useRouter();
    const logout = () => {
      removeJwtFromSessionStorage();
      router.push("/");
    };

    const { config, response } = error;
    const originalRequest = config as InternalAxiosRequestConfig;

    if (!response) {
      return Promise.reject(error);
    }

    const { status, data } = response;

    if (status === 401) {
      if (data === "InvalidTokenException") {
        logout();
      } else if (data === "TokenExpired") {
        try {
          const tokenRefreshResult: AxiosResponse = await apiManager.post(
            "/token"
          );
          if (tokenRefreshResult.status === 200) {
            const { accessToken } = tokenRefreshResult.data;
            sessionStorage.setItem("accessToken", accessToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return apiManager(originalRequest);
          } else {
            logout();
          }
        } catch (e) {
          console.log(e);
          logout();
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiManager;
