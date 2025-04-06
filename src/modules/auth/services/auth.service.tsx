import api from "@/modules/shared/utils/api";
import AuthResponse from "../dto/auth-response.dto";
import { LoginInput } from "../types/login-input";
import Oauth2LoginInput from "../types/oauth2-login-input";

export async function me(): Promise<AuthResponse> {
  return api.post("/auth/me");
}
export async function login(data: LoginInput) {
  return api.post<AuthResponse>("/auth/signIn", data);
}
export async function oauth2Login(data: Oauth2LoginInput) {
  return api.post<AuthResponse>("/auth/oauth2/callback", data);
}
export async function refresh() {
  return api.post("/auth/refresh-token");
}
export async function logout() {
  return api.post("/auth/logout");
}
