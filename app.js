const express = require('express');

const {clienteRouter} = require('./src/routes/clienteRouter'); // importar o arquivo de rotas de cliente
const {estoqueRouter} = require('./src/routes/estoquesRoute'); // importar o arquivo de rotas de estoque
const {filiaisRouter} = require('./src/routes/filiaisRoutes'); // importar o arquivo de rotas de filiais
const {pedidosRouter} = require('./src/routes/pedidosRouter'); // importar o arquivo de rotas de pedidos
const {produtoRouter} = require('./src/routes/produtoRoute'); // importar o arquivo de rotas de produtos
const {produtoPedidoRouter} = require('./src/routes/produtoPedidoRouter'); // importar o arquivo de rotas de produtos pedidos

const app = express(); // criar uma intancia do express, armazenando tudo no "app"

const PORT = 8081; // criar a porta
const {estoqueRoute} = require('./src/controllers/estoqueController')
app.use(express.json()); // configura o body - parser para interpretar corpo de requisiçao no formato json.

app.use("/Clientes", clienteRouter); // utilizar a rota de clientes

app.use("/estoque", estoqueRouter); // utilizar a rota de estoques

app.use("/filial", filiaisRouter); // utilizar a rota de filiais

app.use("/pedido",pedidosRouter)

app.use("/produto", produtoRouter); // utilizar a rota de produtos

app.use("/produtoPedido", produtoPedidoRouter); // utilizar a rota de produtos pedidos

app.listen(PORT, ()=> {
    console.log(`servidor esta rodando na porta: ${PORT}`)
}); // é oq ira aparecer no terminal :)