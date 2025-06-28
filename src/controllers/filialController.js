const {filialModel} = require('./../models/filiaisModel');//modelo banco de dados
const { Op } = require("sequelize");

const filialController = {
    listarFilial: async (requestAnimationFrame,res)=>{
        try {
            let valor = "teste123"
            return res.status(200).json(valor); // retorna o array de filiais como resposta JSON com status 200.


            
        } catch (error) {
            console.error("Erro ao listar filiais", error); // loga o erro no console.
            return res.status(500).json({ message: "Erro ao listar filiais" });
        }



    }
}
module.exports = { filialController };