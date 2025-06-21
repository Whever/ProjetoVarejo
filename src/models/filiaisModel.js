const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const filialModel = sequelize.define('filial',{
    ID_Filial:  {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeFilial: {
       type: DataTypes.STRING,
       allowNull: false
    },
     enderecoFilial: {
        type: DataTypes.STRING,
        allowNull: false,
     },
     cidadeFilial: {
        type:DataTypes.STRING,
        allowNull: false,
     },
},{
      tableName: 'Filial',
      timestamps: false

    });

   

module.exports = {filialModel}

