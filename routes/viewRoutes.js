const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const http = require('http');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Notice = require('../models/notice');
const TimeTable = require('../models/timeTable');

router.post('/notice/:id', async (req, res) => {
    try {
        const NoticeID = req.params.id;
        const notice = await Notice.findOne({ _id: NoticeID });
        var pdfUrl = "../../uploads/notices/"+notice.noticeFile;
        const data = {
            name : notice.noticeName,
            path : pdfUrl
        }
        res.render('pdfViewer',{data})  ;  
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/timeTable/:id', async (req, res) => {
    try {
        const timeTableID = req.params.id;
        const timeTable = await TimeTable.findOne({ _id: timeTableID });
        var pdfUrl = "../../uploads/timeTables"+timeTable.timeTableFile;
        const data = {
            name : timeTable.timeTableName,
            path : pdfUrl
        }
        res.render('pdfViewer',{data})  ;  
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/teacher/:id', async(req,res)=>{
    try {
        const teacherID = req.params.id;
        const user = await Teacher.findOne({ _id: teacherID });
        res.render('viewProfile', { user });  
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/student/:id', async(req,res)=>{
    try {
        const studentID = req.params.id;
        const user = await Student.findOne({ _id: studentID });
        res.render('viewProfile', { user });  
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/admin/:id', async(req,res)=>{
    try {
        const adminID = req.params.id;
        const user = await Admin.findOne({ _id: adminID });
        res.render('viewProfile', { user });  
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;