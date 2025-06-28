const express = require('express');
const router = express.Router();// Instancia o objeto do express usado para definir rotas

//Rotas de Filiais
router.get ("/", async (req, res)=>{
    res.send("Coleta Produto");
});// Rota responsável por listar os produtos  no sistema

router.post ("/", async (req, res)=>{
    res.send("Cadastrar Produto");
});// Rota responsável por criar os produtos do sistema

router.put ("/", async (req, res)=>{
    res.send("Atualizar Produto");
});// Rota responsável por atualizar os produtos do sistema

router.delete ("/", async (req, res)=>{
    res.send("Deletar Produto");
});// Rota responsável por deletar os produtos do sistema

module.exports = { rotasProdutos: router };// Exporta o objeto de rotas para ser usado em outros arquivos
