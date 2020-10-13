const CityModel = require('../models/City');

const CityService = {};

CityService.createNewCity = async ({ name }) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "City was stored correctly."
        }
    }

    if (!name) {
        serviceResponse = {
            success: false,
            content: {
                error: "City name field was empty."
            }
        }

        return serviceResponse;
    }

    try{
        const newCity = new CityModel({name});
        const savedCity = await newCity.save();
        if (!savedCity) {
            serviceResponse = {
                success: false,
                content: {
                    error: "City could not be registrated."
                }
            }
            
            return serviceResponse;
        }

        return serviceResponse;

    } catch(error) {
        throw new Error("Internal Server Error.")
    }
}

module.exports = CityService;