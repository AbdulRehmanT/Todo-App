import express from "express";
import "dotenv/config";
import cors from "cors";
import "./database.js";
import { Todo } from "./models/index.js";

const app = express();
const port = process.env.PORT || 4000;

const todo = [];

app.use(express.json());
app.use(
  cors({
    origin: [process.env.BASE_URL_02, process.env.BASE_URL],
  })
);

// Get All Todo Route
app.get("/api/v1/todos", async (req, res) => {
  try {
    const todos = await Todo.find({}, { ip: 0, __v: 0, updatedAt: 0 }).sort({
      _id: -1,
    });

    const message = !todos.length ? "Nothing Available" : "All Todos";

    res.send({ data: todos, message: message });
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

// Add Todo Route
app.post("/api/v1/todo", async (req, res) => {
  try {
    if (!req.body.todo) {
      return res.status(400).send({ message: "Todo content is required" });
    }
    const obj = {
      todoContent: req.body.todo,
    };

    const result = await Todo.create(obj);

    res.send({ data: result, message: "Todo Added Successfully!" });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Edit Route
app.patch("/api/v1/todo/:id", async (req, res) => {
  const id = req.params.id;

  if (!req.body.todoContent) {
    return res
      .status(400)
      .send({ message: "Todo content is required to update" });
  }

  try {
    const result = await Todo.findByIdAndUpdate(id, {
      todoContent: req.body.todoContent,
    },{new: true});

    result
      ? res.status(201).send({
          data: result,
          message: "Todo Update Successfully",
        })
      : res.status(200).send({ data: null, message: "Todo Not Found" });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Delete Route
app.delete("/api/v1/todo/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Todo.findByIdAndDelete(id)

    if (result) {
      res.status(200).send({
        message: "Todo Deleted Successfully", 
      });
    } else {
      res.status(404).send({ data: null, message: "Todo Not Found" });  
    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.use("/", (req, res) => {
  res.status(404).send("No Route Found!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
