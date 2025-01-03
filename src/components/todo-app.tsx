import TodoInput from "./todo-input";
import TodoItem from "./todo-Item";

export default function TodoApp(){

    return(
        <div className="container mx-auto p-2">
            <h1 className="text-2xl font-bold mb-4">Todo App</h1>
            <TodoInput />
            <TodoItem />
        </div>
    )
}


