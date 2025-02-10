import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}
const Button: React.FC<ButtonProps> = ({ children, className }) => {
  return <button className={cn("", className)}>{children}</button>;
};

export default Button;
