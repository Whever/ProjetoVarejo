const { Op, where } = require('sequelize');
const { produtosModel } = require('./../models/produtosModel');

const produtoController = {

    listarProduto: async (req, res) => {
        try {
            const { ID_Produto } = req.query;
            let conditions = {};

            if (ID_Produto) {
                conditions.ID_Produto = ID_Produto;
            }

            let produtos = await produtosModel.findAll({
                where: {
                    [Op.or]: [
                        { ID_Produto: { [Op.eq]: conditions.ID_Produto } }
                    ]
                }
            });

            produtos = produtos.map(produto => {
                return produto;
            })

            return res.status(200).json({ produtos });

        } catch (error) {
            console.error("Erro ao listar produtos:", error);
            return res.status(500).json({ message: "Erro ao listar produtos" });
        }
    },
    cadastrarProduto: async (req, res) => {

        try {
            const { nomeProduto, valorProduto, quantidadeProduto } = req.body;

            if (!nomeProduto || !valorProduto || !quantidadeProduto) {
                return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
            }

            let produtoExiste = await produtosModel.findOne({
                where: {
                    [Op.or]: [
                        { nomeProduto: nomeProduto },
                    ]
                }
            });

            if (produtoExiste) {
                return res.status(409).json({ message: "Produto já cadastrado!" });
            }

            await produtosModel.create({
                nomeProduto: nomeProduto,
                valorProduto: valorProduto,
                quantidadeProduto: quantidadeProduto
            });
            res.status(201).json({ message: "Produto cadastrado com sucesso!" });


        } catch (error) {
            console.error("Erro ao cadastrar produto:", error);
            return res.status(500).json({ message: "Erro ao cadastrar produto" });
        }
    },
    AtualizarProduto: async (req, res) => {
        try {
            const { ID_Produto } = req.params;
            const { nomeProduto, valorProduto, quantidadeProduto } = req.body;

            if (!nomeProduto || !valorProduto || !quantidadeProduto) {
                return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
            }

            let produto = await produtosModel.findByPk(ID_Produto);

            if (!produto) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }

            let dadosAtualizados = {
                nomeProduto: nomeProduto,
                valorProduto: valorProduto,
                quantidadeProduto: quantidadeProduto
            };

            await produto.update(dadosAtualizados);
            produto = await produtosModel.findByPk(ID_Produto);
            return res.status(200).json({ message: "Produto atualizado com sucesso!", produto });


        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            return res.status(500).json({ message: "Erro ao atualizar produto" });

        }

    },
    deletarProduto: async (req, res) => {

        try {
            const { ID_Produto } = req.params;
            const produto = await produtosModel.findByPk(ID_Produto);

            if (!produto) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }

            let nomeProduto = produto.nomeProduto;
            let result = await produtosModel.destroy({
                where: { ID_Produto }
            });

            if (result > 0) {
                return res.status(200).json({ message: `Produto ${nomeProduto} deletado com sucesso!` });
            } else {
                return res.status(404).json({ message: "Produto não encontrado" });
            }
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
            return res.status(500).json({ message: "Erro ao deletar produto" });

        }
    }
}

module.exports = { produtoController };