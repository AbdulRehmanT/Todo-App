import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

const todo = [];

app.use(express.json());
app.use(cors({
  origin: [
    "https://todo-app-frontend-orcin.vercel.app",
    "http://localhost:4000"
  ],
}));


// Get All Todo Route
app.get("/api/v1/todos", (req, res) => {
  const message = !todo.length ? "Nothing Available" : "All Todos";
  res.send({ data: todo, message: message });
});

// Add Todo Route
app.post("/api/v1/todo", (req, res) => {
  try {
    const obj = {
      id: String(new Date().getTime()),
      todoContent: req.body.todo,
    };

    if (!obj.todoContent) {
      return res.status(404).send({ message: "Todo content is required!" });
    }

    todo.push(obj);
    res.send({ data: obj, message: "Todo Added Successfully!" });
  } catch (err) {
    console.error(err);
    res.status(404).send({ message: "Internal Server Error" });
  }
});

// Edit Route
app.patch("/api/v1/todo/:id", (req, res) => {
  const id = req.params.id;
  let isFound = false;
  for (let i = 0; i < todo.length; i++) {
    if (todo[i].id === id) {
      todo[i].todoContent = req.body.todoContent;
      isFound = true;
      break;
    }
  }

  if (isFound) {
    res.status(201).send({
      data: {
        id: id,
        todoContent: req.body.todoContent,
      },
      message: "Todo Update Successfully",
    });
  } else {
    res.status(200).send({ data: null, message: "Todo Not Found" });
  }
});

// Delete Route
app.delete("/api/v1/todo/:id", (req, res) => {
  const id = req.params.id;

  let isFound = false;

  for (let i = 0; i < todo.length; i++) {
    if (todo[i].id === id) {
      todo.splice(i, 1);
      isFound = true;
      break;
    }
  }

  if (isFound) {
    res.status(201).send({
      message: "Todo Deleted Successfully",
    });
  } else {
    res.status(200).send({ data: null, message: "Todo Not Found" });
  }
});

app.use("/", (req, res) => {
  res.status(404).send("No Route Found!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
