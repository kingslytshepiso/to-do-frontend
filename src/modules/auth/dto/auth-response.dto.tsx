import { AuthStatus } from "../entities/auth-status.enum";
import { Role } from "../entities/role.enum";

export default interface AuthResponse {
  idToken: string;
  accessToken: string;
  refreshToken: string;
  message: string;
  userId: string;
  email: string;
  fullName: string;
  roles: Role[];
  authStatus: AuthStatus;
}
