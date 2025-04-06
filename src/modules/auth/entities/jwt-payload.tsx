export default interface JwtPayload {
  exp: number;
  iat?: number;
  sub?: string;
  iss?: string;
}
