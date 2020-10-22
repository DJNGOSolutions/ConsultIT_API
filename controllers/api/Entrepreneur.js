const EntrepreneurService = require('../../services/Entrepreneur');

const EntrepreneurController = {};

EntrepreneurController.findAll = async(req, res) => {
    try{
        const entrepreneurResponse = await EntrepreneurService.findAll();
        if(!entrepreneurResponse.success){
            return res.status(204).json(entrepreneurResponse.content);
        }
        return res.status(200).json(entrepreneurResponse.content);
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
};

EntrepreneurService.deleteByID = async (req, res) => {
    const { _id } = req.body;
    try{
        const entrepreneurDeleted = await EntrepreneurService.deleteOneByID(_id); 
        if(!entrepreneurDeleted.success){
            return res.status(404).json(entrepreneurDeleted.content);
        }
        return res.status(200).json(entrepreneurDeleted.content);
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
};

module.exports = EntrepreneurController;