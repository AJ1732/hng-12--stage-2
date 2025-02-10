import { cn } from "@/lib/utils";

interface InputFieldProps {
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({ className }) => {
  return (
    <div>
      <input type="text" className={cn("", className)} />
    </div>
  );
};

export default InputField;
