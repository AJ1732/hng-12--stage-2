import { cn } from "@/lib/utils";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  className,
  label,
  name,
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

      <textarea
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:ring-primary-300 border-accent-200 flex min-h-[80px] w-full rounded-xl border bg-transparent p-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        required={required}
        {...props}
      />
    </div>
  );
};

export default Textarea;
