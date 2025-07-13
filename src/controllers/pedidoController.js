const { Op, where } = require('sequelize');
const { pedidosModel } = require('./../models/pedidosModel');
const { clientesModel } = require('./../models/clientesModel');
const { Where } = require('sequelize/lib/utils');

const pedidoController = {

    listarPedido: async (req, res) => {
        try {
            const { ID_Pedido } = req.query;
            let conditions = {};

            console.log(" ----- ID_Pedido:", ID_Pedido);
            

            if (ID_Pedido) {
                conditions.ID_Pedido = ID_Pedido;
            }

            let pedidos = await pedidosModel.findAll({
                where: {
                    [Op.or]: [
                        { ID_Pedido: { [Op.eq]: conditions.ID_Pedido } }
                    ]
                }
            })

            pedidos = pedidos.map(pedido => {
                return pedido;
            });

            return res.status(200).json({ pedidos });

        } catch (error) {
            console.error("Erro ao listar pedidos:", error);
            return res.status(500).json({ message: "Erro ao listar pedidos" });
        }

    },

    cadastrarPedido: async (req, res) => {
        try {
            const { DataPedido, StatusPedido, ValorPedido, ID_clienteProduto } = req.body;
            console.log(ID_clienteProduto);
            
            
            if (!DataPedido || !StatusPedido || !ValorPedido || !ID_clienteProduto) {
                return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
            }
            
            const clienteExist = clientesModel.findByPk(ID_clienteProduto);

            if(!clienteExist){
                return res.status(400).json({ message: "Cliente nao existe" });
            }

            let produtoExiste = await pedidosModel.findOne({
                where: {
                    [Op.and]: [
                        { DataPedido: DataPedido },
                        { ID_clienteProduto: ID_clienteProduto },
                    ]
                }
            });

            if (produtoExiste) {
                return res.status(409).json({ message: "Pedido já cadastrado!" });
            }


            await pedidosModel.create({
                DataPedido: DataPedido,
                StatusPedido: StatusPedido,
                ValorPedido: ValorPedido,
                ID_clienteProduto: ID_clienteProduto,
            });
            res.status(201).json({ message: "Pedido cadastrado com sucesso!" });

        } catch (error) {
            console.error("Erro ao cadastrar pedido:", error);
            return res.status(500).json({ message: "Erro ao cadastrar pedido" });
        }
    },

    atualizarPedido: async (req, res) => {

        try {
            const { ID_Pedido } = req.params;
            const { DataPedido, StatusPedido, ValorPedido, ID_clienteProduto } = req.body

            if (!DataPedido || !StatusPedido || !ValorPedido || !ID_clienteProduto) {
                return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
            }

            let pedido = await pedidosModel.findByPk(ID_Pedido);

            if (!pedido) {
                return res.status(404).json({ message: "Pedido não encontrado" });
            }

            let dadosAtualizados = {
                DataPedido: DataPedido,
                StatusPedido: StatusPedido,
                ValorPedido: ValorPedido,
                ID_clienteProduto: ID_clienteProduto
            }

            await pedido.update(dadosAtualizados);
            pedido = await pedidosModel.findByPk(ID_Pedido);
            return res.status(200).json({ message: "Pedido atualizado com sucesso!", pedido });
        } catch (error) {
            console.error("Erro ao atualizar pedido:", error);
            return res.status(500).json({ message: "Erro ao atualizar pedido" });
        }
    },

    deletarPedido: async (req, res) => {
        try {
            const { ID_Pedido } = req.params;

            const pedido = await pedidosModel.findByPk(ID_Pedido);

            if (!pedido) {
                return res.status(404).json({ message: "Pedido não encontrado" });
            }

            let result = await pedidosModel.destroy({
                where: { ID_Pedido }
            });

            if (result > 0) {

                return res.status(200).json({ message: "Pedido deletado com sucesso!" });

            } else {

                return res.status(404).json({ message: "Erro ao deletar o pedido" });
            }

        } catch (error) {
            console.error("Erro ao deletar pedido:", error);
            return res.status(500).json({ message: "Erro ao deletar pedido" });
        }
    }

}

module.exports = { pedidoController };