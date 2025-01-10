import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";

interface Todo {
  id: string;
  todoContent: string;
}

interface TodoInputProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function TodoInput({setTodos}: TodoInputProps) {
  const [todoValue, setTodoValue] = useState<string>("");
  const url = process.env.NEXT_PUBLIC_BACK_BASE_URL;

  const addTodo = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!todoValue.trim()) {
        console.log("Please enter a task!");
        return null;
      }
      const response = await axios.post(`${url}/api/v1/todo`, { todo: todoValue });
      setTodos((prevTodos)=>([...prevTodos, response.data.data]))
      setTodoValue("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={addTodo}>
      <div className="flex space-x-2">
        <Input
          type="text"
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
          placeholder="Enter a task"
        />
        <Button type="submit">Add Task</Button>
      </div>
    </form>
  );
}
