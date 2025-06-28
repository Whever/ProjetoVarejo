const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const { filiaisModel } = require('./filiaisModel');
const { produtosModel } = require('./produtosModel');

const estoqueModel = sequelize.define('Estoques', {
    ID_Estoque: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dataEntradaEstoque: {
        type: DataTypes.STRING,
        allowNull: true
    },
    saidaEstoque: {
        type: DataTypes.STRING,
        allowNull: true
    },
    statusEstoque: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ID_FilialEstoque: {
        type: DataTypes.INTEGER,
        refences: {
            model: filiaisModel,
            key: 'ID_Filial'
        },
        allowNull: false

    },
    ID_ProdutosEstoque: {
        type: DataTypes.INTEGER,
        refences: {
            model: produtosModel,
            key: 'ID_Produto'
        },
        allowNull: false
    }
}, {
    tableName: 'Estoques',
    timestamps: false
});


filiaisModel.hasMany(estoqueModel, { foreignKey: 'ID_FilialEstoque', as: 'fialialEstoque' });
produtosModel.hasMany(estoqueModel, { foreignKey: 'ID_ProdutosEstoque', as: 'produtosEstoque' });

estoqueModel.belongsTo(filiaisModel, { foreignKey: 'ID_FilialEstoque', as: 'estoqueFilial' });
estoqueModel.belongsTo(produtosModel, { foreignKey: 'ID_ProdutosEstoque', as: 'estoqueProdutos' });

 //const teste = async () => {
     //const dados = await estoqueModel.findAll();

   //  console.log(dados);
 //}

 //teste();

module.exports = {estoqueModel};
