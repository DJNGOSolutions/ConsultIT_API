const UserService = require('../../services/User');

const UserController = {};

UserController.register = async(req, res) => { 

    const FieldsVerification = UserService.verifyRegistrationFields(req.body);
    
    if(!FieldsVerification.success){
        return res.status(400).json(FieldsVerification.content);
    } 

    try {
        const { username, email } = req.body;
        const UsernameFound = await UserService.findOneUsernameOrEmail(username, email);
        
        if(UsernameFound.success){
            return res.status(409).json({
                message: "User already exists"
            })
        }

        const UserRegistrated = await UserService.register(req.body);
        
        if (!UserRegistrated.success) {
            return res.status(409).json(UserRegistrated.content);
        }

        return res.status(201).json(UserRegistrated.content);
    } catch(error) {
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
};

UserController.login = async(req, res) => {

    const FieldsVerification = UserService.verifyLoginFields(req.body);

    if (!FieldsVerification.success) {
        return res.status(400).json(FieldsVerification.content);
    }

    try {
        const { identifier, password } = req.body;
        const UserFound = await UserService.findOneUsernameOrEmail(identifier, password);

        if (!UserFound.success) {
            return res.status(404).json(UserFound.content);
        }

        return res.status(200).json(UserFound.content);
    } catch(error) {
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
};

module.exports = UserController;