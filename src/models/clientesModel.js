const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const clientesModel = sequelize.define('Clientes', {
    id_clientes:{
        type:DataTypes.INTEGER, // Tipo do campo como inteiro
        autoIncrement: true, // Ira gerar um valor de id começando do 1
        primaryKey: true // Define como chave primaria.
    },
    cpf:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    nomeCliente:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
<<<<<<< HEAD
        unique  // unique significar que será unico, nao tem como cadastrar um igual.
=======
        unique:true  // unique significar que será unico, nao tem como cadastrar um igual ("isso deve ser obvio eu acho kkk ;) ")
>>>>>>> c377f55d4a4236f13df2022d7d7bd9f9f7170ec0
    },
    telefone:{
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    tableName: 'Clientes', // evitar de criar outras tabelas no banco de dados
    timestamps: false
});



module.exports = { clientesModel }



