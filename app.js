const express = require('express');
const {rotasFiliais} = require("./src/routes/filiaisRoutes");



const app = express(); // criar uma intancia do express, armazenando tudo no "app"

const PORT = 8081; // criar a porta

app.use(express.json()); // configura o body - parser para interpretar corpo de requisiçao no formato json.

app.use("/filiais", rotasFiliais); // utilizar a rota de filiais

app.listen(PORT, ()=> {
    console.log(`servidor esta rodando na porta: ${PORT}`)
}); // é oq ira aparecer no terminal :)