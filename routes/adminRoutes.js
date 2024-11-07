const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require("fs");
const bcrypt = require('bcrypt');

const Admin = require('../models/admin');
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Course = require('../models/course');
const TimeTable = require('../models/timeTable');
const Notice = require('../models/notice');
const Event = require('../models/event');
const { adminAuthMiddleware, decodeCookie } = require('./auth');
const { adminLogin, teacherLogin, studentLogin } = require('./nodeMailer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads/notices")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

const timeTableStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/timeTables/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const uploadTimeTable = multer({ storage: timeTableStorage });


// -----------------------Root Methods--------------------------
router.get('/myProfile', async (req, res) => {
    const token = req.cookies.auth;
    const myObj = await decodeCookie(token);
    const myId = myObj.id;
    const user = await Admin.findOne({ _id: myId });
    res.render('userProfile', { user });
});

router.post('/saveProfile', async (req, res) => {
    try {
        const { username, name, gender, email, mobile, education, department, skills, languages, bio, birthday, cAddress, pAddress, twitter, facebook, linkedin, instagram } = req.body;
        const token = req.cookies.auth;
        const myObj = await decodeCookie(token);
        const myId = myObj.id;
        const response = await Admin.findByIdAndUpdate(myId, { username, name, gender, email, mobile, education, department, skills, languages, bio, birthday, cAddress, pAddress, twitter, facebook, linkedin, instagram });
        console.log("Admin saved");
        res.redirect('/admin');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/', adminAuthMiddleware, async (req, res) => {
    try {
        const token = req.cookies.auth;
        const myObj = await decodeCookie(token);
        const myId = myObj.id;
        const user = await Admin.findOne({ _id: myId });
        var admins = await Admin.find();
        var teachers = await Teacher.find();
        var students = await Student.find();
        var courses = await Course.find();
        var notices = await Notice.find();
        var timeTables = await TimeTable.find();
        res.render('adminDashboard', { admins, teachers, students, courses, timeTables, notices, user });
    }
    catch (err) {
        console.log(err);
    }
});

router.post('/changePassword', async (req, res) => {
    const { oldPassword, newpassword, confirmPassword } = req.body;
    const token = req.cookies.auth;
    const myObj = await decodeCookie(token);
    const myId = myObj.id;
    const user = await Admin.findOne({ _id: myId });
    console.log(user);

    try{
        if (await user.comparePassword(oldPassword)) {
            const salt = await bcrypt.genSalt(10);
            const newpassword = await bcrypt.hash(confirmPassword ,salt);
            await Admin.findByIdAndUpdate(myId, { password: newpassword });
            res.redirect(302, '/');
        }
        else{
            res.send({error:'Wrong Password!'});
        }
    }
    catch(err){
        console.log(err);
        res.send({error:'Server Error!'});
    }
});

//------------------- Admin Methods---------------
router.post('/addAdmin', adminAuthMiddleware, async (req, res) => {
    try {
        const { name, email, mobile, username, password } = req.body;
        const newAdmin = new Admin({ name, email, mobile, username, password });

        const response = await newAdmin.save();
        console.log("Admin saved");

        const user = { name, email, username, password };
        await adminLogin(user);

        res.redirect('/admin');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/viewAdmin/:id', adminAuthMiddleware, async (req, res) => {
    try {
        const adminID = req.params.id;
        const user = await Admin.findOne({ _id: adminID });
        res.render('adminProfile', { user });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/deleteAdmin/:id', adminAuthMiddleware, async (req, res) => {
    try {
        const adminID = req.params.id;
        const result = await Admin.findOneAndDelete({ _id: adminID });
        res.redirect('/admin');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// -------------------Student Methods-------------------
router.post('/addStudent', adminAuthMiddleware, async (req, res) => {
    try {
        const { name, batchClass, email, mobile, username, password } = req.body;
        const newStudent = new Student({ name, batchClass, email, mobile, username, password });
        const response = await newStudent.save();
        console.log(response);
        console.log("Student saved");
        const user = { name, email, username, password };
        await studentLogin(user);
        res.redirect('/admin');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/deleteStudent/:id', adminAuthMiddleware, async (req, res) => {
    try {
        const studentID = req.params.id;
        const result = await Student.findOneAndDelete({ _id: studentID });
        res.redirect('/admin');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ----------------------Teacher Methods-----------------------

router.post('/addTeacher', adminAuthMiddleware, async (req, res) => {
    try {
        const { name, email, mobile, username, password } = req.body;
        const newTeacher = new Teacher({ name, email, mobile, username, password });
        const response = await newTeacher.save();
        console.log("Teacher saved");
        const user = { name, email, username, password };
        await teacherLogin(user);
        res.redirect('/admin');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/deleteTeacher/:id', adminAuthMiddleware, async (req, res) => {
    try {
        const TeacherID = req.params.id;
        const result = await Teacher.findOneAndDelete({ _id: TeacherID });
        res.redirect('/admin');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ----------------------Delete Course---------------------------
router.post('/addCourse', adminAuthMiddleware, async (req, res) => {
    try {
        const { courseId, courseName, totalSems, totalCredits } = req.body;
        const newCourse = new Course({ courseId, courseName, totalSems, totalCredits });
        const response = await newCourse.save();
        console.log("Course saved");
        res.redirect('/admin');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/deleteCourse/:id', adminAuthMiddleware, async (req, res) => {
    try {
        const CourseID = req.params.id;
        const result = await Course.findOneAndDelete({ _id: CourseID });
        res.redirect('/admin');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// -----------------------Time Tables Method---------------------

router.post('/addTimeTable', adminAuthMiddleware, uploadTimeTable.single('timeTableFile'), async (req, res) => {
    try {
        const { course, semsester, updateDate } = req.body;
        const timeTableFile = req.file.filename;
        const newTimeTable = new TimeTable({ course, semsester, updateDate, timeTableFile });
        const response = await newTimeTable.save();
        console.log("Time Table saved");
        res.redirect('/admin');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/viewTimeTable/:id', adminAuthMiddleware, async (req, res) => {
    try {
        const timeTableID = req.params.id;
        const timeTable = await TimeTable.findOne({ _id: timeTableID });
        var pdfUrl = "../../uploads/timeTables/" + timeTable.timeTableFile;
        const data = {
            name: timeTable.course,
            path: pdfUrl
        }
        res.render('pdfViewer', { data });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/deleteTimeTable/:id', adminAuthMiddleware, async (req, res) => {
    try {
        const timeTableID = req.params.id;
        const file = await TimeTable.findOne({ _id: timeTableID });
        fs.unlink('uploads/timeTables/' + file.timeTableFile, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully');
            }
        });
        const result = await TimeTable.findOneAndDelete({ _id: timeTableID });
        res.redirect('/admin');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});


// ----------------------Notice Methods--------------------------

router.post('/addNotice', adminAuthMiddleware, upload.single('noticeFile'), async (req, res) => {
    try {
        const { noticeDate, noticeName, noticeFor } = req.body;
        const noticeFile = req.file.filename;
        const newNotice = new Notice({ noticeDate, noticeName, noticeFor, noticeFile });
        const response = await newNotice.save();
        console.log("Notice saved");
        res.redirect('/admin');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/viewNotice/:id', adminAuthMiddleware, async (req, res) => {
    try {
        const NoticeID = req.params.id;
        const notice = await Notice.findOne({ _id: NoticeID });
        var pdfUrl = "../../uploads/notices/" + notice.noticeFile;
        const data = {
            name: notice.noticeName,
            path: pdfUrl
        }
        res.render('pdfViewer', { data });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/deleteNotice/:id', adminAuthMiddleware, async (req, res) => {
    try {
        const NoticeID = req.params.id;
        const file = await Notice.findOne({ _id: NoticeID });
        fs.unlink('uploads/notices/' + file.noticeFile, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully');
            }
        });
        const result = await Notice.findOneAndDelete({ _id: NoticeID });
        res.redirect('/admin');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ----------------------Event methods---------------------------
router.post('/create-event', adminAuthMiddleware, async (req, res) => {
    const { title, start, end } = req.body;
    console.log(title, start, end);
    const newEvent = new Event({ title, start, end });
    const response = await newEvent.save();
    console.log(response);
    res.redirect("/admin");
});


module.exports = router;