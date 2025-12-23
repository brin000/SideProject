import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default async function LandingPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <div className="flex gap-2">
        <LoginLink>Sign in</LoginLink>
        <RegisterLink>Sign up</RegisterLink>
      </div>
    </div>
  );
}
