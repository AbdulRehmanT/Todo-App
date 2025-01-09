import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";

export default function TodoInput() {
  const [todoValue,setTodoValue] = useState('')
  const url = process.env.NEXT_PUBLIC_BACK_BASE_URL;

  const addTodo = async (e) => {
    try {
      e.preventDefault();
      if(!todoValue.trim()){
        console.log('Please enter a task!')
        return
      }

      await axios.post(`${url}api/v1/todo`);
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
