const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');


const { produtosModel } = require('./produtosModel');
const { clientesModel } = require('./clientesmodel');
const { filialModel } = require('./filiaisModel');
const { pedidosModel } = require('./pedidosModel');

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

clientesModel.hasMany(pedidosModel,  {foreignkey: 'ID_Pedido', as: 'Cliente'})
filialModel.belongsTo(produtoPedidoModel,  {foreignkey: 'ID_Estoque', as: 'Produtos' })
produtosModel.hasMany(produtoPedidoModel,{foreignkey: 'ID_Pedido',  as: 'Estoques'})
pedidosModel.hasMany()

//entidade fraca pertence a entidade forte/ analogia: (""filho pertence ao pai, e o filho nao existiria sem o seu pai")

// petencer se refere ao que estamos programando produto pertencer a cliente produtoPedido *tem produto.