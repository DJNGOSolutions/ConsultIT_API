const CityModel = require('../models/City');

const CityService = {};

CityService.createNewCity = async ({ name }) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "City was stored correctly."
        }
    }
    console.log('1');
    if (!name) {
        console.log('2');
        serviceResponse = {
            success: false,
            content: {
                error: "City name field was empty."
            }
        }

        return serviceResponse;
    }

    try{
        console.log('3');
        const newCity = new CityModel({name});
        console.log('4');
        const savedCity = await newCity.save();
        console.log('5');
        if (!savedCity) {
            serviceResponse = {
                success: false,
                content: {
                    error: "City could not be registrated."
                }
            }
        }

        return serviceResponse;

    } catch(error) {
        console.log(error);
        throw new Error("Internal Server Error.")
    }
}

module.exports = CityService;