"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Todo {
  _id: string;
  todoContent: string;
}
export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoContent, setTodoContent] = useState<string>("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const url =
    process.env.NEXT_PUBLIC_BACK_BASE_URL ||
    process.env.NEXT_PUBLIC_BACK_BASE_URL_2;
  // Fetch todos from the backend
  if (!url) {
    setError("Having Issue in Backend.");
    return;
  }
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(`${url}/api/v1/todos`);
        setTodos(res.data.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [url]);

  const handleAddTodo = async () => {
    if (!todoContent) return;
    try {
      await axios.post(`${url}/api/v1/todo`, {
        todo: todoContent,
      });
      setTodoContent("");
      // Refresh todos list
      const res = await axios.get(`${url}/api/v1/todos`);
      setTodos(res.data.data);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await axios.delete(`${url}/api/v1/todo/${id}`);
      // Refresh todos list
      const res = await axios.get(`${url}/api/v1/todos`);
      setTodos(res.data.data);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEditTodo = async (id: string) => {
    if (!editingTodo || !editingTodo.todoContent) return;
    try {
      await axios.patch(`${url}api/v1/todo/${id}`, {
        todoContent: editingTodo.todoContent,
      });
      setEditingTodo(null);
      // Refresh todos list
      const res = await axios.get(`${url}/api/v1/todos`);
      setTodos(res.data.data);
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  return (
    <div className="p-5 space-y-4">
      <div className="flex space-x-4">
        <Input
          placeholder="New Todo"
          value={todoContent}
          onChange={(e) => setTodoContent(e.target.value)}
        />
        <Button onClick={handleAddTodo}>Add Todo</Button>
      </div>

      <div>
        {todos.map((todo) => (
          <div key={todo._id} className="flex justify-between space-x-4">
            <p>{todo.todoContent}</p>
            <div className="space-x-4">
              <Button onClick={() => setEditingTodo(todo)}>Edit</Button>
              <Button
                variant="secondary"
                onClick={() => handleDeleteTodo(todo._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {editingTodo && (
        <div className="mt-4">
          <h3>Edit Todo</h3>
          <Input
            placeholder="Edit Todo"
            value={editingTodo.todoContent}
            onChange={(e) =>
              setEditingTodo({
                ...editingTodo,
                todoContent: e.target.value,
              })
            }
          />
          <Button onClick={() => handleEditTodo(editingTodo._id)}>Update</Button>
        </div>
      )}
    </div>
  );
}
