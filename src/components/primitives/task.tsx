import { useState } from "preact/hooks";
import { IconTrash, IconChevronDown } from "@tabler/icons-preact";
import Button from "./button";
import { TodoItem } from "./todo-list";

export interface TaskProps {
  item: TodoItem;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

export default function Task({ item, onToggle, onRemove }: TaskProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li key={item.id} className="rounded-xl border-2 border-primary/40 p-3 transition-all">
      {/* Main Task Row */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          className="h-4 w-4 rounded accent-secondary disabled:cursor-not-allowed disabled:opacity-50"
          checked={item.completed}
          onChange={() => onToggle(item.id)}
          aria-label={`Mark ${item.text} as ${item.completed ? "incomplete" : "complete"}`}
        />

        <span
          className={`flex-1 text-sm cursor-pointer select-none ${item.completed ? "text-muted-foreground line-through" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {item.text}
        </span>

        {/* Accordion Toggle Button */}
        <button
          type="button"
          className={`p-1 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle details"
        >
          <IconChevronDown size={18} />
        </button>

        <Button
          type="button"
          size="small"
          variant="destructive"
          aria-label={`Delete ${item.text}`}
          onClick={() => onRemove(item.id)}
        >
          <IconTrash size={15} stroke={2} />
        </Button>
      </div>

      {/* Accordion Content (Placeholders) */}
      {isOpen && (
        <div className="mt-3 pt-3 border-t border-primary/20 flex flex-col gap-2 text-xs text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">Description:</span>{" "}
            {item.description || "Placeholder description goes here. Add notes, links, or extra details about this task."}
          </p>
          <div className="flex items-center gap-4">
            <span>
              <span className="font-semibold text-foreground">Time:</span> 10:00 AM - 11:30 AM
            </span>
            <span>
              <span className="font-semibold text-foreground">Priority:</span> Medium
            </span>
          </div>
        </div>
      )}
    </li>
  );
}
