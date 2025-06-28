const express = require('express');
const router = express.Router();// Instancia o objeto do express usado para definir rotas

//Rotas de Filiais
router.get ("/", async (req, res)=>{
    res.send("Coleta Pedidos");
});// Rota responsável por listar os pedidos no sistema

router.post ("/", async (req, res)=>{
    const{dataEntradaEstoque,saidaEstoque,statusEstoque,ID_FilialEstoque,ID_ProdutosEstoque} = req.body; // Extrai os dados do corpo da requisição
    console.log(`Data de Entrada: ${dataEntradaEstoque}, 
        Saída de Estoque: ${saidaEstoque}, Status do Estoque: ${statusEstoque} id: ${ID_FilialEstoque}, ID do Produto: ${ID_ProdutosEstoque}`); // Exibe os dados no console
    
       res.send("Cadastrar Pedidos");
});// Rota responsável por criar as filiais do sistema

router.put ("/:ID_Pedidos", async (req, res)=>{
    res.send("Atualizar Pedidos");
});// Rota responsável por atualizar as filiais do sistema

router.delete ("/:ID_Pedidos", async (req, res)=>{
    res.send("Deletar Pedidos");
});// Rota responsável por deletar as filiais do sistema

module.exports = { pedidosRouter: router };// Exporta o objeto de rotas para ser usado em outros arquivos