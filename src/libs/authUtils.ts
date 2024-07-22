"use client";

import { getAccessToken } from "@/api/apiManager";
import { redirect } from "next/navigation";

// async함수가 되어야함.
// 백엔드에 accessToken을 보내고 유효기간 검증 과정 필요
export function verifyAccessToken() {
  const accessToken = getAccessToken();
  if (accessToken) {
    return accessToken;
  } else {
    redirect("/");
  }
}
