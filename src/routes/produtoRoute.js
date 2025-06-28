const express = require('express');
const router = express.Router();


router.get ("/", produtoControler.listarProduto);
router.post("/", produtoControler.cadastrarProduto);
router.put("/:ID_Filial", ProdutoControler.atualizarProduto);
router.delete("/:ID_Filial", produtoControler.deletarProduto);

module.exports = { rotasProdutos: router };
