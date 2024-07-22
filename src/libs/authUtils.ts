"use client";

import { getAccessToken } from "@/api/apiManager";
import { redirect } from "next/navigation";

export function verifyAccessToken() {
  const accessToken = getAccessToken();
  if (accessToken) {
    return accessToken;
  } else {
    redirect("/");
  }
}
