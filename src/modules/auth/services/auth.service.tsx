import api from "@/utils/api";
import AuthResponse from "../dto/auth-response.dto";

type LoginRequestInputs = {
  username: string;
  password: string;
};

export async function me(): Promise<AuthResponse> {
  return api.post("/auth/me");
}
export async function login(data: LoginRequestInputs) {
  return api.post<AuthResponse>("/auth/signIn", data);
}
