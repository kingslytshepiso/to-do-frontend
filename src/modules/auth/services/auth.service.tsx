import api from "@/modules/shared/utils/api";
import AuthResponse from "../dto/auth-response.dto";
import { LoginInput } from "../types/login-input";

export async function me(): Promise<AuthResponse> {
  return api.post("/auth/me");
}
export async function login(data: LoginInput) {
  return api.post<AuthResponse>("/auth/signIn", data);
}
