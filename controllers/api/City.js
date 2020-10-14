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
    const { page = 0, limit = 14 } = req.query;

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

module.exports = CityController;