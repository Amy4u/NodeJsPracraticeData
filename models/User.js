const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be empty']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is already taken'],
        validate: [
            validator.isEmail, "Enter a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'password must be equal to or greater than 8 characters']
    },
    cpassword: {
        type: String,
        required: [true, 'Confirm Password is required'],
        validate: function() {
            if(this.cpassword !== this.password) {
                throw new Error("Password do not match");
            }
        }
    }
});

userSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt();
    const hashedString = await bcrypt.hash(this.password, salt);
    this.password = hashedString;
    this.cpassword = undefined;
});
 
userSchema.post('save', function() {
    console.log("after saving in database.");
});

// model for database

const userModel = mongoose.model('User', userSchema);

// async function createUser() {
//     let user = {
//         name: 'Hitesh',
//         email: 'hit@gmail.com',
//         password: '123123123',
//         cpassword: '123123123'
//     };

//     let data = await userModel.create(req.body);
//     console.log(data);
// };

module.exports = {
    userModel
}