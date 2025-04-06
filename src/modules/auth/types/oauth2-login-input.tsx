import { AuthProvider } from "../entities/auth-provider.enum";

export default interface Oauth2LoginInput {
  idToken: string;
  provider: AuthProvider;
}
