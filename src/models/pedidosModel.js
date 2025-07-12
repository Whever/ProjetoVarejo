const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');
const { clientesModel } = require('./clientesModel');

const pedidosModel = sequelize.define("Pedidos",
    {
        ID_Pedido: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        DataPedido: {
            type: DataTypes.TIME,
            allowNull: false
        },
        StatusPedido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ValorPedido: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        ID_clienteProduto: {
            type: DataTypes.INTEGER,
            references: {
                model: clientesModel,
                key: 'ID_Cliente',
            },
            allowNull: false
        }
    }, {
    tablename: "Pedidos",
    timestamps: false
})

clientesModel.hasMany(pedidosModel, { foreignKey: 'ID_clienteProduto', as: 'clientesPedidos' });
pedidosModel.belongsTo(clientesModel, { foreignKey: 'ID_clienteProduto', as: 'pedidosClientes' });


 //const teste = async () => {
     //const dados = await pedidosModel.findAll();

   //  console.log(dados);
 //}

// teste();


module.exports = {pedidosModel};
