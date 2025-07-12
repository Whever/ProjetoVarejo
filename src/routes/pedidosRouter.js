const express = require('express');
const router = express.Router();// Instancia o objeto do express usado para definir rotas

const { pedidoController } = require('./../controllers/pedidoController');// Importa o controlador de pedidos
//Rotas de Filiais

router.get ("/", pedidoController.listarPedido );// Rota responsável por listar os pedidos no sistema

router.post ("/",pedidoController.cadastrarPedido);// Rota responsável por criar as filiais do sistema

router.put ("/:ID_Pedidos",pedidoController.atualizarPedido);// Rota responsável por atualizar as filiais do sistema

router.delete ("/:ID_Pedidos", pedidoController.deletarPedido);// Rota responsável por deletar as filiais do sistema

module.exports = { pedidosRouter: router };// Exporta o objeto de rotas para ser usado em outros arquivos