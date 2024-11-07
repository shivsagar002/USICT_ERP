const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    "noticeDate": {
        type : String,
        required: true,
        
    },
    "noticeName": {
        type: String,
        required : true
    },
    "noticeFor": {
        type: String,
        enum: ['teachers','students','everyone'],
        default: 'everyone',
        required: true
    },
    "noticeFile": {
        type: String,
        required: true,
    }
});

const Notice = mongoose.model('Notice', noticeSchema);
module.exports= Notice;