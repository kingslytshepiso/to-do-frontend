import { ComponentProps, forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

type TInput = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  wrapperClasses?: ComponentProps<"div">["className"];
  error?: FieldError;
};

const TextBox = forwardRef<HTMLInputElement, TInput>(
  ({ label, wrapperClasses, className, error, ...props }, ref) => {
    return (
      <div className={`m-2 flex flex-col ${wrapperClasses}`}>
        {label && (
          <label htmlFor={props.id} className="mb-1 text-sm font-medium">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`rounded-md bg-[var(--input-primary-surface)] p-2 focus:ring-2 focus:ring-[var(--input-primary-surface)] focus-within:outline-0 ${className} ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-[var(--input-primary-surface)]"
          }`}
          {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    );
  }
);

TextBox.displayName = "TextBox";
export { TextBox };
