const mongoose = require('mongoose')
//Design A schema 
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required:true,
    },
    phone:{
        type:Number,
        required: true
    },
    created_on:{
        type:Date,
        default: Date.now()
    }

})
// create a Model...
const UserModel = mongoose.model("UserModel",UserSchema)

//now export

module.exports=UserModel;