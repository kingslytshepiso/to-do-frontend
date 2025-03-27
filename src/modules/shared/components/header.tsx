"use client";

import AppIcon from "./app-icon";
import { useAuth } from "@/modules/auth/hooks/auth-context";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LinkButton from "./link-button";
import { useEffect } from "react";

export default function Header() {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    console.log("loaded");
  }, []);
  return (
    <header className="bg-white">
      <nav>
        <Link href="/">
          <AppIcon />
        </Link>
        {isAuthenticated ? (
          <LinkButton href={"/logout"}>
            <FontAwesomeIcon icon="sign-out-alt" />
            Logout
          </LinkButton>
        ) : (
          <Link href={"/login"}>Login</Link>
        )}
      </nav>
    </header>
  );
}
