const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentSchema = new mongoose.Schema({
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
        default: 'student',
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

studentSchema.pre('save', async function (next) {
    const student = this;
    if(!student.isModified('password')) return (next);
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(student.password ,salt);
        student.password = hashPassword ;
        next();
    }catch(e){
        console.log(e);
    }
})

// Method to compare the password with the user entered one
studentSchema.methods.comparePassword = async function(passwordUser){
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

const Student = mongoose.model('Student', studentSchema);
module.exports= Student;