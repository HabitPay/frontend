"use client";

import { getAccessToken, removeJwtFromLocalStorage } from "@/libs/jwt";
import { IApiErrorResponseDto } from "@/types/api/apiResponse.interface";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
// window 로 리다이렉트하기로 바꾸기
// import { useRouter } from "next/navigation";

const getTokenType = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("tokenType");
  }
  return null;
};

const apiManager: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api`,
  timeout: 3000,
  withCredentials: true,
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
  async function (
    error: AxiosError<IApiErrorResponseDto>
  ): Promise<AxiosResponse | Promise<never>> {
    // const router = useRouter();
    const logout = () => {
      removeJwtFromLocalStorage();
      window.location.href = "/";
      // router.push("/");
    };

    const { config, response } = error;
    const originalRequest = config as InternalAxiosRequestConfig;

    if (!response) {
      return Promise.reject(error);
    }

    const { status, data } = response;

    if (status === 401) {
      try {
        const tokenRefreshResult: AxiosResponse = await apiManager.post(
          "/token"
        );
        if (tokenRefreshResult.status === 200) {
          const { accessToken } = tokenRefreshResult.data.data;
          localStorage.setItem("accessToken", accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiManager(originalRequest);
        } else {
          logout();
        }
      } catch (e) {
        console.log(e);
        logout();
      }
      // access token이 invalid할때와, expired되었을 때 두 가지 경우로 나눈경우
      // 지금 코드는 두개 다 같은 상황으로 보고 토큰 재발급받음.
      // if (data.message === "Invalid token") {
      //   logout();
      // } else if (data.message === "TokenExpired") {
      //   try {
      //     const tokenRefreshResult: AxiosResponse = await apiManager.post(
      //       "/token"
      //     );
      //     if (tokenRefreshResult.status === 200) {
      //       const { accessToken } = tokenRefreshResult.data.data;
      //       localStorage.setItem("accessToken", accessToken);
      //       originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      //       return apiManager(originalRequest);
      //     } else {
      //       logout();
      //     }
      //   } catch (e) {
      //     console.log(e);
      //     logout();
      //   }
      // }
    }

    return Promise.reject(response);
  }
);

export default apiManager;
