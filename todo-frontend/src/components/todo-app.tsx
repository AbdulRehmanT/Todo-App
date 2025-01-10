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
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const url = process.env.NEXT_PUBLIC_BACK_BASE_URL;
  if (!url) {
    setError("Having Issue in Backend.");
    return;
  }

  const getTodo = async () => {
    try {
      const result = await axios(`${url}/api/v1/todos`);
      const response = result.data;
      console.log(response);
      setTodos(response.data);
      setMessage(response.message);
    } catch (err) {
      setError(error);
    }
  };
  useEffect(() => {
    getTodo();
  }, [url]);

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <TodoInput setTodos={setTodos} />
      {todos.length > 0 ? (
        todos.map((item) => <TodoItem key={item.id} todo={item} setTodos={setTodos}  />)
      ) : (
        <p className="text-sm text-gray-700 mt-4">{message}</p>
      )}
    </div>
  );
}
