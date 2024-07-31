import exp from "constants";
import { JwtPayload, jwtDecode } from "jwt-decode";

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("accessToken");
  }
  return null;
};

function getDecodedJwt(): JwtPayload | null {
  const jwt = sessionStorage.getItem("accessToken");
  if (jwt === null) {
    return null;
  }
  return jwtDecode(jwt);
}

export function getNickname(): string | null | undefined {
  const jwt = getDecodedJwt();
  if (jwt === null) {
    return null;
  }
  // @ts-ignore
  return jwt.nickname;
}

export function getEmail(): string | null | undefined {
  const jwt = getDecodedJwt();
  if (jwt === null) {
    return null;
  }
  return jwt.sub;
}

export function removeJwtFromSessionStorage() {
  if (sessionStorage.getItem("accessToken") === null) {
    return;
  }
  sessionStorage.removeItem("accessToken");
}
