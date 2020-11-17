const EntrepreneurModel = require('../models/Entrepreneur');
const BusinessModel = require('../models/Business');

const EntrepreneurService = {};

EntrepreneurService.verifyCreateFields = (firstName, lastName, birthdate, phoneNumber, postalAddress, state, city) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "Fields OK"
        }
    }
    
    if(!firstName || !lastName || !birthdate || !phoneNumber || !postalAddress || !state || !city){
        serviceResponse = {
            success: false,
            content: {
                message: "A required field was not provided"
            }
        }
    }
    
    return serviceResponse;
};

EntrepreneurService.findOneEntrepreneurByUser = async (_id) => {
    let serviceResponse = {
        success: true,
        content: {}
    }

    try {
        const entrepreneur = await EntrepreneurModel.findOne({ user: _id });

        if (!entrepreneur) {
            serviceResponse = {
                success: false,
                content: {
                    error: "User not found."
                }
            }
        } else {
            serviceResponse.content = entrepreneur;
        }
        
        return serviceResponse;
    } catch(error) {
        throw new Error("Internal Server Error.");
    }
}

EntrepreneurService.createNewEntrepreneur = async (user, firstName, lastName, photo, birthdate, phoneNumber, postalAddress, state, city, businesses) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "A new Entrepreneur has been registered"
        }
    }
    
    try{
        const newEntrepreneur = new EntrepreneurModel({user, firstName, lastName, photo, birthdate, phoneNumber, postalAddress, state, city});

        if(!businesses) {
            const emptyBusinesses = [];
            newEntrepreneur.businesses = emptyBusinesses;
        }else{
            newEntrepreneur.businesses = businesses;
        }
        
        const savedEntrepreneur = await newEntrepreneur.save();
        if(!savedEntrepreneur) {
            serviceResponse = {
                success: false,
                content: {
                    error: "Business could not be registered"
                }
            }
        }
        return serviceResponse; 
    }catch(error){
        console.log("An error occurred" + error);
        throw new Error("Internal Server Error");
    }
};

EntrepreneurService.findAll = async (page, limit) => {
    let serviceResponse = {
        success: true, 
        content: {}
    }

    try{
        const entrepreneurs = await EntrepreneurModel.find({}, undefined, {
            skip: page * limit,
            limit: limit,
        }).exec();

        if(!entrepreneurs){
            serviceResponse = {
                success: false,
                content: {
                    error: "Could not find any entrepreneurs"
                }
            }
        }else{
            serviceResponse.content = {
                entrepreneurs,
                count: entrepreneurs.length,
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

EntrepreneurService.findAllBusinesses = async (_id) => {
    let serviceResponse ={
        success: true,
        content: {}
    }
    
    try{
        const entrepreneur = await EntrepreneurModel.findOne({user: _id});
        
        if(!entrepreneur){
            serviceResponse = {
                success: false,
                content: {
                    error: "Could not find this entrepreneur"
                }
            }
        }else{
            const businesses = await BusinessModel.find({_id:{ $in: entrepreneur.businesses }});
            console.log("Entrepreneur ->" + entrepreneur);
            console.log("Businesses ->" + businesses);

            serviceResponse.content = {businesses: businesses};
        }
        return serviceResponse;
    }catch(error){
        console.log("An error occurred" + error);
        throw new Error("Internal Server Error");
    }
}

EntrepreneurService.deleteOneByID = async (_id) => {
    let serviceResponse = {
        success: true,
        content: {
            message: "Entrepreneur deleted!"
        }
    }
    
    try{
        const entrepreneurDeleted = await EntrepreneurModel.findByIdAndDelete(_id).exec();
        if(!entrepreneurDeleted) {
            serviceResponse = {
                success: false, 
                content: {
                    error: "Entrepreneur could not be deleted"
                }
            }
        }
        return serviceResponse;
    }catch(error){
        console.log("An error occurred: " + error);
        throw new Error("Internal Server Error");
    }
}

EntrepreneurService.verifyUpdateFields = ({ firstName, lastName, photo, birthdate, phoneNumber, postalAddress, state, city }) => {
    let serviceResponse = {
        success: true,
        content: {}
    }

    if(!firstName && !lastName && !photo && !birthdate && !phoneNumber && !postalAddress && !state && !city) {
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
    if(phoneNumber) serviceResponse.content.phoneNumber = phoneNumber;
    if(postalAddress) serviceResponse.content.postalAddress = postalAddress;
    if(state) serviceResponse.content.state = state;
    if(city) serviceResponse.content.city = city;

    return serviceResponse;
}

EntrepreneurService.updateEntrepreneurById = async (entrepreneur, newEntrepreneurData) => {
    let serviceResponse = {
        success: true,
        content: {}
    }

    try {
        Object.keys(newEntrepreneurData).forEach(key => {
            entrepreneur[key] = newEntrepreneurData[key];
        });
        const updatedEntrepreneur = await entrepreneur.save();

        if (!updatedEntrepreneur) {
            serviceResponse = {
                success: false,
                content: {
                    error: "Entrepreneur was not updated."
                }
            }
        } else {
            serviceResponse.content = updatedEntrepreneur;
        }

        return serviceResponse;
    } catch(error) {
        throw new Error("Internal Server Error.")
    }
}

module.exports = EntrepreneurService;