const ConsultantService = require('../../services/Consultant');

const ConsultantController = {};

ConsultantController.findAll = async(req, res) => {
    try{
        const consultantResponse = await ConsultantService.findAll();
        if(!consultantResponse.success){
            return res.status(204).json(consultantResponse.content);
        }
        return res.status(200).json(consultantResponse.content);
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

ConsultantController.deleteByID = async (req, res) => {
    const { _id } = req.body;

    if (!_id) {
        return res.status(403).json({
            error: "Missing id."
        })
    }

    try{
        const consultantDeleted = await ConsultantService.deleteOneByID(_id); 
        if(!consultantDeleted.success){
            return res.status(404).json(consultantDeleted.content);
        }
        return res.status(200).json(consultantDeleted.content);
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

module.exports = ConsultantController;