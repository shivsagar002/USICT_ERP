const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {studentAuthMiddleware} = require('./auth');


const TimeTable = require('../models/timeTable');
const Notice = require('../models/notice');
const Event = require('../models/event');
const Student = require('../models/student');

const { decodeCookie } = require('./auth');

router.get('/',studentAuthMiddleware, async (req, res) => {
    try {
        const token = req.cookies.auth;
        const myObj = await decodeCookie(token);
        const myId = myObj.id;
        const user = await Student.findOne({ _id: myId });
        var notices = await Notice.find();
        var timeTables = await TimeTable.find();
        res.render('studentDashboard', {timeTables, notices,user});
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/myProfile', async (req, res) => {
    const token = req.cookies.auth;
    const myObj = await decodeCookie(token);
    const myId = myObj.id;
    const user = await Student.findOne({ _id: myId });
    res.render('userProfile', { user });
})

router.post('/saveProfile', async (req, res) => {
    try {
        const { username, name, gender, email, mobile, education, department, skills, languages, bio, birthday, cAddress, pAddress, twitter, facebook, linkedin, instagram } = req.body;
        const token = req.cookies.auth;
        const myObj = await decodeCookie(token);
        const myId = myObj.id;
        const response = await Student.findByIdAndUpdate(myId, { username, name, gender, email, mobile, education, department, skills, languages, bio, birthday, cAddress, pAddress, twitter, facebook, linkedin, instagram });

        console.log("Studnet saved");

        res.redirect('/student');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/changePassword', async (req, res) => {
    const { oldPassword, newpassword, confirmPassword } = req.body;
    const token = req.cookies.auth;
    const myObj = await decodeCookie(token);
    const myId = myObj.id;
    const user = await Student.findOne({ _id: myId });
    console.log(user);

    try{
        if (await user.comparePassword(oldPassword)) {
            const salt = await bcrypt.genSalt(10);
            const newpassword = await bcrypt.hash(confirmPassword ,salt);
            await Student.findByIdAndUpdate(myId, { password: newpassword });
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

module.exports = router;