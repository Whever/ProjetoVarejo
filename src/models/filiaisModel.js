const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const filiaisModel = sequelize.define('filiais', {
   ID_Filial: {
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
      type: DataTypes.STRING,
      allowNull: false,
   },
}, {
   tableName: 'filiais',
   timestamps: false
});


  //const teste = async () => {
     //const dados = await filiaisModel.findAll();

   //  console.log(dados);
 //}

 //teste();
module.exports = { filiaisModel };

