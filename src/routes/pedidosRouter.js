const express = require('express');
const router = express.Router();// Instancia o objeto do express usado para definir rotas

//Rotas de Filiais
router.get ("/", async (req, res)=>{
    res.send("Coleta Pedidos");
});// Rota responsável por listar os pedidos no sistema

router.post ("/", async (req, res)=>{
    res.send("Cadastrar Pedidos");
});// Rota responsável por criar as filiais do sistema

router.put ("/", async (req, res)=>{
    res.send("Atualizar Pedidos");
});// Rota responsável por atualizar as filiais do sistema

router.delete ("/", async (req, res)=>{
    res.send("Deletar Pedidos");
});// Rota responsável por deletar as filiais do sistema

module.exports = { rotasPedidos: router };// Exporta o objeto de rotas para ser usado em outros arquivos