import { Button } from "./ui/button";
import axios from "axios";

interface Todo {
  id: string;
  todoContent: string;
}

interface TodoItemProps {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function TodoItem({ todo, setTodos }: TodoItemProps) {
  const url = process.env.NEXT_PUBLIC_BACK_BASE_URL;
  
  const handleDelete = async () => {
    try {
      await axios.delete(`${url}/api/v1/todo/${todo.id}`);

      setTodos((prevTodos) => prevTodos.filter((item) => item.id !== todo.id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  return (
    <div className="flex space-x-2 mt-4 items-center justify-between">
      <span>{todo.todoContent}</span>
      <div className="flex gap-2">
        <Button variant="outline">Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
}
