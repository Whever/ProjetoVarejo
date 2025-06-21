const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const filialModel = sequelize.define('filial',{
    idFilial:  {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
       type: DataTypes.STRING,
       allowNull: false
    },
     endereco: {
        type: DataTypes.STRING,
        allowNull: false,
     },
     cidade: {
        type:DataTypes.STRING,
        allowNull: false,
     },
},{
      tableName: 'filiais',
      timestamps: false
    });

   

module.exports = {filialModel}

