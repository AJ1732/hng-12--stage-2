"use client";

import { motion } from "framer-motion";
import { useMultiForm } from "@/provider/multiform";
import { cn } from "@/lib/utils";

const StepsTracker = () => {
  const { step } = useMultiForm();
  const totalSteps = 3;

  const getProgressWidth = () => {
    switch (step) {
      case 1:
        return "33%";
      case 2:
        return "66%";
      case 3:
        return "100%";
      default:
        return "0%";
    }
  };

  return (
    <header className="w-full space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-nanum text-[2rem]">Ticket Selection</h2>

        <span className="font-roboto text-base font-normal leading-[150%]">
          Step {step}/{totalSteps}
        </span>
      </div>

      <div className="relative h-1 w-full overflow-hidden rounded-[0.3125rem] bg-accent-100">
        <motion.div
          initial={{ width: "0%" }}
          animate={{
            width: getProgressWidth(),
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={cn("absolute left-0 top-0 h-full bg-primary-300")}
        />
      </div>
    </header>
  );
};

export default StepsTracker;
