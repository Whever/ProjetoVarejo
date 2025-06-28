const Sequelize = require('sequelize');

const MSSQL_HOST = `localhost` // servidor local
const MSSQL_USER = `sa` // usuario do server db
const MSSQL_PASSWORD = `123456789`// senha de acesso db
const MSSQL_DB = `varejoSumare` //nome banco de dados
const MSSQL_PORT = `1433` //acesso de porta servidor sql server
const MSSQL_DIALECT = `mssql` // definição dialeto qual banco de dados sera utilizado

const sequelize = new Sequelize(MSSQL_DB,MSSQL_USER,MSSQL_PASSWORD,{
    dialect: MSSQL_DIALECT,
    host: MSSQL_HOST,
    port: MSSQL_PORT
})

/*
 async function testConnection() {
     try {
         await sequelize.authenticate();
         console.log(`conexao estabelecida com sucesso`);
        
     } catch (error) {
         console.log(`Nao foi possivel conectar com db motivo ${error}`);
    
     }
 }

testConnection();*/
module.exports = {sequelize} 