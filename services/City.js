const City = require('../models/City');
const CityModel = require('../models/City');

const CityService = {};

CityService.createNewCity = async ({ name }) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "Se ha registrado una nueva Ciudad"
        }
    }

    if (!name) {
        serviceResponse = {
            success: false,
            content: {
                error: "El campo de nombre no fue proporcionado"
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
                    error: "La Ciudad no pudo ser registrada"
                }
            }
            
            return serviceResponse;
        }

        return serviceResponse;

    } catch(error) {
        throw new Error("Internal Server Error.")
    }
}

CityService.findAll = async (page, limit) => {
    let serviceResponse = {
        success: true,
        content: {}
    }

    try {
        const Cities = await CityModel.find({}, undefined, {
            skip: page * limit,
            limit: limit,
            sort: [{
                updatedAt: -1
            }]
        }).exec();

        serviceResponse.content = {
            Cities,
            count: Cities.length,
            page,
            limit
        };

        return serviceResponse;
    } catch(error) {
        throw new error("Internal Server Error.");
    }
}

CityService.deleteOneById = async (_id) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "Se ha borrado la Ciudad"
        }
    }

    if(!_id){
        serviceResponse = {
            success: false,
            content: {
                error: "El campo _id no fue proporcionado"
            }
        }

        return serviceResponse;
    }

    try {
        const cityDeleted = await CityModel.findByIdAndDelete(_id).exec();
        if(!cityDeleted){
            serviceResponse = {
                success: false,
                content: {
                    error: "No se pudo borrar la Ciudad"
                }
            }

            return serviceResponse;
        }

        return serviceResponse
    } catch(error) {
        throw new Error("Internal Server Error.");
    }
}

module.exports = CityService;