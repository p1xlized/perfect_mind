import { ComponentChildren, JSX } from "preact";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive" | "default";
  children?: ComponentChildren;
  className?: string;
  size?: "small" | "medium" | "large";
}

export default function Button({
  className = "",
  variant = "default",
  size = "medium",
  children,
  ...props
}: ButtonProps) {
  let variantClass = "";
  let sizeClass = "";

  switch (variant) {
    case "primary":
      variantClass = "bg-primary text-primary-foreground hover:bg-primary/90";
      break;
    case "secondary":
      variantClass = "bg-secondary text-secondary-foreground hover:bg-secondary/80";
      break;
    case "destructive":
      variantClass = "bg-destructive/70 text-destructive-foreground hover:bg-destructive/90";
      break;
    default:
      variantClass = "bg-background text-foreground hover:bg-accent hover:text-accent-foreground";
  }

  switch (size) {
    case "small":
      sizeClass = "px-2.5 py-1.5 text-xs";
      break;
    case "large":
      sizeClass = "px-6 py-3 text-base";
      break;
    case "medium":
    default:
      sizeClass = "px-4 py-2 text-sm";
      break;
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
