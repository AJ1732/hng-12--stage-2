import { cn } from "@/lib/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  label,
  className,
  required,
  ...props
}) => {
  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block w-fit leading-6 text-gray-100"
        >
          {label} {required && <span className="text-red-300">*</span>}
        </label>
      )}

      <input
        type={type}
        name={name}
        required={required}
        className={cn(
          "border-accent-200 placeholder:text-neutral-light min-h-12 w-full rounded-xl border bg-transparent p-3",
          className,
        )}
        {...props}
      />
    </>
  );
};

export default InputField;
