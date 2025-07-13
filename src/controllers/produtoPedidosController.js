const { Op, where } = require('sequelize');
const { produtoPedidoModel } = require('./../models/produtoPedidoModel');

const produtoPedidosController = {

    listar: async (req, res) => {
        try {
            const { ID_produtosPedido } = req.query;
            let conditions = {};

            if (ID_produtosPedido) {
                conditions.ID_produtosPedido = ID_produtosPedido;
            }



            let produtoPedidos = await produtoPedidoModel.findAll({
                where: {
                    [Op.or]: [
                        { ID_produtosPedido: { [Op.eq]: conditions.ID_produtosPedido } }
                    ]
                }
            });

            produtoPedidos = produtoPedidos.map(produtoPedido => {
                return produtoPedido;
            });

            return res.status(200).json({ produtoPedidos });

        } catch (error) {
            console.error("Erro ao listar produtos pedidos:", error);
            return res.status(500).json({ message: "Erro ao listar produtos pedidos" });
        }
    },

    cadastro: async (req, res) => {
        try {
            const { quatidadePedido, ID_produto, ID_Pedido } = req.body;

            if (!quatidadePedido || !ID_produto || !ID_Pedido) {
                return res.status(400).json({ Message: "Campos obrigatórios não preenchidos" });
            }

           

            await produtoPedidoModel.create({
                quatidadePedido: quatidadePedido,
                ID_produto: ID_produto,
                ID_Pedido: ID_Pedido
            });
            return res.status(201).json({ message: "Produto pedido cadastrado com sucesso!" });

        } catch (error) {
            console.error("Erro ao cadastrar produto pedido:", error);
            return res.status(500).json({ message: "Erro ao cadastrar produto pedido" });

        }
    },

    atualizar: async (req, res) => {
        try {
            const { ID_produtosPedido } = req.params;
            const { quatidadePedido, ID_produto, ID_Pedido } = req.body;

            if (!quatidadePedido || !ID_produto || !ID_Pedido) {
                return res.status(400).json({ Message: "Campos obrigatórios não preenchidos" });
            }

            let produtoPedido = await produtoPedidoModel.findByPk(ID_produtosPedido);

            if (!produtoPedido) {
                return res.status(404).json({ message: "Produto pedido não encontrado" });
            }

            let atualizarDados = {
                quatidadePedido: quatidadePedido,
                ID_produto: ID_produto,
                ID_Pedido: ID_Pedido
            }

            await produtoPedido.update(atualizarDados);
            return res.status(200).json({ message: "Produto pedido atualizado com sucesso!" });

        } catch (error) {
            console.error("Erro ao atualizar produto pedido:", error);
            return res.status(500).json({ message: "Erro ao atualizar produto pedido" });
        }


    },

    deletar: async (req, res) => {


        try {

            const { ID_produtosPedido } = req.params;   
            
            const produtoPedido = await produtoPedidoModel.findByPk(ID_produtosPedido);

            
            if (!produtoPedido) {
                return res.status(404).json({ message: "não existe" });
            }

            let result = await produtoPedido.destroy({
                where: { ID_produtosPedido }
            });

          
                return res.status(200).json({ message: "Produto pedido deletado com sucesso!" });
            

        } catch (error) {
            console.error("Erro ao deletar produto pedido:", error);
            return res.status(500).json({ message: "Erro ao deletar produto pedido" });
        }
    }

}

module.exports = { produtoPedidosController }; // exporta o objeto produtoPedidosController, que pode ser usado em outros arquivos para definir as rotas de produtos pedidos.