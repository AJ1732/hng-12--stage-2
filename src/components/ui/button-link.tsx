"use client";

import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { ArrowRightSVG } from "@/svgs";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center font-nanum justify-center gap-2 whitespace-nowrap rounded-xl text-base leading-none ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary-300 hover:bg-primary-300/80",
        outline:
          "border border-primary-300 text-primary-300 bg-transparent hover:bg-primary-300/10",
        link: "bg-white text-accent-800 hover:bg-white/90",
      },
      size: {
        default: "h-[3.25rem] px-6 py-4",
        sm: "h-11 px-4 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  link?: string;
  asChild?: boolean;
}

const ButtonLink = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, link, asChild = false, children, ...props },
    ref,
  ) => {
    if (link) {
      return (
        <Link
          href={link}
          className={cn(buttonVariants({ variant: "link", size, className }))}
        >
          <span className="-mb-0.5">{children}</span>{" "}
          <ArrowRightSVG className="min-w-5" />
        </Link>
      );
    }

    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="-mb-0.5">{children}</span>
      </Comp>
    );
  },
);
ButtonLink.displayName = "Button";

export { ButtonLink, buttonVariants };
