import { cn } from "@/lib/utils";
import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",

          variant === "default" &&
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]",

          variant === "outline" &&
            "border border-input bg-background hover:bg-primary/5 hover:border-primary/50 hover:text-primary",

          variant === "ghost" && "hover:bg-primary/10 hover:text-primary",

          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-9 rounded-md px-3",
          size === "icon" && "h-10 w-10",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
