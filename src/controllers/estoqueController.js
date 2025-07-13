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
            
            const idFilial = ID_FilialEstoque;
            
            const idProduto = ID_ProdutosEstoque;

            let filialCheck = await filiaisModel.findByPk(idFilial);
            if (!filialCheck) {
                return res.status(404).json({ message: "Filial não encontrada!" });
            }

            let produtoCheck = await produtosModel.findByPk(idProduto);
            if (!produtoCheck) {
                return res.status(404).json({ message: "Produto não encontrado!" });
            }

            
            console.log(`ID_Filial: ${idFilial},  ID_Produto: ${idProduto}`);
            

            if (!dataEntradaEstoque || !saidaEstoque || !statusEstoque || !ID_FilialEstoque || !ID_ProdutosEstoque) {
                return res.status(400).json({ message: "campos obrigatorios não preenchidos" })
            }

            console.log(dataEntradaEstoque, saidaEstoque, statusEstoque, ID_FilialEstoque, ID_ProdutosEstoque);

           
            await estoqueModel.create({
                dataEntradaEstoque: dataEntradaEstoque,
                saidaEstoque: saidaEstoque,
                statusEstoque: statusEstoque,
                ID_FilialEstoque: idFilial,
                ID_ProdutosEstoque: idProduto
            });
            

            return res.status(201).json({ message: "cadastrado no estoque com sucesso!" })
        } catch (error) {

            console.error("Erro ao cadastrar no estoque:", error);
            return res.status(500).json({ message: "Erro ao cadastrar no estoque!" })

        }
    },
    
    atualizarEstoque: async (req, res) => {
////
        try {

            const { ID_Estoque } = req.params

            console.log(`ID_Estoque: ${ID_Estoque}`);
            

            const { dataEntradaEstoque, saidaEstoque, statusEstoque, ID_FilialEstoque, ID_ProdutosEstoque } = req.body;

            console.log(`Dados recebidos: ${dataEntradaEstoque}, ${saidaEstoque}, ${statusEstoque}, ${ID_FilialEstoque}, ${ID_ProdutosEstoque}`);
            
            const filialCheck = await filiaisModel.findByPk(ID_FilialEstoque);
            const produtoCheck = await produtosModel.findByPk(ID_ProdutosEstoque);

            
            if (!dataEntradaEstoque || !saidaEstoque || !statusEstoque || !ID_FilialEstoque || !ID_ProdutosEstoque) {
                return res.status(404).json({ message: "não encontrado no estoque!" });
            }

            if (!filialCheck) {
                return res.status(404).json({ message: "Filial não encontrada!" });
            }   

            if (!produtoCheck) {
                return res.status(404).json({ message: "Produto não encontrado!" });    
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

            return res.status(200).json({ message: "Estoque Atualizado com sucesso" });
        } catch (error) {
            console.error("Erro ao atualizar no estoque:", error);
            return res.status(500).json({ message: "Erro ao atualizar no estoque" });
        }
    },
///
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