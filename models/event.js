const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    "title": {
        type : String,
        required: true,
        unique : true
    },
    "start": {
        type: String,
        required : true
    },
    "end": {
        type: String,
        required: true
    }
});

const Event = mongoose.model('Event', eventSchema);
module.exports= Event;