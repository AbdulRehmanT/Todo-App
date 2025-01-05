import { useEffect, useState } from "react";
import TodoInput from "./todo-input";
import TodoItem from "./todo-Item";

export default function TodoApp() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/")
      .then((res) => res.json)
      .then((data) => {
        console.log(data);
        setTodo(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <TodoInput />
      {todo.map((item) => {
        <TodoItem key={item.id} />;
      })}
    </div>
  );
}
