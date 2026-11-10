import { useState } from "preact/hooks";
import TodoList, { TodoItem } from "../components/primitives/todo-list";

export default function Tasks() {
  const [items, setItems] = useState<TodoItem[]>([]);

  const addTask = (text: string) => {
    setItems((current) => [...current, { id: Date.now(), text, completed: false }]);
  };

  const toggleTask = (id: number) => {
    setItems((current) =>
      current.map((item) => item.id === id ? { ...item, completed: !item.completed } : item),
    );
  };

  const removeTask = (id: number) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-xl flex-col gap-6 py-8">
      <h1 className="text-2xl">Tasks</h1>
      <TodoList items={items} onAdd={addTask} onToggle={toggleTask} onRemove={removeTask} />
    </div>
  );
}
