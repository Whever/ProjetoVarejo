const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const produtosModel = sequelize.define("Produtos", {
    ID_Produto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeProduto: {
        type: DataTypes.STRING,
        allownull: false
    }, 
    valorProduto: {
        type: DataTypes.DECIMAL(10, 2),
        allownull: false
    }, 
    quantidadeProduto: {
        type: DataTypes.INTEGER,
        allownull: false
    }
}, {
    tableName: "Produtos",
    timestamps: false
});

// const teste = async ()=>{
//     const dados = await produtosModel.findAll();

//     console.log(dados);
// }

// teste();

module.exports = {produtosModel}