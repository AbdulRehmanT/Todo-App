import TodoApp from "@/components/todo-app";
import TodoList from "@/components/todo-app";

export default function Home() {
  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Todo App</h1>
      <TodoApp />
    </div>
  );
}
