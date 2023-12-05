"use strict";
//Criar rota
const express = require("express");
const router = express.Router();
const controller = require('../controllers/product-controller');
const authService = require('../services/auth-service');

/*Rotas GET */
/*Rota para buscar todos os itens */
router.get('/', controller.get);
/*Rota para buscar todos os itens pelo slug */
router.get('/:slug', controller.getBySlug);
/*Rota para buscar todos pelo ID */
router.get('/admin/:id', controller.getById);
/*Rota para buscar todos pela tag */
router.get('/tags/:tag', controller.getByTag);
/*Rota POST */
router.post('/', authService.isAdmin, controller.post);
/*Rota Delete */
router.delete('/:id',authService.isAdmin, controller.delete);
/*Rota PUT */
router.put('/:id',authService.isAdmin, controller.put);



module.exports = router;
