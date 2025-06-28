const express = require('express');
const { estoqueController } = require('../controller/estoqueContoller');
const router = express.Router();// Instancia o objeto do express usado para definir rotas

//Rotas de Filiais
//router.get ("/", async (req, res)=>{
    //res.send("Coleta Estoque");
//});// Rota responsável por listar o estoque no sistema

//router.post ("/", async (req, res)=>{
   // res.send("Cadastrar Estoque");
//});// Rota responsável por criar as filiais do sistema

//router.put ("/", async (req, res)=>{
   // res.send("Atualizar Estoque");
//});// Rota responsável por atualizar as filiais do sistema

//router.delete ("/", async (req, res)=>{
   // res.send("Deletar Estoque");
//});// Rota responsável por deletar as filiais do sistema

module.exports = { rotasEstoque: router };// Exporta o objeto de rotas para ser usado em outros arquivos

router.get ("/", estoqueController.listarEstoque);

router.post("/",estoqueController.cadastrarEstoque);

router.put("/",estoqueController.atualizarEstoque);

router.delete("/", estoqueController.deletarEstoque);

module.exports ={estoqueRouter : router}