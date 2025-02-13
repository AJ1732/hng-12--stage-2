"use client";

import React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

interface TicketRadioButtonProps {
  label: string;
  price: string | number;
  left: number;
  value: string;
}

const TicketRadioButton: React.FC<TicketRadioButtonProps> = ({
  label,
  price,
  left,
  value,
}) => {
  return (
    <RadioGroupPrimitive.Item
      value={value}
      className={cn(
        "flex w-full max-w-[16rem] justify-between gap-2 rounded-xl border border-accent-200 p-2 pl-2.5 text-gray-100",
        "data-[state=checked]:bg-primary-400",
      )}
    >
      <div className="flex flex-col items-start">
        <h4 className="font-medium uppercase">{label}</h4>
        <p className="text-sm leading-[150%]">{left} left!</p>
      </div>

      <div className="flex h-fit w-fit min-w-[5rem] items-center justify-center rounded-lg border border-primary-200 bg-accent-100 p-2 text-xl font-semibold leading-[110%] text-gray-100">
        {typeof price === "number" && `$`}
        <span>{price}</span>
      </div>
    </RadioGroupPrimitive.Item>
  );
};

export default TicketRadioButton;
