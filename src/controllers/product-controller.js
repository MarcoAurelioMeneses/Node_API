"use strict";

const ValidationContract = require("../validators/validator-fluente");
const repository = require("../repositories/product-repository");
const azure = require("azure-storage");

/*Buscando intens e visualizando Titulo, Preço e Slug */
exports.get = async (req, res, next) => {
  try {
    var data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar sua requisição" });
  }
};

/*Buscando intens pelo Slug */
exports.getBySlug = async (req, res, next) => {
  try {
    var data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar sua requisição" });
  }
};

/*Buscando intens por seu ID */
exports.getById = async (req, res, next) => {
  try {
    var data = await repository.getById(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar sua requisição" });
  }
};

/*Buscando intens por sua tag */
exports.getByTag = async (req, res, next) => {
  try {
    var data = await repository.getByTag(req.params.tag);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar sua requisição" });
  }
};

/*Adicionando um nov item ao banco de dados*/
exports.post = async (req, res, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(
    req.body.title,
    3,
    "O titulo deve conter pelo menos 3 caracteres"
  );
  contract.hasMinLen(
    req.body.description,
    3,
    "A descrição deve conter pelo menos 10 caracteres"
  );

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    /*

    const blobSvc = azure.createBlobService(config.userImagesBlobConnectionString);

    let filename = guid.raw().toString() + '.jpg';
    let rawdata = req.body.image;
    let matches = rawdata.match();
    let type = matches[1];
    let buffer = new Buffer(matches[2], 'base64');

    await blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
      contentType: type
    }, function (error, result, response){
      if(error){
        filename = 'default-product.png';
      }
    });
    */


    await repository.create(req.body);
    res.status(201).send({ message: "Produto cadastrado com sucesso" });
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar sua requisição" });
  }
};

/*Editando item ao banco de dados*/
exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(200).send({ message: "Produto atualizado com sucesso" });
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar sua requisição" });
  }
};

/*Removendo item ao banco de dados*/
exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.body.id);
    res.status(200).send({ message: "Produto removido com sucesso" });
  } catch (e) {
    res.status(500).send({ message: "Falha ao processar sua requisição" });
  }
};
