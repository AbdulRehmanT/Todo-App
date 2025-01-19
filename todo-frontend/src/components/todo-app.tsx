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
  const [todos, setTodos] = useState<Todo[]>([]); // State for todo list
  const [todoContent, setTodoContent] = useState<string>(""); // State for new todo input
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null); // State for editing todo
  const [error, setError] = useState<string | null>(null); // State for error

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${url}/api/v1/todos`);
      setTodos(res.data.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const url =
    process.env.NEXT_PUBLIC_BACK_BASE_URL_2 ||
    process.env.NEXT_PUBLIC_BACK_BASE_URL;

  useEffect(() => {
    if (!url) {
      setError("Having Issue in Backend.");
      return;
    }

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!todoContent) return;
    try {
      await axios.post(`${url}/api/v1/todo`, {
        todo: todoContent,
      });
      fetchTodos(); // Refresh todos list
      setTodoContent(""); // Clear the input after adding
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await axios.delete(`${url}/api/v1/todo/${id}`);
      fetchTodos(); // Refresh todos list
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEditTodo = async (id: string) => {
    if (!editingTodo || !editingTodo.todoContent) return;
    try {
      await axios.patch(`${url}/api/v1/todo/${id}`, {
        todoContent: editingTodo.todoContent,
      });
      setEditingTodo(null); // Clear the editing state after update
      fetchTodos(); // Refresh todos list
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTodo(null); // Reset editing state
  };

  // Submit handler for adding new todo
  const handleAddTodoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddTodo();
  };

  // Submit handler for editing todo
  const handleEditTodoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTodo?._id) {
      handleEditTodo(editingTodo._id);
    }
  };

  return (
    <div className="p-5 space-y-4">
      {/* Add Todo Section */}
      <form onSubmit={handleAddTodoSubmit} className="flex space-x-4">
        <Input
          placeholder="New Todo"
          value={todoContent}
          onChange={(e) => setTodoContent(e.target.value)}
        />
        <Button type="submit">Add Todo</Button>
      </form>

      {/* Todo List Section */}
      <div>
        {todos.map((todo) => (
          <div key={todo._id} className="flex justify-between items-center mb-4 w-full">
            {/* If we're editing this todo, display input field */}
            {editingTodo?._id === todo._id ? (
              <form onSubmit={handleEditTodoSubmit} className="flex justify-between w-full space-x-4">
                <Input
                  value={editingTodo.todoContent}
                  onChange={(e) =>
                    setEditingTodo({
                      ...editingTodo,
                      todoContent: e.target.value,
                    })
                  }
                  className="flex-1"
                />
                <div className="flex space-x-4">
                  <Button type="submit">Update</Button>
                  <Button variant="secondary" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between w-full space-x-4">
                <p className="flex-1">{todo.todoContent}</p>
                <div className="flex space-x-4">
                  <Button onClick={() => setEditingTodo(todo)}>Edit</Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleDeleteTodo(todo._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
