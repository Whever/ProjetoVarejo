const { Op } = require('sequelize');
const { clientesModel } = require('./../models/clientesModel');

const clienteController = {

    listarCliente: async (req, res) => {
        try {
            const { ID_Cliente } = req.query;
            let conditions = {};

            if (ID_Cliente) {
                conditions.ID_Cliente = ID_Cliente;
            }
            let clientes = await clientesModel.findAll({
                where: {
                    [Op.or]: [
                        { ID_Cliente: { [Op.eq]: conditions.ID_Cliente } }
                    ]
                }
            });

            clientes = clientes.map(cliente => {
                return cliente
            });
            return res.status(200).json({ clientes });
        } catch (error) {
            console.error("Erro ao listar clientes:", error);
            return res.status(500).json({ message: "Erro ao listar clientes" });

        }
        //funcionando
    },



    ///
    cadastrarCliente: async (req, res) => {
        const { cpfCliente, nomeCliente, emailCliente, telefoneCliente } = req.body;

        try {
            if (!nomeCliente || !cpfCliente || !telefoneCliente || !emailCliente) {
                return res.status(400).json({ Message: "Campos obrigatórios não preenchidos" });
            }

            
            let clienteExiste = await clientesModel.findOne({
                where: {
                    [Op.or]: [
                        { cpfCliente: cpfCliente },
                        { emailCliente: emailCliente },
                    ]
                }
            });
            if (clienteExiste) {
                return res.status(409).json({ message: "Cliente já cadastrado!" })
            }

            await clientesModel.create({
                cpfCliente: cpfCliente,
                nomeCliente: nomeCliente,
                emailCliente: emailCliente,
                telefoneCliente: telefoneCliente
            });
            return res.status(201).json({ message: "Cliente cadastrado com sucesso!" })
        } catch (error) {

            console.error("Erro ao cadastrar Cliente:", error);
            return res.status(500).json({ message: "Erro ao cadastrar Cliente!" });
        }

    },
    ///funcionando




    ////
    atualizarCliente: async (req, res) => {
        try {
            const { ID_Cliente } = req.params;
            const { cpfCliente, nomeCliente, emailCliente, telefoneCliente } = req.body;

            if (!cpfCliente || !nomeCliente || !telefoneCliente || !emailCliente) {
                return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
            }

            let cliente = await clientesModel.findByPk(ID_Cliente);

            if (!cliente) {
                return res.status(404).json({ message: "Cliente não encontrado!" });
            }

            let dadosAtualizados = {
                cpfCliente: cpfCliente,
                nomeCliente: nomeCliente,
                emailCliente: emailCliente,
                telefoneCliente: telefoneCliente
            };

            await cliente.update(dadosAtualizados);
            cliente = await clientesModel.findByPk(ID_Cliente);
            return res.status(200).json({ message: "Cliente atualizado com sucesso!" });

        } catch (error) {
            console.error("Erro ao atualizar cliente:", error);
            return res.status(500).json({ message: "Erro ao atualizar cliente" });
        }
    },


    ////
    deletarCliente: async (req, res) => {
        const ID_Cliente = req.params.ID_Cliente;
        const cliente = await clientesModel.findByPk(ID_Cliente);
        try {
            if (!cliente) {
                return res.status(404).json({ message: "Cliente não encontrado!" });
            }
            let nomeCliente = cliente.nomeCliente;
            let result = await clientesModel.destroy({
                where: { ID_Cliente }
            });
            if (result > 0) {
                return res.status(200).json({ message: `Cliente ${nomeCliente} excluído com sucesso!` });
            } else {
                return res.status(404).json({ message: "Cliente não encontrado!" });
            }

        } catch (error) {
            console.error("Erro ao excluir cliente!", error);
            return res.status(500).json({ message: "Erro ao excluir cliente" });
        }
    }
};

module.exports = { clienteController };