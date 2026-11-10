import { ComponentChildren, JSX } from "preact";

interface DropdownProps {
  children?: ComponentChildren;
  value: string;
  onChange: (theme: string) => void;
  className?: string;
  "aria-label"?: string;
}

const Dropdown = ({ children, value, onChange, className = "", ...props }: DropdownProps) => {
  return (
    <select
      {...props}
      className={`themed-dropdown w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring ${className}`}
      value={value}
      onChange={(event: JSX.TargetedEvent<HTMLSelectElement>) => onChange(event.currentTarget.value)}
    >
      {children}
    </select>
  );
};

export default Dropdown;
