const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    // "name": {
    //     type : String,
    //     required: true
    // },
    // "userType":{
    //     type : String,
    //     enum: ['admin', 'teacher', 'student'],
    //     default: 'admin',
    //     required: true
    // },
    // "email": {
    //     type: String,
    //     required : true,
    //     unique: true
    // },
    // "mobile": {
    //     type: Number,
    //     required: true
    // },
    // "username": {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // "password": {
    //     type: String,
    //     required: true
    // }

    "name": {
        type: String,
        required: true
    },
    "profilePic":{
        type:String,
        default: 'user.jpg'
    },
    "userType": {
        type: String,
        enum: ['admin', 'teacher', 'student'],
        default: 'admin',
        required: true
    },
    "email": {
        type: String,
        required: true,
        unique: true
    },
    "gender": {
        type: String,
        enum: ['male', 'female', 'others']
    },
    "mobile": {
        type: Number,
        required: true
    },
    "username": {
        type: String,
        required: true,
        unique: true
    },
    "password": {
        type: String,
        required: true
    },
    "education": {
        type: String,
    },
    "department": {
        type: String,
    },
    "skills": {
        type: String,
    },
    "languages": {
        type: String,
    },
    "bio": {
        type: String,
    },
    "birthday": {
        type: String,
    },
    "cAddress": {
        type: String,
    },
    "pAddress": {
        type: String,
    },
    "twitter": {
        type: String,
    },
    "facebook": {
        type: String,
    },
    "linkedin": {
        type: String,
    },
    "instagram": {
        type: String,
    }
});

adminSchema.pre('save', async function (next) {
    const admin = this;
    if(!admin.isModified('password')) return (next);
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(admin.password ,salt);
        admin.password = hashPassword ;
        next();
    }catch(e){
        console.log(e);
    }
});

// Method to compare the password with the user entered one
adminSchema.methods.comparePassword = async function(passwordUser){
    try{
        const isMatch = await bcrypt.compare(passwordUser ,this.password );
        if(isMatch){
            console.log("Sucess");
            return true ;
        }
        else{
            console.log("Failed");
            return false;
        }
    } catch(e){
        console.log("Error in comparing passwords");
    }
}

const Admin = mongoose.model('Admin', adminSchema);
module.exports= Admin;