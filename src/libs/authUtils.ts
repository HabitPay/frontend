"use client";

import { redirect } from "next/navigation";
import { getAccessToken } from "./jwt";

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
