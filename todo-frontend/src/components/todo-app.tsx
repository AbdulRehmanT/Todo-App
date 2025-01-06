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

  useEffect(() => {
    const getTodo = async () => {
      try {
        const result = await axios("http://localhost:4000/todos");
        const response = result.data;
        console.log(response);
        setTodos(response)
      } catch (err) {
        console.error(err);
      }
      getTodo();
    };
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
