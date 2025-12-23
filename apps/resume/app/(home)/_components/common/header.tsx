"use client";

import Link from "next/link";
import React from "react";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { ChevronDown, Loader } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { useTheme } from "next-themes";

const Header = () => {
  const { setTheme } = useTheme();
  const { user, isAuthenticated, isLoading, error } = useKindeBrowserClient();

  return (
    <div className="shadow-sm w-full sticky top-0 bg-white dark:bg-gray-900 z-[9]">
      <div className="w-full mx-auto max-w-7xl py-2 px-5 flex items-center justify-between">
        <div className="flex items-center flex-1 gap-9">
          <div>
            <Link href="/dashboard" className="font-black text-xl text-primary">
              CVbuild.ai
            </Link>
          </div>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <span className="font-normal text-black/50 dark:text-primary-foreground">
                Hi,
              </span>
              <h5 className="font-bold text-black dark:text-primary-foreground">
                {user?.given_name} {user?.family_name}
              </h5>
            </div>
          ) : null}

          <div className="flex items-center gap-4">
            {isLoading || error ? (
              <Loader className="animate-spin !size-6 text" />
            ) : (
              <>
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger role="button">
                      <div className="flex items-center gap-1">
                        <Avatar role="button">
                          <AvatarImage src={user?.picture || ""} alt="avatar" />
                          <AvatarFallback className="cursor-pointer">
                            {user?.given_name?.charAt(0)}
                            {user?.family_name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <ChevronDown size="17px" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <LogoutLink>Logout</LogoutLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
