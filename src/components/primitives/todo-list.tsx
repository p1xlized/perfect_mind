import Button from "./button";
import Input from "./input";
import Task from "./task";

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  description?: string;
}

interface TodoListProps {
  items: TodoItem[];
  onAdd: (text: string) => void;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

export default function TodoList({ items, onAdd, onToggle, onRemove }: TodoListProps) {
  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const input = form.elements.namedItem("todo") as HTMLInputElement;

    if (input.value.trim()) {
      onAdd(input.value.trim());
      form.reset();
    }
  };

  return (
    <div className="w-full space-y-4">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <Input name="todo" placeholder="Add a task..." aria-label="New task" />
        <Button type="submit" variant="primary">Add</Button>
      </form>
      <ul className="space-y-2" aria-label="Tasks">
        {items.map((item) => (
          <Task key={item.id} item={item} onToggle={onToggle} onRemove={onRemove} />
        ))}
      </ul>
      {items.length === 0 && <p className="text-sm text-muted-foreground">No tasks yet.</p>}
    </div>
  );
}
