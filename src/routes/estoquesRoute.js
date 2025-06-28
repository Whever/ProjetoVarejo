const express = require('express');
const { estoqueController } = require('../controller/estoqueContoller');
const router = express.Router();// Instancia o objeto do express usado para definir rotas

//Rotas de Filiais
router.get("/", async (req, res)=>{
    res.send("Coleta Estoque");
});// Rota responsável por listar o estoque no sistema

router.post ("/", async (req, res)=>{
    const {ID_Estoque, dataEntradaEstoque, saidaEstoque, ID_FilialEstoque,ID_ProdutosEstoques } = req.body; // Extrai os dados do corpo da requisição
    console.log(`ID Estoque: ${ID_Estoque}, Data Entrada: ${dataEntradaEstoque}, Saída: ${saidaEstoque}, ID Filial: ${ID_FilialEstoque}, ID Produtos: ${ID_ProdutosEstoques}`); // Exibe os dados no console
    res.send("Cadastrar Estoque");
});// Rota responsável por criar as filiais do sistema

router.put ("/:ID_Estoque", async (req, res)=>{
    res.send("Atualizar Estoque");
});// Rota responsável por atualizar as filiais do sistema

router.delete ("/:ID_Estoque", async (req, res)=>{
    res.send("Deletar Estoque");
});// Rota responsável por deletar as filiais do sistema

module.exports = { estoqueRouter: router };// Exporta o objeto de rotas para ser usado em outros arquivos
