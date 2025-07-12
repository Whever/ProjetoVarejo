const express = require('express');
const { estoqueController } = require('./../controllers/estoqueController'); // Importa o controlador de estoque
const router = express.Router();// Instancia o objeto do express usado para definir rotas


router.get("/",estoqueController.listarEstoque );// Rota responsável por listar o estoque no sistema

router.post ("/",estoqueController.cadastrarEstoque);// Rota responsável por criar as filiais do sistema

router.put ("/:ID_Estoque", estoqueController.atualizarEstoque);// Rota responsável por atualizar as filiais do sistema

router.delete ("/:ID_Estoque",estoqueController.deletarEstoque);// Rota responsável por deletar as filiais do sistema

module.exports = { estoqueRouter: router };// Exporta o objeto de rotas para ser usado em outros arquivos
