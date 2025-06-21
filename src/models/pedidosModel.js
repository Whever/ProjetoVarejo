const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');
const {filialModel} = require('./filiaisModel');
const { clientesModel } = require('./clientesmodel');

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
        idClienteProduto: {
            type: DataTypes.INTEGER,
            references:{
                model:clientesModel,
                key:'idClientes'
            },
            allowNull: false
        }
    }, {
    tablename: "Pedido",
    timestamps: false
})

clientesModel.hasOne(ID_clienteProduto,{foreignkey:'idClienteProduto',as:'Clientes'})
pedidosModel.BelongsMany(clientesModel,{foreignkey:'idClienteProduto',as:'Pedido'})


module.exports = {pedidosModel}