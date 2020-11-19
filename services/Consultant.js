const Business = require("../models/Business");
const ConsultantModel = require("../models/Consultant");
const debug = require("debug")("log");

const ConsultantService = {};

ConsultantService.verifyCreateFields = (firstName, lastName, birthdate, degree, referencePrice, historicAveragePrice, phoneNumber, consultantType, state, city) => {
    let serviceRespone = {
        success: true,
        content: {
            message: "Fields OK"
        }
    }
    
    if(!firstName || !lastName || !degree || !birthdate || !referencePrice || !historicAveragePrice || !phoneNumber || !consultantType || !state || !city){
        serviceRespone = {
            success: false, 
            content:{
                error: "A required field was not provided"
            }
        }
    }
    
    return serviceRespone;
};

ConsultantService.findOneConsultantByUser = async (_id) => {
    let serviceRespone = {
        success: true,
        content: {}
    }

    try{
        const consultant = await ConsultantModel.findOne({ user: _id});

        if (!consultant) {
            serviceRespone = {
                success: false,
                content: {
                    error: "User not found."
                }
            }
        } else {
            serviceRespone.content = consultant;
        }

        return serviceRespone
    } catch(error) {
        throw new Error("Internal Server Error.");
    }
}

ConsultantService.createNewConsultant = async (user, firstName, lastName, photo, birthdate, degree, referencePrice, historicAveragePrice, phoneNumber, averageRating, consultantType, state, city) => {
    let serviceRespone = {
        success: true, 
        content: {
            message: "A new Consultant has been registered"
        }
    }
    
    try{
        const newConsultant = new ConsultantModel({user, firstName, lastName, photo, birthdate, degree, referencePrice, historicAveragePrice, phoneNumber, averageRating, consultantType, state, city});
        
        const savedConsultant = await newConsultant.save();
        if(!savedConsultant) {
            serviceRespone = {
                success: false, 
                content: {
                    error: "Consultant could not be registered"
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
        
        if(!consultants){
            serviceResponse = {
                success: false,
                content:{
                error: "Could not find any consultants"
                }
            }
        } else {
            serviceResponse.content = {
                consultants,
                count: consultants.length,
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
            message: "Consultant deleted!"
        }
    }
    
    try {
        const consultantDeleted = await ConsultantModel.findByIdAndDelete(_id).exec();
        if(!consultantDeleted){
            serviceRespone = {
                success: false,
                content: {
                    error: "Consultant could not be deleted"
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
                error: "No fields to change."
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
        content: {}
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
                    error: "Consultant was not updated."
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