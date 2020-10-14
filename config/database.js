const moongose = require('mongoose');

//const dbhost = process.env.DBHOST || "mongo";
//const dbport = process.env.DBPORT || "27017";
//const dbname = process.env.DBNAME || "ConsultIT";
//const dburi = process.env.DBURI || `mongodb://${dbhost}:${dbport}/${dbname}`;
const dbhost = "mongo";
const dbport = "27017";
const dbname = "ConsultIT";
const dburi = `mongodb://${dbhost}:${dbport}/${dbname}`;

const connect = async() => {
    try {
        await moongose.connect(dburi, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("DB connection successful");
    } catch(error) {
        console.log("Error in DB connection");
        console.log(dburi);
        process.exit(1);
    }
}

module.exports = {
    connect,
};