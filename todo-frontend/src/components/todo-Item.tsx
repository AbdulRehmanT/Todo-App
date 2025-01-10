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


const handleDelete = async (todo: Todo, setTodos: React.Dispatch<React.SetStateAction<Todo[]>>) => {
  const url = process.env.NEXT_PUBLIC_BACK_BASE_URL;
  try {

    await axios.delete(`${url}/api/v1/todo/${todo.id}`);


    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== todo.id));
  } catch (err) {
    console.error("Error deleting todo:", err);
  }
};

export default function TodoItem({ todo, setTodos }: TodoItemProps) {
  const todoItem = todo.todoContent;
  return (
    <div className="flex space-x-2 mt-4 items-center justify-between">
      <span>{todoItem}</span>
      <div className="flex gap-2">
        <Button variant="outline">Edit</Button>
        <Button onClick={() => handleDelete(todo, setTodos)}>Delete</Button> {/* Pass 'todo' and 'setTodos' */}
      </div>
    </div>
  );
}
