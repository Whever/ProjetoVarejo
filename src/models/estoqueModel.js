const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const {filiaisModel} = require('./filiaisModel');
const {produtosModel} = require('./produtosModel')

const estoqueModel = sequelize.define('estoque',{
    ID_Estoque:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dataEntragaEstoque:{
        type: DataTypes.STRING,
        allowNull: true
    },
    dataSaida:{
        type: DataTypes.STRING,
        allowNull: true
    },
    statusEstoque:{
        type: DataTypes.STRING,
        allowNull: false
    },
    ID_FilialEstoque:{
        type: DataTypes.INTEGER,
        refences:{
            model: filiaisModel,
            key: 'ID_Filial'
        },
        allowNull: false
        
    },
    ID_ProdutosEstoque:{
        type:DataTypes.INTEGER,
        refences:{
            model: produtosModel,
            key: 'ID_Produtos'
        },
        allowNull: false
    },
     tableName: 'estoque',
     timestamps: false
});

filiaisModel.hasMany(estoqueModel, {foreignKey: 'ID_FilialEstoque', as: 'filial'});
produtosModel.hasMany(estoqueModel, {foreignKey: 'ID_ProdutosEstoque', as: 'produtos'});

estoqueModel.belongsTo(filiaisModel, {foreignKey: 'ID_FilialEstoque', as: 'filial'});
estoqueModel.belongsTo(produtosModel, {foreignKey: 'ID_ProdutosEstoque', as: 'produtos'});

module.exports = {estoqueModel}
