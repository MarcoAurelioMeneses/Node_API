"use strict";

const ValidationContract = require("../validators/validator-fluente");
const repository = require("../repositories/order-repository");
const guid = require("guid");
const authService = require("../services/auth-service");

/*Buscando intens e visualizando Titulo, Preço e Slug */
exports.get = async (req, res, next) => {
  try {
    var data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar sua requisição" });
  }
};

/*Adicionando um nov item ao banco de dados*/
exports.post = async (req, res, next) => {
  try {
    //Recupera token
    const token =
      req.ody.token || req.qury.token || req.headers["x-acces-token"];
    // Decodifica o token
    const data = await authService.decodeToken(token);

    await repository.create({
      customer: data.id,
      number: guid.raw().substring(0, 6),
      items: req.body.items,
    });
    res.status(201).send({ message: "Pedido cadastrado com sucesso" });
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar sua requisição" });
  }
};
