const express = require('express');
const router = express.Router();// Instancia o objeto do express usado para definir rotas
const {produtoController} = require('./../controllers/produtoController');// Importa o controlador de produtos


//Rotas de Filiais
router.get ("/", produtoController.listarProduto);// Rota responsável por listar os produtos  no sistema

router.post ("/", produtoController.cadastrarProduto);// Rota responsável por criar os produtos do sistema

router.put ("/:ID_Produto", produtoController.AtualizarProduto);// Rota responsável por atualizar os produtos do sistema

router.delete ("/:ID_Produto", produtoController.deletarProduto);// Rota responsável por deletar os produtos do sistema

module.exports = { produtoRouter: router };// Exporta o objeto de rotas para ser usado em outros arquivos
