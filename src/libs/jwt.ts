import { JwtPayload, jwtDecode } from "jwt-decode";

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
  return jwt.nickname;
}

export function getEmail(): string | null | undefined {
  const jwt = getDecodedJwt();
  if (jwt === null) {
    return null;
  }
  return jwt.sub;
}
