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
        type={type}
        name={name}
        required={required}
        className={cn(
          "border-accent-200 placeholder:text-neutral-light focus-visible:ring-primary-300 min-h-12 w-full rounded-xl border bg-transparent p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  );
};

export default InputField;
