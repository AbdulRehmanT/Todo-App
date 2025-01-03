import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function TodoInput() {
  return (
    <div className="flex space-x-2">
      <Input placeholder="Enter a task" />
      <Button>Add Task</Button>
    </div>
  );
}
