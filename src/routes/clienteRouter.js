const express = require('express');
const Router = express.Router(); // ele instancia o router, um objeto do express para definir rotas.


Router.get ("/", async (req, res)=>{
    res.send("Coleta clientes");
}) // esta rota ira listar os clientes.

router.post ("/", async (req, res)=>{
    res.send("cadastrar clientes")
}); // esta rota é responsavel por cadastrar os clientes.

router.put ("/:ID_clientes", async (req, res)=>{
    res.send("atualizar clientes")
}); // esta rota ira atualizar qualquer alteraçao em algum cliente.

router.delete("/:ID_clientes", async (req, res)=>{
    res.send("deletar clientes")
}); // esta rota é responsavel por deletar qualquer cliente.


