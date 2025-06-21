const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const pedidosModel = sequelize.define("Pedido",
    {
        ID_Pedido: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        statusPedido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        valorPedido: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        idClientePedido: {
            type: DataTypes.INTEGER,
            //references()
            allowNull: false
        }
    }, {
    tablename: "Pedido",
    timestamps: false
})

module.exports = {pedidosModel}