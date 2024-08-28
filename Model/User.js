const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profilePicture:{
        type:String
    },
    githubLink:{
        type:String
    },
    linkdinLink:{
        type:String
    }
})

const users = mongoose.model('users',userSchema)
module.exports = users