const { pedidosModel } = require('../models/pedidosModel');
const { Op, where } = require('sequelize');
const { parseDateBd } = require('../utils/dateUtils');

const pedidoController = {
    listarPedidos: async (req, res)=>{

        try {
            let {ID_Pedido, statusPedido} = req.query;

            let conditions = {};

            if (ID_Pedido) {

                conditions.ID_Pedido = ID_Pedido;

            }

            if (statusPedido) {

                conditions.statusPedido = ID_Pedido;

            }
            let pedido = await pedidosModel.findAll({
                where:{
                    [Op.or]: [
                        {ID_Pedido: { [Op.eq]: conditions.ID_Pedido} },
                        {statusPedido: { [Op.substring]: conditions.statusPedido} },
                    ]
                }
            });
            pedidos = pedidos.map(pedido =>{
                pedido.dataPedido = parseDateBd(pedido.dataPedido);
                return pedido;
            });

            return res.status(200).json(pedido);

        } catch (error) {
            
            console.error("Erro ao listar pedido:", error);
            return res.status(500).json({message: "Erro ao listar pedido"});
        }
    },

    cadastrarPedido: async (req, res)=>{

        try {
            
         const {statusPedido, dataPedido, valorPedido} = req.body;

         if(!statusPedido || !dataPedido || !valorPedido){
            return res.status(400).json({message:"campo obrigatorios não preenchidos"})
         }

         if(pedido){
            return res.status(409).json ({message: "pedido já cadastrado"})
         }

         await pedidosModel.create({statusPedido, dataPedido, valorPedido});

        } catch (error) {

            console.error("Erro ao cadastrar pedido", error);
            return res.status(500).json({message: "Erro ao cadastrar pedido"});
            
        }
    },
    atualizarPedido: async (req, res)=>{

        try {
            
            const {ID_Pedido} = req.params
            const {statusPedido, dataPedido, valorPedido} = req.body;

            let pedido = await pedidosModel.findByPk(ID_Pedido);

            if(!statusPedido || dataPedido || valorPedido){
                return req.status(404).json({message:"Pedido não encontrado"})
            }

            let dadosAtualizados = {statusPedido, dataPedido, valorPedido};

            await pedidosModel.update(dadosAtualizados, {where: {ID_Pedido}});

            pedido = await pedidosModel.findByPk(ID_Pedido);

            return res.status(200).json({message: "Pedido atualizado com sucesso:", Pedido: pedido});

        } catch (error) {

            console.error("Erro ao atualizar pedido", error);
            return res.status(200).json({message: "Erro ao atualizar pedido"});
            
        }
    },

deletarPedido: async (req, res)=>{

    try {
    const {ID_Pedido} = req.params
    
    let pedido = await pedidosModel.findByPk(ID_Pedido);
    
    if(!pedido) {
     return res.status(404).json({message: "Pedido não encontrado"});
    }
    
    let statusPedido = pedido.statusPedido;

    let result = await estoqueModel.destroy({where: {ID_Pedido}});

    if (result>0) {
        return res.status(200).json ({message: `${statusPedido} Pedido foi excluido com sucesso!`});
    }else{
        return res.status(404).json({message: "Erro ao excluir pedido!"});
    }
    }
    
catch (error) {
    
   console.error("Erro ao excluir pedido:", error);
   return res.status(500).json({message: "Erro ao excluir pedido"});

}}   

}

module.exports = { pedidoController };