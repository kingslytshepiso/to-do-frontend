export default interface RegisterInput {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  autoLogin?: boolean;
}
