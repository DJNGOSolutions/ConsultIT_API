const { json } = require("express");
const Business = require("../models/Business");
const ConsultantModel = require("../models/Consultant");
const debug = require("debug")("log");

const UserService = require("./User");

const ConsultantService = {};

ConsultantService.verifyCreateFields = (firstName, lastName, birthdate, degree, referencePrice, historicAveragePrice, phoneNumber, consultantType, state, city) => {
    let serviceRespone = {
        success: true,
        content: {
            message: "Los campos son correctos"
        }
    }
    
    if(!firstName || !lastName || !degree || !birthdate || !referencePrice || !historicAveragePrice || !phoneNumber || !consultantType || !state || !city){
        serviceRespone = {
            success: false, 
            content:{
                error: "Un o más campos necesarios no fueron proporcionados"
            }
        }
    }
    
    return serviceRespone;
};

ConsultantService.findOneConsultantByUser = async (_id) => {
    let serviceRespone = {
        success: true,
        content: {
            message: "El Consultor fue encontrado"
        }
    }

    try{
        const consultant = await ConsultantModel.findOne({ user: _id});

        if (!consultant) {
            serviceRespone = {
                success: false,
                content: {
                    error: "El Consultor no se encontró"
                }
            }
        } else {
            serviceRespone.content = consultant;
        }

        return serviceRespone
    } catch(error) {
        throw new Error("Internal Server Error.");
    }
};

ConsultantService.createNewConsultant = async (user, firstName, lastName, photo, birthdate, degree, referencePrice, historicAveragePrice, phoneNumber, averageRating, consultantType, state, city) => {
    let serviceRespone = {
        success: true, 
        content: {
            message: "Se ha registrado un nuevo Consultor"
        }
    }
    
    try{
        const newConsultant = new ConsultantModel({user, firstName, lastName, photo, birthdate, degree, referencePrice, historicAveragePrice, phoneNumber, averageRating, consultantType, state, city});
        
        const savedConsultant = await newConsultant.save();
        if(!savedConsultant) {
            serviceRespone = {
                success: false, 
                content: {
                    error: "El Consultor no pudo ser registrado"
                }
            }
        }
        return serviceRespone;

    } catch (error) {
        console.log("An error occurred" + error);
        throw new Error("Internal Server Error");
    }
};

ConsultantService.findAll = async (page, limit) => {
    let serviceResponse = {
        success: true,
        content: {}
    }
    
    try{
        const consultants =  await ConsultantModel.find({}, undefined, {
            skip: page * limit,
            limit: limit,
        }).exec();
       
        const newconsultants = await Promise.all (consultants.map( async (consultant) => {
            const id = consultant.user;
            const user = await UserService.findOneByID(id);
            consultant.user = user.content.user;
            console.log("New consultant w user" + JSON.stringify(user, null, 2));
            console.log("New consultant " + consultant);
            return {
                ...consultant.toObject(), user: user.content.user
            };
        }));

        console.log("New consultants " + newconsultants);
        
        if(!consultants){
            serviceResponse = {
                success: false,
                content:{
                error: "No se encontró ningún Consultor"
                }
            }
        } else {
            serviceResponse.content = {
                newconsultants,
                count: newconsultants.length,
                page,
                limit
            }
        }
        return serviceResponse;
    }catch(error){
        console.log("An error occurred" + error);
        throw new Error("Internal Server Error");
    }
};

ConsultantService.deleteOneByID = async (_id) => {
    let serviceRespone = {
        success: true,
        content: {
            message: "Se ha borrado el Consultor"
        }
    }
    
    try {
        const consultantDeleted = await ConsultantModel.findByIdAndDelete(_id).exec();
        if(!consultantDeleted){
            serviceRespone = {
                success: false,
                content: {
                    error: "No se pudo borrar el Consultor"
                }
            }
        }
        return serviceRespone;
    }catch(error){
        console.log("An error occurred: " + error);
        throw new Error("Internal Server Error");
    }
};

ConsultantService.verifyUpdateFields = ({firstName, lastName, photo, birthdate, degree, referencePrice, phoneNumber, consultantType, state, city }) => {
    let serviceResponse = {
        success: true,
        content: {}
    }

    if(!firstName && !lastName && !photo && !birthdate && !degree && !referencePrice && !phoneNumber && !consultantType && !state && !city) {
        serviceResponse = {
            success: false,
            content: {
                error: "No se especifico ningún campo para actualizar"
            }
        }

        return serviceResponse;
    }

    if(firstName) serviceResponse.content.firstName = firstName;
    if(lastName) serviceResponse.content.lastName = lastName;
    if(photo) serviceResponse.content.photo = photo;
    if(birthdate) serviceResponse.content.birthdate = birthdate;
    if(degree) serviceResponse.content.degree = degree;
    if(referencePrice) serviceResponse.content.referencePrice = referencePrice;
    if(phoneNumber) serviceResponse.content.phoneNumber = phoneNumber;
    if(consultantType) serviceResponse.content.consultantType = consultantType;
    if(state) serviceResponse.content.state = state;
    if(city) serviceResponse.content.city = city;

    return serviceResponse;
}

ConsultantService.updateConsultantById = async (consultant, newConsultantData) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "El Consultor se ha actualizado"
        }
    }

    try {
        Object.keys(newConsultantData).forEach(key => {
            consultant[key] = newConsultantData[key];
        });
        const updatedConsultant = await consultant.save();

        if (!updatedConsultant) {
            serviceResponse = {
                success: false,
                content: {
                    error: "El Consultor no se pudo actualizar"
                }
            }
        } else {
            serviceResponse.content = updatedConsultant;
        }

        return serviceResponse;
    } catch(error) {
        throw new Error("Internal Server Error.")
    }
}

module.exports = ConsultantService;