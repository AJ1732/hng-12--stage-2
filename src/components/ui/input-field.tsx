"use client";
import { useState } from "react";
import { useFormContext } from "@/provider/form-context";
import { FormData } from "@/schema/form";
import { cn } from "@/lib/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  name = "",
  label,
  className,
  required,
  ...props
}) => {
  const { errors, validateField } = useFormContext();
  const [isTouched, setIsTouched] = useState(false);

  const fieldName = name as keyof FormData;

  const errorMessage = fieldName in errors ? errors[fieldName] : "";

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
          "min-h-12 w-full rounded-xl border border-accent-200 bg-transparent p-3 placeholder:text-neutral-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          isTouched && errorMessage && "border-red-500",
          className,
        )}
        onBlur={(e) => {
          setIsTouched(true);
          if (fieldName in errors) {
            validateField(fieldName, e.target.value);
          }
        }}
        {...props}
      />

      {isTouched && errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
