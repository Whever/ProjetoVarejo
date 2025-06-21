const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const produtosModel = sequelize.define("Produto", {
    ID_Produto: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        primarykey: true
    },
    nome: {
        type: DataTypes.STRING,
        allownull: false
    }, valorProduto: {
        type: DataTypes.DECIMAL(10, 2),
        allownull: false
    }, quantidadeProduto: {
        type: DataTypes.INTEGER,
        allownull: false
    }
}, {
    tabelname: "Produto",
    timestamps: false
})

module.exports = {produtosModel}