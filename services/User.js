const UserModel = require('../models/User');

const ConsultantService = require('./Consultant');
const EntrepreneurService = require('./Entrepreneur');

const emailRegex = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$");

const UserService = {};

//Sing up service
UserService.verifyRegistrationFields = ({ username, email, password, type,  firstName, lastName, birthdate, degree, phoneNumber, postalAddress, state, city, referencePrice, historicAveragePrice, consultantType}) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "Los campos son correctos"
        }
    }
    
    if(!username || !email || !password || !type){
        serviceResponse = {
            success: false,
            content: {
                error: "Un o más campos necesarios para crear un Usuario no fueron proporcionados"
            }
        }

        return serviceResponse;
    }

    if(!emailRegex.test(email)){
        serviceResponse = {
            success: false,
            content: {
                message: "Formato incorrecto para el campo email"
            }
        }

        return serviceResponse;
    }
    
    switch (type) {
        case "consultant":
            const ConsultantValidation = ConsultantService.verifyCreateFields(firstName, lastName, birthdate, degree, referencePrice, historicAveragePrice, phoneNumber, consultantType, state, city);
            
            if (!ConsultantValidation.success){
                serviceResponse = {
                    success: false,
                    content: {
                        error: "Un o más campos necesarios para crear un Consultor no fueron proporcionados"
                    }
                }   
            }

            break;
        case "entrepreneur":
            const EntrepreneurValidation = EntrepreneurService.verifyCreateFields(firstName, lastName, birthdate, phoneNumber, postalAddress, state, city);
            
            if (!EntrepreneurValidation.success){
                serviceResponse = {
                    success: false,
                    content: {
                        error: "Un o más campos necesarios para crear un Emprendedor no fueron proporcionados"
                    }
                }   
            }
            break;
        default:
            serviceResponse = {
                success: false,
                content: {
                    message: "Tipo de usuario equivocado"
                }
            }
            break;
    }

    return serviceResponse;
}

//Sign up & Sign in service
UserService.findOneUsernameOrEmail = async (username, email) => {
    let serviceResponse = {
        success: true,
        content: {}
    }

    try {
        const user = await UserModel.findOne({
            $or: [{ username: username }, { email: email }]
        }).exec();

        if (!user) {
            serviceResponse = {
                success: false,
                content: {
                    message: "El User no se encontró"
                }
            }
        } else {
            serviceResponse = {
                success: true,
                content: {
                    message: "El Usuario fue encontrado",
                    user
                }
            }
        }

        return serviceResponse;
    } catch(error) {
        throw new Error("Internal Server Error");
    }
}

//Sign up service
UserService.register = async ({ username, email, password, type,  firstName, lastName, photo, birthdate, degree, phoneNumber, postalAddress, state, city, referencePrice, historicAveragePrice, consultantType, averageRating }) => {

    let serviceResponse = {
        success: true,
        content: {
            message: "El Usuario fue registrado"
        }
    }

    try {

        const newUser = new UserModel({ 
            username, 
            email,
            password,
            type
        });

        const userSaved = await newUser.save();

        if (!userSaved) {
            serviceResponse = {
                success: false,
                content: {
                    error: "El Usuario no pudo ser registrado"
                }
            }
        }
        
        switch(type) {
            case "consultant":
                const newConsultant =  await ConsultantService.createNewConsultant(userSaved, firstName, lastName, photo, birthdate, degree, referencePrice, historicAveragePrice, phoneNumber, averageRating, consultantType, state, city);

                if (!newConsultant.success){
                    serviceResponse = {
                        success: false,
                        content: {
                            error: "El Consultor no pudo ser registrado"
                        }
                    }   
                }
                break;

            case "entrepreneur":
                
                const newEntrepreneur = await EntrepreneurService.createNewEntrepreneur(userSaved, firstName, lastName, photo, birthdate, phoneNumber, postalAddress, state, city);
                
                if (!newEntrepreneur.success){
                    serviceResponse = {
                        success: false,
                        content: {
                            error: "El Emprendedor no pudo ser registrado"
                        }
                    }   
                }

                break;
            default:
                serviceResponse = {
                    success: false,
                    content: {
                        message: "Tipo de usuario equivocado"
                    }
                }   
                break;
        }

        return serviceResponse;

    } catch(error) {
        throw new Error("Internal Server Error")
    }

}
//Sign in service
UserService.verifyLoginFields = ({ identifier, password }) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "El Usuario fue encontrado"
        }
    }

    if (!identifier || !password) {
        serviceResponse = {
            success: false,
            content: {
                error: "Un o más campos necesarios no fueron proporcionados"
            }
        }

        return serviceResponse;
    }

    return serviceResponse;
};

UserService.findAll = async () => {
    let serviceResponse = {
        success:true,
        content:{}
    }
    
    try{
        const users = await UserModel.find();
        console.log ("FOUND: " + users);
        if (!users){
            serviceResponse = {
                success: false,
                content: {
                    error: "No se pudo encontrar ningún Usuario"
                }
            }
        } else {
            serviceResponse.content = {
                users,
                count: users.length
            }
        }
        return serviceResponse;
    }catch(error){
        console.log("An error occurred" + error);
        throw new Error("Internal Server Error");
    }
};

UserService.findOneByID = async (_id) => {
    let serviceResponse = {
        success:true,
        content:{
            message: "Se ha encontrado el Usuario"
        }
    }
    
    try{
        const userFound = await UserModel.findById(_id);
        if(!userFound) {
            serviceResponse = {
                success: false,
                content: {
                    error: "No se pudo encontrar el Usuario"
                }
            }
        }
        serviceResponse.content.user = userFound;
        return serviceResponse;
    }catch(error){
        console.log("An error occurred" + error);
        throw new Error("Internal Server Error");
    }
};

UserService.deleteOneByID = async (_id) => {
    let serviceResponse = {
        success:true,
        content:{
            message: "Se ha borrado el Usuario"
        }
    }

    try{
        const userDeleted = await UserModel.findByIdAndDelete(_id).exec();
        if (!userDeleted) {
            serviceResponse = {
                success: false, 
                content: {
                    error: "No se pudo borrar el Usuario"
                }
            }
        }
        return serviceResponse;
    }catch(error){
        console.log("An error occurred" + error);
        throw new Error("Internal Server Error");
    }
};

module.exports = UserService;