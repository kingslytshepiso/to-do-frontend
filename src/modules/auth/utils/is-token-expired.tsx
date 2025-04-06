import { jwtDecode } from "jwt-decode";
import JwtPayload from "../entities/jwt-payload";
import { cookies } from "next/headers";

export default async function isTokenExpired() {
  try {
    const allCookies = await cookies();
    const accessToken = allCookies.get("accessToken")?.value;
    const decoded = jwtDecode<JwtPayload>(accessToken ?? "");
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Invalid token", error);
    return true;
  }
}
