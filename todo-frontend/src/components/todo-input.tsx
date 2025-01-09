import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";

export default function TodoInput() {
  const url = process.env.NEXT_PUBLIC_BACK_BASE_URL;

  const addTodo = async (e) => {
    try {
      e.preventDefault();
      const todoValue = e.target.children[1].value;

      await axios.post(`${url}/id`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={addTodo}>
      <div className="flex space-x-2">
        <Input type="text" placeholder="Enter a task" />
        <Button>Add Task</Button>
      </div>
    </form>
  );
}
