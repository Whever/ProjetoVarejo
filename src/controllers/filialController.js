const {Op,where} = require('sequelize');
const { filiaisModel} = require('./../models/filiaisModel'); // Importa o modelo de filiais do Sequelize

const filialController = {

listarFilial: async (req, res) => {
    try {
        const { ID_Filial } = req.query;
        let conditions = {};

        console.log("ID_Filial:", ID_Filial);
        

        if(ID_Filial) {
            conditions.ID_Filial = ID_Filial;
        }

        let filiais = await filiaisModel.findAll({
            where:{
                [Op.or]:[
                    {ID_Filial:{[Op.eq]: conditions.ID_Filial}},
                    {nomeFilial:{[Op.substring]: conditions.nomeFilial}},
                ]
            }
        });

        filiais = filiais.map(filial => {
            return filial;
        });
        return res.status(200).json({ filiais });

    } catch (error) {
        console.error("Erro ao listar filiais:", error);
        return res.status(500).json({ message: "Erro ao listar filiais" });
    }
},

cadastrarFilial: async(req,res) => {
    try {

        const {nomeFilial,enderecoFilial,cidadeFilial} = req.body; // Extrai os dados do corpo da requisição
        
        if(!nomeFilial || !enderecoFilial || !cidadeFilial) {
            return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
        }

        let filialExiste = await filiaisModel.findOne({
            where:{
                [Op.or]:[
                    {nomeFilial:nomeFilial},
                    {enderecoFilial:enderecoFilial},
                ]
            }
        })

        if(filialExiste) {
            return res.status(409).json({ message: "Filial já cadastrada!" });
        }
        await filiaisModel.create({
            nomeFilial: nomeFilial,
            enderecoFilial: enderecoFilial,
            cidadeFilial: cidadeFilial
        });
        return res.status(201).json({ message: "Filial cadastrada com sucesso!" });

    } catch (error) {
        console.error("Erro ao cadastrar filial:", error);
        return res.status(500).json({ message: "Erro ao cadastrar filial" });
    }

},

atualizarFilial: async (req,res) => {

    try {
        const {ID_Filial} = req.params;
        const {nomeFilial,enderecoFilial,cidadeFilial} = req.body;

        if(!nomeFilial || !enderecoFilial || !cidadeFilial){
            return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
        }

        let filial = await filiaisModel.findByPk(ID_Filial)
        
        if(!filial) {
            return res.status(404).json({ message: "Filial não encontrada" });
        }

        let filialAtualizados = {
            nomeFilial: nomeFilial,
            enderecoFilial: enderecoFilial,
            cidadeFilial: cidadeFilial
        };

     

        await filial.update(filialAtualizados)
        filial = await filiaisModel.findByPk(ID_Filial);
        return res.status(200).json({ message: "Filial atualizada com sucesso!", filial });
        
    } catch (error) {  
        console.error("Erro ao atualizar filial:", error);
        return res.status(500).json({ message: "Erro ao atualizar filial" });
    }


},



deletarFilial: async (req,res) => {
    try {
        const {ID_Filial} = req.params; // Extrai o ID da filial a ser deletada dos parâmetros da rota
        const filial = await filiaisModel.findByPk(ID_Filial);

        if(!filial) {
            return res.status(404).json({ message: "Filial não encontrada" });
        }

        let nomeFilial = filial.nomeFilial;
        let result = await filiaisModel.destroy({
            where:{
                ID_Filial
            }
        });

        if(result>0){
            return res.status(200).json({message: `Filial ${nomeFilial} deletada com sucesso!`});
        }else{
            return res.status(404).json({ message: "Não foi possivel deletar" });
        }

    } catch (error) {
        console.error("Erro ao deletar filial:", error);
        return res.status(500).json({ message: "Erro ao deletar filial" });
    }
}

}

module.exports = {filialController}; // Exporta o objeto filialController, que contém as funções para manipulação de filiais.
