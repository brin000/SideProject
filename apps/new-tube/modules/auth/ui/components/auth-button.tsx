"use client";

import { UserCircleIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const AuthButton = () => {
  const { user, isAuthenticated, isLoading, error } = useKindeBrowserClient();

  return (
    <>
      {isAuthenticated ? (
        <div></div>
      ) : (
        <LoginLink >
          <Button
            variant="outline"
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500  border-blue-500/20 rounded-full shadow-none [&_svg]:size-5"
          >
            <UserCircleIcon />
            Sign in
          </Button>
        </LoginLink>
      )}
    </>
  );
};

export { AuthButton };
