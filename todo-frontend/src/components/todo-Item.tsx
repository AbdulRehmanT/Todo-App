import { useState } from "react";
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
  const [isEditing, setIsEditing] = useState(false);
  const [newTodoContent, setNewTodoContent] = useState(todo.todoContent);
  const url = process.env.NEXT_PUBLIC_BACK_BASE_URL;

  const handleDelete = async () => {
    try {
      await axios.delete(`${url}/api/v1/todo/${todo.id}`);

      setTodos((prevTodos) => prevTodos.filter((item) => item.id !== todo.id));
    } catch (err) {
      console.error("Error deleting todo:", err)
    }
  };

  const editTodo = async () => {
    if (newTodoContent.trim() === todo.todoContent) {
      setIsEditing(false);
      return;
    }
    try {
      await axios.patch(`${url}/api/v1/todo/${todo.id}`, {
        todoContent: newTodoContent,
      });
      setTodos((prevTodos) =>
        prevTodos.map((item) =>
          item.id === todo.id ? { ...item, todoContent: newTodoContent } : item
        )
      );

      setIsEditing(false);
    } catch (err) {
      console.error("Error deleting todo:", err)
    }
  };

  return (
    <div className="flex space-x-2 mt-4 items-center justify-between">
      {isEditing ? (
        <input
          type="text"
          value={newTodoContent}
          onChange={(e) => setNewTodoContent(e.target.value)}
          className="border p-1"
        />
      ) : (
        <span>{todo.todoContent}</span>
      )}

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Button onClick={editTodo}>Save</Button>
            <Button onClick={() => setIsEditing(false)} variant="outline">
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => setIsEditing(true)} variant="outline">
              Edit
            </Button>
            <Button onClick={handleDelete}>Delete</Button>
          </>
        )}
      </div>
    </div>
  );
}