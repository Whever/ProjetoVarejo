const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');


const { produtosModel } = require('./produtosModel');
const { clientesModel } = require('./clientesmodel');
const { filialModel } = require('./filiaisModel');
const { pedidosModel } = require('./pedidosModel');
const { estoqueModel } = require('./estoqueModel');

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
    ID_Produto:{
        type: DataTypes.INTEGER,
        references:{
            model: produtosModel,
            key: 'idproduto'
        },
        allowNull: false
    },
    ID_Pedido:{
        type: DataTypes.INTEGER,
        references:{
            model: pedidosModel,
            key: 'idpedidos'
        },
        allowNull: false
    },
},{
    tableName: 'Turma',
    timestamps: false   

});
produtosModel.hasOne(produtoPedidoModel, {foreignkey: 'ID_Produtos',  as: 'Produtos'})
pedidosModel.hasOne(produtoPedidoModel, {foreignKey: 'ID_Pedido', as: 'Pedido'})

produtoPedidoModel.belongsToMany(produtosModel, {foreignKey: 'ID_Produtos', as: 'Produtos'})
produtoPedidoModel.belongsToMany(pedidosModel, {foreignKey: 'ID_Pedido', as: 'Pedidos'})

//entidade fraca pertence a entidade forte/ analogia: (""filho pertence ao pai, e o filho nao existiria sem o seu pai")

// petencer se refere ao que estamos programando produto pertencer a cliente produtoPedido *tem produto.