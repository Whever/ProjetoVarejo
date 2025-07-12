const express = require('express');
const router = express.Router();

const {produtoPedidosController} = require('./../controllers/produtoPedidosController');  

router.get('/',produtoPedidosController.listar ); // esta rota ira listar os produtos pedidos.

router.post('/', produtoPedidosController.cadastro); // esta rota ira cadastrar os produtos pedidos.

router.put('/:ID_produtosPedido', produtoPedidosController.atualizar); // esta rota ira atualizar os produtos pedidos.

router.delete('/:ID_produtosPedido', produtoPedidosController.deletar); // esta rota ira deletar os produtos pedidos.

module.exports = {produtoPedidoRouter: router};