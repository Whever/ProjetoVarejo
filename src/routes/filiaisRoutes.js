const express = require('express');
const router = express.Router(); // Instancia o objeto do express usado para definir rotas

//Rotas de Filiais
/*
router.get("/",filialControler.listarFiliais); // Rota responsável por listar as filiais do sistema
router.post("/",filialControler.cadastrarFilial); // Rota responsável por criar as filiais do sistema
router.put("/:ID_Filial", filialControler.atualizarFilial); // Rota responsável por atualizar as filiais do sistema
router.delete("/:ID_Filial", filialControler.deletarFilial); // Rota responsável por deletar as filiais do sistema
*/

router.get("/", (req, res) => {
  res.send('Rota get de Listagem de Filiais');
});

router.post("/", (req, res) => {
  res.send('Rota post de Cadastro de Filiais');
});
router.put("/filial/:id_filial", (req, res) => {
  res.send(`Rota put de Atualização de Filial com ID: ${req.params.ID_Filial}`);
});
router.delete("/filial/:id_filial", (req, res) => {
  res.send(`Rota delete de Deleção de Filial com ID: ${req.params.ID_Filial}`);
});

module.exports = { rotasFiliais: router }; // Exporta o objeto de rotas para ser usado em outros arquivos