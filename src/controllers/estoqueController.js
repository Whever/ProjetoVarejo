const { estoqueModel } = require('./../models/estoqueModel');
const { filiaisModel } = require('./../models/filiaisModel');
const { produtoModel, produtosModel } = require('./../models/produtosModel');
const { Op, where } = require('sequelize');
const { parseData } = require('./../utils/dateUtils'); // Importa a função parseData para formatar datas
const { clientesModel } = require('../models/clientesModel');

const estoqueController = {
    listarEstoque: async (req, res) => {

        try {
            const { ID_Estoque } = req.query;
            let conditions = {};

            if (ID_Estoque) {
                conditions.ID_Estoque = ID_Estoque;
            }

            let estoques = await estoqueModel.findAll({
                where: {
                    [Op.or]: [
                        { ID_Estoque: { [Op.eq]: conditions.ID_Estoque } }
                    ]
                }
            });

            estoques = estoques.map(estoque => {
                return estoque;
            });

            return res.status(200).json(estoques);

        } catch (error) {
            console.error("Erro ao listar no estoque:", error);
            return res.status(500).json({ message: "Erro ao listar no estoque" });
        }
    },
    cadastrarEstoque: async (req, res) => {

        try {
            const { dataEntradaEstoque, saidaEstoque, statusEstoque, ID_FilialEstoque, ID_ProdutosEstoque } = req.body;

            let filialTabela = filiaisModel.findAll({ ID_FilialEstoque });

            let produtoTabela = produtosModel.findAll({ ID_ProdutosEstoque });

            if (!dataEntradaEstoque || !saidaEstoque || !statusEstoque || !ID_FilialEstoque || !ID_ProdutosEstoque) {
                return res.status(400).json({ message: "campos obrigatorios não preenchidos" })
            }

            if (!produtoTabela) {
                return res.status(409).json({ message: "Produto nao localizado" });
            }

            if (!filialTabela) {
                return res.status(409).json({ message: "filial nao localizado" });
            }

            await estoqueModel.create({
                dataEntradaEstoque: dataEntradaEstoque,
                saidaEstoque: saidaEstoque,
                statusEstoque: statusEstoque,
                ID_FilialEstoque: ID_FilialEstoque,
                ID_ProdutosEstoque: ID_ProdutosEstoque
            });


            return res.status(201).json({ message: "cadastrado no estoque com sucesso!" })
        } catch (error) {

            console.error("Erro ao cadastrar no estoque:", error);
            return res.status(500).json({ message: "Erro ao cadastrar no estoque!" })

        }
    },
    atualizarEstoque: async (req, res) => {

        try {

            const { ID_Estoque } = req.params
            const { dataEntradaEstoque, saidaEstoque, statusEstoque, ID_FilialEstoque, ID_ProdutosEstoque } = req.body;

            
            if (dataEntradaEstoque || saidaEstoque || statusEstoque || ID_FilialEstoque || ID_ProdutosEstoque) {
                return res.status(404).json({ message: "não encontrado no estoque!" });
            }

            let estoque = await estoqueModel.findByPk(ID_Estoque);

            let estoqueExiste = await estoqueModel.findByPk(ID_Estoque);
            if (!estoqueExiste) {
                return res.status(404).json({ message: "estoque não encontrado!" });
            }


            let dadosAtualizados = {
                dataEntradaEstoque: dataEntradaEstoque,
                saidaEstoque: saidaEstoque,
                statusEstoque: statusEstoque,
                ID_FilialEstoque: ID_FilialEstoque,
                ID_ProdutosEstoque: ID_ProdutosEstoque
            };

            await estoqueModel.update(dadosAtualizados, {
                where: {
                    ID_Estoque
                }
            });

            estoque = await estoqueModel.findByPk(ID_Estoque);


        } catch (error) {
            console.error("Erro ao atualizar no estoque:", error);
            return res.status(500).json({ message: "Erro ao atualizar no estoque" });
        }
    },

    deletarEstoque: async (req, res) => {

        try {

            const ID_Estoque = req.params.ID_Estoque
            const estoque = await estoqueModel.findByPk(ID_Estoque)

            if (!estoque) {
                return res.status(404).json({ message: "não encontrado no estoque!" });
            }

            let result = await estoqueModel.destroy({
                where: { ID_Estoque }
            });

            if (result > 0) {
                return res.status(200).json({ message: `foi excluido no estoque com sucesso!` });
            } else {
                return res.status(404).json({ message: "Erro ao excluir no estoque!" });
            }
        }

        catch (error) {
            console.error("Erro ao excluir no estoque:", error);
            return res.status(500).json({ message: "Erro ao excluir no estoque" });
        }
    }
}

module.exports = { estoqueController };
//