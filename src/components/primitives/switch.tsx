import { ComponentChildren, JSX } from "preact";

interface SwitchProps extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  children?: ComponentChildren;
  className?: string;
}

export default function Switch({
  checked,
  onCheckedChange,
  className = "",
  children,
  ...props
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-muted p-0.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${checked ? "bg-primary" : ""} ${className}`}
      onClick={() => onCheckedChange(!checked)}
      {...props}
    >
      <span
        className={`pointer-events-none block size-5 rounded-full bg-background shadow-sm transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`}
      />
      {children}
    </button>
  );
}
