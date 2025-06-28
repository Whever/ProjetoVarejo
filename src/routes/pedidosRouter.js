const express = require('express');
const router = express.Router();

router.get ("/", pedidosControler.listarPedidos);
router.post("/", pedidosControler.cadastrarPedidos);
router.put("/:ID_Filial", pedidosControler.atualizarPedidos);
router.delete("/:ID_Filial", pedidosControler.deletarpedidos);

module.exports = { rotasPedidos: router };