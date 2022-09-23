const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connect = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);

        if(connection) {
            console.log('connected to database');
        }
    } catch(err) {
        console.log(err.message);
    }
}

module.exports = connect;