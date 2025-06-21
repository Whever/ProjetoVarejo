const { timeStamp } = require('console');
const {sequelize} = require('../config/db'); 
const {DataTypes} = require('sequelize');

const produtosModel = sequelize.define("produtos",{
    idProduto:{
        type:DataTypes.INTEGER,
        autoincrement:true,
        primarykey:true
    },
    nome:{
        type:DataTypes.STRING,
        allownull:false
    },valorProduto:{
        type:DataTypes.DECIMAL(10,2),
        allownull:false
    },quantidadeProduto:{
        type:DataTypes.INTEGER,
        allownull:false
    }
},{tabelname:"produtos",timeStamp:false})