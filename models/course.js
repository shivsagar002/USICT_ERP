const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    "courseId": {
        type : String,
        required: true,
        unique : true
    },
    "courseName": {
        type: String,
        required : true,
        unique: true
    },
    "totalSems": {
        type: Number,
        required: true
    },
    "totalCredits": {
        type: Number,
        required: true,
    }
});

const Course = mongoose.model('Course', courseSchema);
module.exports= Course;