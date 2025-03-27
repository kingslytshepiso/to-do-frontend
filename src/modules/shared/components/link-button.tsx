import Link, { LinkProps } from "next/link";
import { ComponentProps, ReactNode } from "react";

type LinkButtonProps = LinkProps & {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: ComponentProps<"div">["className"];
  wrapperClasses?: ComponentProps<"div">["className"];
};

export default function LinkButton({
  children,
  variant = "primary",
  href,
  className = "",
  wrapperClasses,
  ...props
}: LinkButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-md font-medium transition-all focus:ring-2";
  const variantStyles =
    variant === "primary"
      ? "bg-[var(--button-primary-background)] text-[var(--button-primary-foreground)] hover:bg-[var(--button-primary-background-accent)] focus:ring-[var(--button-primary-border)]"
      : "bg-[var(--button-secondary-background)] text-[var(--button-secondary-foreground)] hover:bg-[var(--button-secondary-background-accent)] focus:ring-[var(--button-secondary-border)]";

  return (
    <div className={`flex grow shrink m-2 ${wrapperClasses}`}>
      <Link
        href={href}
        className={`min-w-full ${baseStyles} ${variantStyles} ${className}`}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
}
