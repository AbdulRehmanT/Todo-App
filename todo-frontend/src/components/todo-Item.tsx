import { Button } from "./ui/button";

interface TodoItemProps {
  todo: {
    id: string;
    todoContent: string;
  };
}

export default function TodoItem({todo}: TodoItemProps) {
  const todoItem = todo.todoContent
  return (
    <div className="flex space-x-2 mt-4 items-center justify-between">
      <span>{todoItem}</span>
      <div className="flex gap-2">
        <Button variant="outline">Edit</Button>
        <Button>Delete</Button>
      </div>
    </div>
  );
}
