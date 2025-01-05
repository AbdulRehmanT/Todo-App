import { Button } from "./ui/button";

export default function TodoItem() {
  return (
    <div className="flex space-x-2 mt-4 items-center justify-between">
      <span>kaam yaha print hoga</span>
      <div className="flex gap-2">
        <Button variant="outline">Edit</Button>
        <Button>Delete</Button>
      </div>
    </div>
  );
}
