const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const produtosModel = sequelize.define("Produtos", {
    idProduto: {
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
    }, quantidade: {
        type: DataTypes.INTEGER,
        allownull: false
    }
}, {
    tabelname: "Produtos",
    timestamps: false
})

module.exports = {produtosModel}