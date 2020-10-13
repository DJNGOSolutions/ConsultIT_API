const UserModel = require('../models/User')

const emailRegex = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$");

const UserService = {};

//Sing up service
UserService.verifyRegistrationFields = ({ username, email, password }) => {
    let serviceResponse = {
        success: true,
        content: {}
    }
    
    if(!username || !email || !password){
        serviceResponse = {
            success: false,
            content: {
                message: "Some required fields are empty."
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
                    message: "Welcome!"
                }
            }
        }

        return serviceResponse;
    } catch(error) {
        throw new Error("Internal Server Error");
    }
}

//Sign up service
UserService.register = async ({ username, email, password }) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "User registrated."
        }
    }
    try {
        const user = new UserModel({ 
            username, 
            email,
            password
        });
        const userSaved = await user.save();

        if (!userSaved) {
            serviceResponse = {
                success: false,
                content: {
                    error: "User could not be registrated."
                }
            }
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
}

module.exports = UserService;