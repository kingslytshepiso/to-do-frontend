/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";
import { decodeJwt } from "jose";
// import AuthTokenPayload from "@/modules/auth/dto/auth-token-payload";

// const secretKey = process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET;
// const encodedKey = new TextEncoder().encode(secretKey);

export async function decrypt(token: string | undefined = "") {
  try {
    // const isExpired = await isTokenExpired();
    // if (isExpired) return null;
    const decoded = decodeJwt(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp) {
      const valid = decoded.exp > currentTime;
      if (valid) return decoded;
    }
    // const { payload } = await jwtVerify<AuthTokenPayload>(token, encodedKey, {
    //   algorithms: ["HS256"],
    // });
    return null;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
