const express = require('express');
const router = express.Router(); // Instancia o objeto do express usado para definir rotas

//Rotas de Filiais
router.get("/",filialControler.listarFiliais); // Rota responsável por listar as filiais do sistema
router.post("/",filialControler.cadastrarFilial); // Rota responsável por criar as filiais do sistema
router.put("/:ID_Filial", filialControler.atualizarFilial); // Rota responsável por atualizar as filiais do sistema
router.delete("/:ID_Filial", filialControler.deletarFilial); // Rota responsável por deletar as filiais do sistema

module.exports = { rotasFiliais: router }; // Exporta o objeto de rotas para ser usado em outros arquivos