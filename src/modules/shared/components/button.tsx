import { ButtonHTMLAttributes, ComponentProps } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  wrapperClasses?: ComponentProps<"div">["className"];
};

export default function Button({
  variant = "primary",
  className = "",
  wrapperClasses,
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-md font-medium transition-all focus:ring-2";
  const variantStyles =
    variant === "primary"
      ? "bg-[var(--button-primary-background)] text-[var(--button-primary-foreground)] hover:bg-[var(--button-primary-background-accent)] focus:ring-[var(--button-primary-border)]"
      : "bg-[var(--button-secondary-background)] text-[var(--button-secondary-foreground)] hover:bg-[var(--button-secondary-background-accent)] focus:ring-[var(--button-secondary-border)]";

  return (
    <div className={`flex grow shrink m-2 ${wrapperClasses}`}>
      <button
        className={`min-w-full ${baseStyles} ${variantStyles} ${className}`}
        {...props}
      />
    </div>
  );
}
