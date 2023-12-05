"use strict";
//Criar rota
const express = require("express");
const router = express.Router();

//Rota
router.get("/", (req, res, next) => {
  res.status(200).send({ title: "First Store Node API", version: "0.2.1" });
});

module.exports = router;
