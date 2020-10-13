const { log } = require('debug');
const CityService = require('../../services/City');

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

module.exports = CityController;