import { cn } from "@/lib/utils";

interface FieldsetProps {
  className?: string;
  children: React.ReactNode;
}

const Fieldset: React.FC<FieldsetProps> = ({ className, children }) => {
  return <fieldset className={cn("space-y-8", className)}>{children}</fieldset>;
};

export default Fieldset;
