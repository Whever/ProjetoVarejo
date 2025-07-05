const { Op } = require('sequelize');
const { clientesModel } = require('../models/clientesModel');



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
                    ]
                }
            });

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

module.exports = { clienteController };