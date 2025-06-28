const express = require('express');
const router = express.Router();

router.get ("/", estoqueControler.listarEstoque);
router.post("/",estoqueControler.cadastrarEstoque);
router.put("/:ID_Filial", filialControler.atualizarEstoque);
router.delete("/:ID_Filial", filialControler.deletarEstoque);

module.export = { rotasEstoque: router };