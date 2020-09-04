const express = require("express");

const server = express();

server.use(express.json());

//request body = {"name":"adriano","age":23}
//CRUD => CREATE, READER,UPDATE,DELETE

const users = ["Adriano", "Mari", "João"];

server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método : ${req.method}, URL:${req.url}`);

  next();

  console.timeEnd("Request");
});

const checkNameExists = (req, res, next) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ error: "param `name` not found on request body" });
  }
  return next();
};

const checkUserInArray = (req, res, next) => {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: "User does not exist" });
  }
  req.user = user;
  return next();
};

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", checkUserInArray, (req, res) => {
  const name = req.query.name; //query params = ?teste=1

  return res.json(req.user);
});

server.post("/users/", checkNameExists, (req, res) => {
  // const name = req.body.name;
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkNameExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});
server.listen(3000);
