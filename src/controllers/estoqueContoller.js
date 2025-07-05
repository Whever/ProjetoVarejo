const { estoqueModel } = require('../models/estoqueModel');
const { Op, where } = require('sequelize');
const {parseDataBd} = require('../utils/dateUtils')

const estoqueController = {
    listarEstoque: async (req, res)=>{

        try {
         let {ID_Estoque, statusEstoque} = req.query;

         let conditions = {};

         if (ID_Estoque) {

            conditions.ID_Estoque = ID_Estoque;

         }

         if (statusEstoque) {

            conditions.statusEstoque = ID_Estoque;

         }
          let estoque = await estoqueModel.findAll({
            where:{
                [Op.or]: [
                    {ID_Estoque: { [Op.eq]: conditions.ID_Estoque} },
                    {statusEstoque: { [Op.substring]: conditions.statusEstoque} }
                ]
            }
           });
            estoques = estoques.map(estoque =>{
            //estoque.dataEntradaEstoque = parseDateBd(estoque.dataEntradaEstoque);
            return estoque;
           });

           return res.status(200).json(estoque);

        } catch (error){
            
           console.error("Erro ao listar no estoque:", error);
           return res.status(500).json({message: "Erro ao listar no estoque"});

        }
   },
     cadastrarEstoque: async (req, res)=>{

    try {
        
     const {statusEstoque, dataEntradaEstoque, dataSaidaEstoque} = req.body;
     
     if(!statusEstoque || !dataEntradaEstoque || !dataSaidaEstoque){
return res.status(400).jason({message:"campos obrigatorios não preenchidos"})
     }

    if(estoque){
        return res.status(409).json ({message: "já cadastrado no estoque"})
    }

    await estoqueModel.create({statusEstoque, dataEntradaEstoque, dataSaidaEstoque});

    return res.status(201).json({message:"cadastrado no estoque com sucesso!"})

    } catch (error) {

        console.error("Erro ao cadastrar no estoque:", error);
        return res.status(500).json({message: "Erro ao cadastrar no estoque!"})
        
    }
},
atualizarEstoque: async (req, res)=>{

       try {
    
        const {ID_Estoque} = req.params
        const {statusEstoque, dataEntradaEstoque, dataSaidaEstoque} = req.body; 
         
        let estoque = await estoqueModel.findByPk(ID_Estoque);
    
        if(!statusEstoque || !dataEntradaEstoque || !dataSaidaEstoque){
        return res.status(404).json({message: "não encontrado no estoque!"});
        }
    
       let dadosAtualizados = {statusEstoque, dataEntradaEstoque, dataSaidaEstoque};
    
       await estoqueModel.update(dadosAtualizados, {where: {ID_Estoque}});
    
       estoque = await estoqueModel.findByPk(ID_Estoque);
    
       return res.status(200).json({message: "Atualizado no estoque com sucesso:", Estoque: estoque});
    
} catch (error) {

    console.error("Erro ao atualizar no estoque:", error);
    return res.status(500).json({message: "Erro ao atualizar no estoque"});
    
}
},


deletarEstoque: async (req, res)=>{

    try {
    const {ID_Estoque} = req.params
    
    let estoque = await estoqueModel.findByPk(ID_Estoque);
    
    if(!estoque) {
     return res.status(404).json({message: "não encontrado no estoque!"});
    }
    
    let statusEstoque = estoque.statusEstoque;

    let result = await estoqueModel.destroy({where: {ID_Estoque}});

    if (result>0) {
        return res.status(200).json ({message: `${statusEstoque} foi excluido no estoque com sucesso!`});
    }else{
        return res.status(404).json({message: "Erro ao excluir no estoque!"});
    }
    }
    
catch (error) {
    
   console.error("Erro ao excluir no estoque:", error);
   return res.status(500).json({message: "Erro ao excluir aluno"});

}}   
    

}

module.exports = { estoqueController };
