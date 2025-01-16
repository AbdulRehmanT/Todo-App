import express from "express";
import "dotenv/config";
import cors from "cors";

import "./database.mjs";
import { Todo } from "./models/index.js";

const app = express();
const port = process.env.PORT || 4000;

const todo = [];

app.use(express.json());
app.use(
  cors({
    origin: [process.env.BASE_URL, process.env.BASE_URL_02],
  })
);

// Get All Todo Route
app.get("/api/v1/todos", async (req, res) => {
  try {
    const todos = await Todo.find({}, { ip: 0, __v: 0, updatedAt: 0 }).sort({
      _id: -1,
    });

    const message = !todos.length ? "todos empty" : "ye lo sab todos";

    res.send({ data: todos, message: message });
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

// Add Todo Route
app.post("/api/v1/todo", async (req, res) => {
  try {
    const { todoContent } = req.body;

    if (!todoContent) {
      return res.status(400).send({ message: "Todo content is required!" });
    }

    const newTodo = new Todo({
      todoContent,
    });

    await newTodo.save();
    res.status(201).send({
      data: newTodo,
      message: "Todo Added Successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Edit Route
app.patch("/api/v1/todo/:id", async (req, res) => {
  const { id } = req.params;
  const { todoContent } = req.body;

  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { todoContent },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).send({ message: "Todo Not Found" });
    }

    res.send({
      data: todo,
      message: "Todo Updated Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Error updating todo" });
  }
});

// Delete Route
app.delete("/api/v1/todo/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).send({ message: "Todo Not Found" });
    }

    res.send({
      message: "Todo Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting todo" });
  }
})
app.use("/", (req, res) => {
  res.status(404).send("No Route Found!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
