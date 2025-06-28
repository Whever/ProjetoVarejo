const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');


const { produtosModel } = require('./produtosModel');
const { pedidosModel } = require('./pedidosModel');

const produtoPedidoModel = sequelize.define('ProdutoPedidos', {
    ID_produtosPedido: {
        type: DataTypes.INTEGER, // tipo do campo como inteiro
        autoIncrement: true, // o valor sera gerado automaticamente
        primaryKey: true // define este campo como a chave primaria
    },
    quantidadePedido: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ID_produto: {
        type: DataTypes.INTEGER,
        references: {
            model: produtosModel,
            key: 'ID_produto'
        },
        allowNull: false
    },
    ID_Pedido: {
        type: DataTypes.INTEGER,
        references: {
            model: pedidosModel,
            key: 'ID_Pedido'
        },
        allowNull: false
    },
}, {
    tableName: 'ProdutoPedidos',
    timestamps: false
});


produtosModel.belongsToMany(pedidosModel, { through: produtoPedidoModel, foreignKey: 'ID_produto', as: 'produtosPedidos' })
pedidosModel.belongsToMany(produtosModel, { through: produtoPedidoModel, foreignKey: 'ID_Pedido', as: 'pedidosProdutos' })

 //const teste = async () => {
   //  const dados = await produtoPedidoModel.findAll();

     //console.log(dados);
 //}

 //teste();

//entidade fraca pertence a entidade forte/ analogia: (""filho pertence ao pai, e o filho nao existiria sem o seu pai")

// petencer se refere ao que estamos programando produto pertencer a cliente produtoPedido *tem produto.

module.exports = {produtoPedidoModel};