const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const produtoPedidoModel = sequelize.define('ProdutoPedidos', {
    ID_produtoPedido:{
        type: DataTypes.INTEGER, // tipo do campo como inteiro
        autoIncrement: true, // o valor sera gerado automaticamente
        primaryKey: true // define este campo como a chave primaria
    },
    quatidadePedido:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
})