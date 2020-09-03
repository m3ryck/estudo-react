const express = require("express");

const server = express();

//request body = {"name":"adriano","age":23}

server.get("/users/:id", (req, res) => {
  const nome = req.query.nome; //query params = ?teste=1

  const id = req.params.id; //route params = /users/1

  return res.send({ message: `Hello ${nome}`, user: id });
});

server.listen(3000);
