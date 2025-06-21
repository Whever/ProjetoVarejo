const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const { filialModel } = require('./filiaisModel');
const { produtosModel } = require('./produtosModel')

const estoqueModel = sequelize.define('Estoque',{
    ID_Estoque:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dataEntregaEstoque:{
        type: DataTypes.STRING,
        allowNull: true
    },
    saidaEstoque:{
        type: DataTypes.STRING,
        allowNull: true
    },
    statusEstoque:{
        type: DataTypes.STRING,
        allowNull: false
    },
    idFilialEstoque:{
        type: DataTypes.INTEGER,
        refences:{
            model: filiaisModel,
            key: 'idFiliais'
        },
        allowNull: false
        
    },
    idProdutoEstoque:{
        type:DataTypes.INTEGER,
        refences:{
            model: produtosModel,
            key: 'idProduto'
        },
        allowNull: false
    },
     tableName: 'Estoque',
     timestamps: false
});

filialModel.HasMany(estoqueModel, {foreignkey:'idFilialEstoque', as: 'filial'})
produtosModel.HasMany(estoqueModel,{foreignkey:'idProdutoEstoque',as:'produtos'})

estoqueModel.belongsdToOne(filialModel, {foreignkey: 'idFilialEstoque', as: 'filial'})
estoqueModel.belongsToOne(produtosModel,{foreignkey:'idProdutoEstoque',as:'produtos'})



module.exports = {estoqueModel}
