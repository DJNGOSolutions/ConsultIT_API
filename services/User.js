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
            message: "Fields OK"
        }
    }
    
    if(!username || !email || !password || !type){
        serviceResponse = {
            success: false,
            content: {
                message: "Some required fields for User are empty."
            }
        }

        return serviceResponse;
    }

    if(!emailRegex.test(email)){
        serviceResponse = {
            success: false,
            content: {
                message: "Wrong format for email."
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
                        message: "Some required fields for Consultant are empty."
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
                        message: "Some required fields for Entrepreneur are empty."
                    }
                }   
            }
            break;
        default:
            serviceResponse = {
                success: false,
                content: {
                    message: "Wrong type for user."
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
        content: {
            message: "User found."
        }
    }

    try {
        const user = await UserModel.findOne({
            $or: [{ username: username }, { email: email }]
        }).exec();

        if (!user) {
            serviceResponse = {
                success: false,
                content: {
                    message: "User not found"
                }
            }
        } else {
            serviceResponse = {
                success: true,
                content: {
                    message: "User found",
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
            message: "User registrated."
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
                    error: "User could not be registered"
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
                            message: "Consultant could not be registered"
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
                            message: "Entrepreneur could not be registered"
                        }
                    }   
                }

                break;
            default:
                serviceResponse = {
                    success: false,
                    content: {
                        message: "Wrong type for user."
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
            message: "User found."
        }
    }

    if (!identifier || !password) {
        serviceResponse = {
            success: false,
            content: {
                message: "Some fields are empty."
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
                    error: "Could not find any users"
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

UserService.deleteOneByID = async (_id) => {
    let serviceResponse = {
        success:true,
        content:{
            message: "User deleted"
        }
    }

    try{
        const userDeleted = await UserModel.findByIdAndDelete(_id).exec();
        if (!userDeleted) {
            serviceResponse = {
                success: false, 
                content: {
                    error: "User could not be deleted"
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