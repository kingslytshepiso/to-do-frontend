import { JWTPayload } from "jose";

export default interface AuthTokenPayload extends JWTPayload {
  userId: string;
  email: string;
  roles: string[];
}
