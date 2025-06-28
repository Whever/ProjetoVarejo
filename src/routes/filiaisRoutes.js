const express = require('express');
const router = express.Router(); // Instancia o objeto do express usado para definir rotas

Router.get ("/", async (req, res)=>{
    res.send("Coleta Filial");
}) // esta rota ira listar os filial.

router.post ("/", async (req, res)=>{
    res.send("cadastrar Filial")
}); // esta rota é responsavel por cadastrar os filial.

router.put ("/:ID_Filial", async (req, res)=>{
    res.send("atualizar Filial")
}); // esta rota ira atualizar qualquer alteraçao em algum filial.

router.delete("/:ID_Filial", async (req, res)=>{
    res.send("deletar Filial")
}); // esta rota é responsavel por deletar qualquer filial.