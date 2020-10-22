const { restart } = require('nodemon');
const CityService = require('../../services/City');
const { verifyTypeNumber } = require('../../utils/MiscUtils');

const CityController = {};

CityController.addNewCity = async(req, res) => {

    try {
        
        const NewCityWasCreated = await CityService.createNewCity(req.body);

        if(!NewCityWasCreated.success) {
            return res.status(409).json(NewCityWasCreated.content);
        }

        return res.status(200).json(NewCityWasCreated.content);
        
    } catch(error) {
        return res.status(500).json({
            error: "Internal Server Error."
        })
    }

}

CityController.findAllCities = async (req, res) => {
    const { page = 0, limit = 10 } = req.query;

    if (!verifyTypeNumber(page, limit)) {
        return res.status(400).json({
            error: "Mistype in query."
        })
    }

    try {
        
        const Cities = await CityService.findAll(parseInt(page), parseInt(limit));
        return res.status(200).json(Cities.content);

    } catch(error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

CityController.deleteCity = async (req, res) => {
    const { _id } = req.body;

    if(!_id){
        return res.status(403).json({
            error: "Missing id."
        })
    }

    try{
        const cityWasDeleted = await CityService.deleteOneById(_id);
        if(!cityWasDeleted.success){
            return res.status(409).json(cityWasDeleted.content);
        }

        return res.status(200).json(cityWasDeleted.content);
    }catch(error){
        return res.status(500).json({
            error: "Internal Server Error."
        })
    }
}

module.exports = CityController;