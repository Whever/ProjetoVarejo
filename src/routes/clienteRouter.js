const express = require('express');
const router = express.Router(); // ele instancia o router, um objeto do express para definir rotas.

//const {clienteController} = require("../controllers/clienteController");
const {clienteController} = require('../controllers/clienteController')


router.get ("/", async (req,res)=>{
    res.send("Listar Clientes");
}); // esta rota ira listar os clientes.

router.post ("/", async (req,res)=>{

    const {cpfCliente, nomeCliente, emailCliente, telefoneCliente} = req.body; // extrai os dados do corpo da requisição.
    // Aqui você pode adicionar a lógica para cadastrar o cliente no banco de dados usando o modelo
   
   console.log(`CPF: ${cpfCliente}, Nome: ${nomeCliente}, Email: ${emailCliente}, Telefone: ${telefoneCliente}`);
    
    res.send("Cadastrar Cliente");

}); // esta rota ira cadastrar um cliente.

router.put ("/:ID_Cliente", async (req,res)=>{
    
    res.send("Atualizar Cliente");

}); // esta rota ira atualizar um cliente.

router.delete ("/:ID_Cliente", async (req,res)=>{
   
    res.send("Deletar Cliente");

}); // esta rota ira deletar um cliente.





module.exports = {clienteRouter: router}; // exporta o objeto router como rotasClientes, que pode ser usado em outros arquivos para definir as rotas de clientes.




