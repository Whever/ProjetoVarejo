const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const { filialModel } = require('./filiaisModel');
const { produtosModel } = require('./produtosModel')

const estoqueModel = sequelize.define('Estoque',{
    idEstoque:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dataEntrada:{
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

filialModel.HasMany(estoqueModel, {foreignkey:'idFilialEstoque', as: 'filiais'})
produtosModel.HasMany(estoqueModel,{foreignkey:'idProdutoEstoque',as:'produtos'})

estoqueModel.belongsToOne(filialModel, {foreignkey: 'idFilialEstoque', as: 'filiais'})
estoqueModel.belongsToOne(produtosModel,{foreignkey:'idProdutoEstoque',as:'produtos'})



module.exports = {estoqueModel}
