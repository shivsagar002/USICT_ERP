const mongoose = require('mongoose');

const timeTableSchema = new mongoose.Schema({
    "course": {
        type : String,
        required: true,
    },
    "semsester": {
        type : String,
        enum: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'],
        required: true,
    },
    "updateDate": {
        type: String,
        required : true
    },
    "timeTableFile": {
        type: String,
        required: true,
    }
});

const TimeTable = mongoose.model('TimeTable', timeTableSchema);
module.exports= TimeTable;