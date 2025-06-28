const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const clientesModel = sequelize.define('Clientes', {
    ID_Cliente:{
        type:DataTypes.INTEGER, // Tipo do campo como inteiro
        autoIncrement: true, // Ira gerar um valor de id começando do 1
        primaryKey: true // Define como chave primaria.
    },
    cpfCliente:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    nomeCliente:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    emailCliente:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true  // unique significar que será unico, nao tem como cadastrar um igual ("isso deve ser obvio eu acho kkk ;) ")
    },
    telefoneCliente:{
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    tableName: 'Clientes', // evitar de criar outras tabelas no banco de dados
    timestamps: false
});


// const teste = async ()=>{
//     const dados = await clientesModel.findAll();

//     console.log(dados);
// }

// teste();

module.exports = { clientesModel };



