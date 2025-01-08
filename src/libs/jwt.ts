import { JwtPayload, jwtDecode } from "jwt-decode";

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

function getDecodedJwt(): JwtPayload | null {
  const jwt = localStorage.getItem("accessToken");
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

export function removeJwtFromLocalStorage() {
  if (localStorage.getItem("accessToken") === null) {
    return;
  }
  localStorage.removeItem("accessToken");
}
