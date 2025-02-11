"use client"
import { useState } from "react";
import { cn } from "@/lib/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  errorMessage?: string; // For validation errors
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  label,
  className,
  required,
  errorMessage,
  ...props
}) => {
  const [isTouched, setIsTouched] = useState(false);

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block w-fit leading-6 text-gray-100"
        >
          {label} {required && <span className="text-red-300">*</span>}
        </label>
      )}

      <input
        id={name}
        type={type}
        name={name}
        required={required}
        className={cn(
          "border-accent-200 placeholder:text-neutral-light focus-visible:ring-primary-300 min-h-12 w-full rounded-xl border bg-transparent p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          isTouched && errorMessage ? "border-red-500" : "",
          className,
        )}
        onBlur={() => setIsTouched(true)}
        {...props}
      />

      {isTouched && errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
