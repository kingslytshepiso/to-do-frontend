/* eslint-disable @typescript-eslint/no-explicit-any */
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../hooks/auth-context";
import { AuthProvider } from "../entities/auth-provider.enum";

type FormSummary = {
  message: string;
  status: "error" | "success" | "info";
};
type GoogleLoginButtonProps = {
  type: "register" | "login";
  onFinish: (result: FormSummary) => void;
};
export default function GoogleAuthButton({
  type: title,
  onFinish,
}: GoogleLoginButtonProps) {
  const { federatedLogin } = useAuth();
  const handleLogin = async (credential: CredentialResponse) => {
    try {
      const response = await federatedLogin({
        idToken: credential.credential!,
        provider: AuthProvider.GOOGLE,
      });
      if (response)
        onFinish({
          message: response.message,
          status: "success",
        });
    } catch (error: any) {
      onFinish({
        message: error.message,
        status: "error",
      });
    }
  };
  return (
    <div className="m-2.5">
      <div className="my-2.5 flex justify-center">
        <span className="text-center">Or {title} with</span>
      </div>
      <div className="my-2.5">
        <GoogleLogin
          text={title == "login" ? "signin_with" : "signup_with"}
          onSuccess={handleLogin}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
  );
}
