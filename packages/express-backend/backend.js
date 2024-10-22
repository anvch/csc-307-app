import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING)
  .catch((error) => console.log(error));
const app = express();
const port = 8000;
const { addUser, getUsers, findUserById, findUserByName, findUserByJob } = userService;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

const deleteUser = (id) => {
  users["users_list"] = users["users_list"].filter((user) => user["id"] !== id.toString());
  return "deleted";
}


app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  getUsers(name, job)
    .then(result => {res.send(result);})
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error message");
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id

  findUserById(id)
  .then(result => {res.send(result)})
  .catch((error) => {
    console.error(error);
    res.status(404).send("Resource not found.");
  })
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd)
    .then(result => {res.status(201).send(result);})
    .catch((error) => {
      console.error(error);
      res.send("Could not add user");
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  console.log(id);
  let result = deleteUser(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send();
  }
});