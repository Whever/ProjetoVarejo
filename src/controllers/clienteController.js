const { Op } = require('sequelize');
<<<<<<< HEAD
const { clientesModel } = require('../models/clientesModel');
const { parseDateBd } = require('../utils/dateUtils')


const clienteController = {listarCliente: async (req, res)=>{

    try {
        let {ID_Cliente,nomeCliente } = req.query;

        let conditions = {};
        
        if (ID_Cliente) {
                conditions.ID_Cliente = ID_Cliente;
        }

        if (nomeCliente) {
            conditions.nomeCliente = nomeCliente;
        }

        let Cliente = await clientesModel.findAll({
            where:{
                [Op.or]:[
                    {ID_Cliente: {[Op.eq]: conditions.ID_Cliente}},
                    {nomeCliente: {[Op.substring]: conditions.nomeCliente}}
                   ] 
            }
        });
        

        clientes = clientes.map(cliente => {
              //  cliente.dataNascimentoCliente = parseDateBd(cliente.dataNascimentoCliente);
                return cliente;
            });

            return res.status(200).json(Clientes);


        } catch (error) {
             console.error("Error ao listar cliente:", error);
            return res.status(500).json({ messagem: "Erro ao de consulta-> "+error });
        }

},

cadastrarCliente: async (req, res)=> {

    try {
        
        const { nomeCliente, cpfCliente, dataNascimentoCliente, emailCliente, telefoneCliente, enderecoCliente } = req.body;
        
        if (!nomeCliente || !cpfCliente || !dataNascimentoCliente || !emailCliente) {
        return res.status(400).json({ Message: "Campos obrigatórios não preenchidos" });

        }
          let cliente = await ClienteModel.findOne({
                where: {
                    [Op.or]: [
                        { cpfCliente },
                        { emailCliente }
=======
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
>>>>>>> controlador
                    ]
                }
            });

<<<<<<< HEAD
             if (Cliente) {
                return res.status(409).json({ message: "Cliente já cadastrado!" })
            }

             await clienteModel.create({ nomeCliente, cpfCliente, dataNascimentoCliente, emailCliente, telefoneCliente, enderecoCliente });

            return res.status(201).json({ message: "Cliente cadastrado com sucesso!" })


    } catch (error) {
        
        console.error("Erro ao cadastrar Cliente:", error);
            return res.status(500).json({ message: "Erro ao cadastrar Cliente!" });
    }

},

atualizarCliente: async (req, res)=> {

try {
    
    const { ID_Cliente } = req.params;

     const { nomeCliente, cpfCliente, dataNascimentoCliente, emailCliente, telefoneCliente, enderecoCliente } = req.body;

      let cliente = await clienteModel.findByPk(ID_Cliente);

            if (!cliente) {
                return res.status(404).json({ message: "cliente não encotrado!" });
            }

            if (cpfCliente || emailCliente) {
                cliente = await clienteModel.findOne({
                    where: {
                        [Op.or]: [
                            { cpfCliente },
                            { emailCliente }
                        ]
                    }
                });

                  if (!cliente) {
                    return res.status(409).json({ message: "Email ou CPF já cadastrados!" });
                }
            }

            let dadosAtualizados = { nomeCliente, cpfCliente, dataNascimentoCliente, emailCliente, telefoneCliente, enderecoCliente };

             await clienteModel.update(dadosAtualizados, { where: { ID_Cliente } });

             cliente = await clienteModel.findByPk(ID_Cliente);

            console.log(cliente.dataNascimentoCliente);

            cliente.dataNascimentoCliente = parseDateBd(cliente.dataNascimentoCliente);

            console.log(cliente.dataNascimentoCliente);

             return res.status(200).json({ message: "cliente atualizado com sucesso:", Cliente: cliente });

 } catch (error) {
    
    console.error("Error ao atualizar cliente:", error);
            return res.status(500).json({ message: "Erro ao atualizar cliente" });

}
},

deletarCliente: async (req, res)=> {

    try {
       
        const { ID_Cliente } = req.params;

        let cliente = await clienteModel.findByPk(ID_Cliente);

        if (!cliente) {
            return  res.status(404).json({message: " cliente nao encontrado! "});
        }

        let nomeCliente = cliente.nomeCliente;

         let result = await clienteModel.destroy({ where: { ID_Cliente } });

         if (result > 0) {

                return res.status(200).json({ message: `${nomeCliente} foi excluido com sucesso!` });

            } else {
                return res.status(404).json({ message: "Erro ao Excluir cliente!" })
            }

    } catch (error) {
        console.error("Erro ao excluir cliente!", error);
            return res.status(500).json({ message: "Erro ao excluir cliente" });
    }
}};
=======
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
>>>>>>> controlador

module.exports = { clienteController };