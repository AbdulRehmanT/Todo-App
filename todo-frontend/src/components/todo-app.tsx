"use client";
import { useEffect, useState } from "react";
import TodoInput from "./todo-input";
import TodoItem from "./todo-Item";
import axios from "axios";

interface Todo {
  id: string;
  todoContent: string;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const url = process.env.NEXT_PUBLIC_BACK_BASE_URL;
  if (!url) {
    setError("Having Issue in Backend.");
    return null;
  }

  const getTodo = async () => {
    try {
      const result = await axios(`${url}/api/v1/todos`);
      const response = result.data;
      console.log(response);
      setTodos(response);
    } catch (err) {
      setError("Failed to load Todos.");
    }
  };
  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <TodoInput />
      {todos.map((item) => (
        <TodoItem key={item.id} todo={item} />
      ))}
    </div>
  );
}
