"use client";

import AppIcon from "./app-icon";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import LinkButton from "./link-button";
import LogoutButton from "@/modules/auth/components/logout-button";
import { useAuth } from "@/modules/auth/hooks/auth-context";

export default function Header() {
  const { user } = useAuth();
  return (
    <header>
      <nav className="flex flex-row justify-between">
        <div className="py-2">
          <Link href="/">
            <AppIcon />
          </Link>
        </div>
        <div>
          {user?.authenticated ? (
            <LogoutButton />
          ) : (
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
