const { op } = require('sequelize');
const { produtosModel } = require('../models/produtosModel');

const produtosController = {
    listarProdutos: async (req, res) => {
        try {
            let { ID_Produtos, quantidadeProduto } = req.query;

            let conditions = {};

            if (ID_Produtos) {
                conditions.ID_Produtos = ID_Produtos;
            }

            if (quantidadeProduto) {
                conditions.quantidadeProduto = quantidadeProduto;
            }

            let produto = await produtosModel.findAll({
                where: {
                    [op.or]: [
                        { ID_Produtos: { [op.or]: conditions.ID_Produtos } },
                        { quantidadeProduto: { [op.substring]: conditions.quantidadeProduto } }
                    ]
                }
            });

            return res.status(200).json(produto);

        } catch (error) {

            console.error("Error ao listar alunos:", error);
            return res.status(500).json({ messagem: "" });

        }
    },

    cadastrarProduto: async (req, res) => {
        try {

            const { ID_Produtos, nomeProduto, valorProduto, quantidadeProduto } = req.body;

            if (!ID_Produtos || !nomeProduto) {

                return res.status(400).json({ messagem: "Campos obrigatorios não preenchidos" });

            }

            const produto = await produtosModel.findOne({ where: { ID_Produtos } });


            if (produto) {

                return res.status(201).json({ messagem: "Produto cadastrado com sucesso! " });

            }

            await produtosModel.create({ nomeProduto, valorProduto, quantidadeProduto });

            return res.status(201).json({ messagem: "produto cadastrado com sucesso! " });

        } catch (error) {

             console.error("Erro ao cadastrar produto:", error);

            return res.status(500).json({ messagem: "Erro interno no servidor" });
        


        }
    },
    atualizarProdutos: async (req, res)=> {

    }
};


