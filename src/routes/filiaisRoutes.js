const express = require('express');
const router = express.Router(); // Instancia o objeto do express usado para definir rotas
const {filialController} = require('./../controllers/filialController'); // Importa o controlador de filiais

// router.get ("/", async (req, res)=>{
//     res.send("Coleta Filial");
// }) // esta rota ira listar os filial.


router.get ("/", filialController.listarFilial);

router.post ("/", async (req, res)=>{
    //nomeFilial,enderecoFilial,cidadeFilial
    const {nomeFilial, enderecoFilial, cidadeFilial} = req.body; // extrai os dados do corpo da requisição.
    console.log(`Nome: ${nomeFilial}, Endereço: ${enderecoFilial}, Cidade: ${cidadeFilial}`);
    res.send("cadastrar Filial")
}); // esta rota é responsavel por cadastrar os filial.

router.put ("/:ID_Filial", async (req, res)=>{
    res.send("atualizar Filial")
}); // esta rota ira atualizar qualquer alteraçao em algum filial.

router.delete("/:ID_Filial", async (req, res)=>{
    res.send("deletar Filial")
}); // esta rota é responsavel por deletar qualquer filial.

module.exports = {filiaisRouter: router}; // exporta o objeto router como filiaisRouter, que pode ser usado em outros arquivos para definir as rotas de filiais.