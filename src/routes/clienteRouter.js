const express = require('express');
const router = express.Router(); // ele instancia o router, um objeto do express para definir rotas.

//const {clienteController} = require("../controllers/clienteController");
const {clienteController} = require('./../controllers/clienteController'); // importar o controlador de clientes


router.get ("/",clienteController.listarCliente); // esta rota ira listar os clientes.

router.post ("/", clienteController.cadastrarCliente); // esta rota ira cadastrar um cliente.

router.put ("/:ID_Cliente", clienteController.atualizarCliente); // esta rota ira atualizar um cliente.

router.delete ("/:ID_Cliente", clienteController.deletarCliente
); // esta rota ira deletar um cliente.





module.exports = {clienteRouter: router}; // exporta o objeto router como rotasClientes, que pode ser usado em outros arquivos para definir as rotas de clientes.




