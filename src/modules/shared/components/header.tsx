"use client";

import LogoutButton from "@/modules/auth/components/logout-button";
import { useAuth } from "@/modules/auth/hooks/auth-context";
import {
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLoading } from "../hooks/loading-context";
import AppIcon from "./app-icon";
import HeaderSkeleton from "./header-skeleton";
import LinkButton from "./link-button";

export default function Header() {
  const { user, loading: authLoading } = useAuth();
  const { getGlobalLoading } = useLoading();
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side to prevent hydration mismatches
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if there's any global loading activity
  const hasGlobalLoading = getGlobalLoading();

  // Show skeleton when auth is loading or there's global activity
  const showSkeleton = authLoading || hasGlobalLoading;

  // Use user authentication state for skeleton context
  // This avoids hydration mismatch since it's consistent between server and client
  const isAuthenticated = user?.authenticated;

  // Don't show skeleton on server-side to prevent hydration mismatch
  const shouldShowSkeleton = isClient && showSkeleton;

  return (
    <header>
      <nav className="flex flex-row justify-between">
        <div className="py-2">
          <Link href="/">
            <AppIcon />
          </Link>
        </div>
        <div>
          {shouldShowSkeleton ? (
            // Skeleton loading state - context-aware
            <HeaderSkeleton isAuthenticated={isAuthenticated} />
          ) : user?.authenticated ? (
            // Authenticated user state
            <LogoutButton />
          ) : (
            // Unauthenticated user state
            <div className="flex flex-row gap-2">
              <LinkButton variant="secondary" href={"/auth/login"}>
                <FontAwesomeIcon
                  className="mr-0 sm:mr-2 md:mr-2"
                  icon={faRightToBracket}
                />
                <span className="hidden md:inline sm:inline">Login</span>
              </LinkButton>
              <LinkButton variant="primary" href={"/auth/signup"}>
                <FontAwesomeIcon
                  className="mr-0 sm:mr-2 md:mr-2"
                  icon={faUserPlus}
                />
                <span className="hidden md:inline sm:inline">Sign up</span>
              </LinkButton>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
