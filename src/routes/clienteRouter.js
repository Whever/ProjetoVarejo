const express = require('express');
const Router = express.Router(); // ele instancia o router, um objeto do express para definir rotas.


Router.get ("/", filialController.listarClientes) // esta rota ira listar os clientes.

router.post ("/", filialController.cadastrarClientes) // esta rota é responsavel por cadastrar os clientes.

router.put ("/:ID_Filial", filialController.atualizadaClientes) // esta rota ira atualizar qualquer alteraçao em algum cliente.

router.delete("/:ID_Filial", filialController.deletarClientes) // esta rota é responsavel por deletar qualquer cliente.


