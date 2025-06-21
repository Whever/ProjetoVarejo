const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');


const { produtosModel } = require('./produtosModel');
const { clientesModel } = require('./clientesmodel');
const { filialModel } = require('./filiaisModel');
const { pedidosModel } = require('./pedidosModel');
const { estoqueModel } = require('./estoqueModel');

const produtoPedidoModel = sequelize.define('ProdutoPedidos', {
    idProdutoPedido: {
        type: DataTypes.INTEGER, // tipo do campo como inteiro
        autoIncrement: true, // o valor sera gerado automaticamente
        primaryKey: true // define este campo como a chave primaria
    },
    type: DataTypes.INTEGER,
    quatidadePedido: {
        allowNull: false
    },
    idProduto: {
        type: DataTypes.INTEGER,
        references: {
            model: produtosModel,
            key: 'idproduto'
        },
        allowNull: false
    },
    idPedido: {
        type: DataTypes.INTEGER,
        references: {
            model: pedidosModel,
            key: 'idpedidos'
        },
        allowNull: false
    },
}, {
    tableName: 'Turma',
    timestamps: false

});
produtosModel.hasOne(produtoPedidoModel, { foreignkey: 'idProduto', as: 'produtos' })
pedidosModel.hasOne(produtoPedidoModel, { foreignKey: 'idPedido', as: 'Pedidos' })

produtoPedidoModel.belongsToMany(produtosModel, { foreignKey: 'idProduto', as: 'Produtos' })
produtoPedidoModel.belongsToMany(pedidosModel, { foreignKey: 'idPedido', as: 'Pedidos' })

//entidade fraca pertence a entidade forte/ analogia: (""filho pertence ao pai, e o filho nao existiria sem o seu pai")

// petencer se refere ao que estamos programando produto pertencer a cliente produtoPedido *tem produto.