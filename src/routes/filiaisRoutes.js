const express = require('express');
const router = express.Router(); // Instancia o objeto do express usado para definir rotas
const {filialController} = require('./../controllers/filialController'); // Importa o controlador de filiais

<<<<<<< HEAD
// router.get ("/", async (req, res)=>{
//     res.send("Coleta Filial");
// }) // esta rota ira listar os filial.


router.get ("/", filialController.listarFilial);
=======
>>>>>>> controlador


router.get ("/", filialController.listarFilial) // esta rota ira listar os filial.

router.post ("/", filialController.cadastrarFilial); // esta rota é responsavel por cadastrar os filial.

router.put ("/:ID_Filial", filialController.atualizarFilial); // esta rota ira atualizar qualquer alteraçao em algum filial.

router.delete("/:ID_Filial", filialController.deletarFilial); // esta rota é responsavel por deletar qualquer filial.

module.exports = {filiaisRouter: router}; // exporta o objeto router como filiaisRouter, que pode ser usado em outros arquivos para definir as rotas de filiais.