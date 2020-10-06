const UserModel = require('../models/User')

const UserService = {};

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

    return serviceResponse;
}

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
                    message: "User not found"
                }
            }
        } else {
            serviceResponse.content = user;
        }

        return serviceResponse;
    } catch(error) {
        throw new Error("Internal Server Error");
    }
}

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

module.exports = UserService;