const express = require('express');

const APP = express(); // criar uma intancia do express, armazenando tudo no "app"

const PORT = 8081; // criar a porta
const {estoqueRoute} = require('./src/controller/estoqueContoller')
app.use(express.json()); // configura o body - parser para interpretar corpo de requisiçao no formato json.

app.use('/',estoqueRoute)

app.listen(PORT, ()=> {
    console.log(`servidor esta rodando na porta: ${PORT}`)
}); // é oq ira aparecer no terminal :)