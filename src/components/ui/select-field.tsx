"use client";
import { useState } from "react";
import { ChevronDownSVG } from "@/svgs";
import { cn } from "@/lib/utils";

interface SelectFieldProps {
  label: string;
  required?: boolean;
  name: string;
  options: { label: string; value: string }[];
  className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  required,
  name,
  options,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className={cn("relative w-full", className)}>
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block w-fit text-sm font-medium text-gray-100"
        >
          {label} {required && <span className="text-red-300">*</span>}
        </label>
      )}

      {/* SELECT TRIGGER */}
      <div
        id={name}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => {
          setTimeout(() => setIsOpen(true), 100);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsOpen(!isOpen);
        }}
        tabIndex={0}
        className="focus:ring-primary-300 border-accent-200 relative flex w-full cursor-pointer items-center justify-between rounded-xl border bg-transparent p-3 text-gray-100 shadow-sm focus:ring-2"
      >
        <span>
          {selected
            ? options.find((opt) => opt.value === selected)?.label
            : "Select an option"}
        </span>
        <ChevronDownSVG className="h-4 w-4 text-gray-400 transition-transform" />
      </div>

      {/* DROPDWON MENU */}
      {isOpen && (
        <ul
          onMouseLeave={() => {
            setTimeout(() => setIsOpen(false), 150);
          }}
          className="border-accent-200 bg-accent-300 absolute left-0 z-50 mt-2 w-full overflow-hidden rounded-xl border shadow-md"
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={cn(
                "hover:bg-accent-500 flex cursor-pointer items-center justify-between p-3",
                selected === option.value && "bg-accent-500",
              )}
              onClick={() => {
                setSelected(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
              {selected === option.value && (
                <div className="bg-primary-200 h-4 w-4 rounded-full" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectField;
