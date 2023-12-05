"use strict";

const ValidationContract = require("../validators/validator-fluente");
const repository = require("../repositories/customer-repository");
const md5 = require("md5");
const emailservices = require("../services/email-services");
const authService = require("../services/auth-service");

/*Adicionando um nov item ao banco de dados*/
exports.post = async (req, res, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(
    req.body.name,
    3,
    "O nome deve conter pelo menos 3 caracteres"
  );
  contract.hasMinLen(
    req.body.email,
    6,
    "A senha deve conter pelo menos 10 caracteres"
  );
  contract.isEmail(req.body.email, "Email inválido");

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY),
      roules: ['user'],
    });

    emailservices.send(
      req.body.email,
      "Bem vindo ao Node Store",
      global.EMAIL_TMPL.replace("{0}", req.body.name)
    );
    res.status(201).send({ message: "Cliente cadastrado com sucesso" });
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar sua requisição" });
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const customer = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY),
    });

    if (!customer) {
      res.status(404).send({
        message: "Usuário ou senha inválidos",
      });
      return;
    }
    const token = authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
      roules: customer.roules,
    });

    res.status(201).send({
      token: token,
      data: { email: customer.email, name: customer.name },
    });
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar sua requisição" });
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    //Recupera token
    const token = req.ody.token || req.qury.token || req.headers["x-acces-token"];
    // Decodifica o token
    const data = await authService.decodeToken(token);

    const customer = await repository.getById(data.id);

    if (!customer) {
      res.status(404).send({
        message: "Cliente não encontrado",
      });
      return;
    }
    const tokenData = authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
      roules: customer.roules,
    });

    res.status(201).send({
      token: token,
      data: { email: customer.email, name: customer.name },
    });
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar sua requisição" });
  }
};
