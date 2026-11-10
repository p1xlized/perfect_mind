import { ComponentChildren, JSX } from "preact";
import { useEffect } from "preact/hooks";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: ComponentChildren;
  className?: string;
}

export default function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  className = "",
}: DialogProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) {
    return null;
  }

  const handleBackdropClick = (event: JSX.TargetedMouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onOpenChange(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4"
      role="presentation"
      onClick={handleBackdropClick}
    >
      <div
        className={`w-full max-w-md rounded-lg border border-border bg-card p-6 text-card-foreground shadow-lg ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "dialog-title" : undefined}
        aria-describedby={description ? "dialog-description" : undefined}
      >
        {title && <h2 id="dialog-title" className="mb-2 text-lg">{title}</h2>}
        {description && <p id="dialog-description" className="mb-4 text-sm text-muted-foreground">{description}</p>}
        {children}
      </div>
    </div>
  );
}
