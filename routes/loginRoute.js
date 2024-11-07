const express = require('express');
const router = express.Router();
const http = require('http');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Connecting Database
const db = require('../db');
const Admin = require('../models/admin');
const Student = require('../models/student');
const Teacher = require('../models/teacher');

const {adminAuthMiddleware, generateToken} = require('./auth');

router.post( '/', async (req, res) => {
    const { username, password, userRole } = req.body;
    if(userRole=='admin'){
        try{
            let user = await Admin.findOne({username: username});
            if(!user){
                res.send("User not found");
            }else{
                if(await user.comparePassword(password)==true){
                    const userData = {name:  user.name, id: user._id,username: user.username, role: user.userType};
                    try{
                        const token = generateToken(userData);
                        res.cookie('auth', token,{ httpOnly: true });
                        res.redirect('/admin');
                    }
                    catch(err){
                        console.log(err);
                        res.send(err);
                    }
                }
                else{
                    res.send("Incorrect, Try again");
                }
            }
        }
        catch{
            res.status(500).send('Server error');
        }
    }
    if(userRole=='student'){
        try{
            let user = await Student.findOne({username: username});
            if(!user){
                res.send("User not found");
            }else{
                if(await user.comparePassword(password)==true){
                    const userData = {name:  user.name, id: user._id,username: user.username, role: user.userType};
                    try{
                        const token = generateToken(userData);
                        res.cookie('auth', token,{ httpOnly: true });
                        res.redirect('/student');
                    }
                    catch(err){
                        console.log(err);
                        res.send(err);
                    }
                }
                else{
                    res.send("Incorrect, Try again");
                }
            }
        }
        catch{
            res.status(500).send('Server error');
        }
    }
    if(userRole=='teacher'){
        try{
            let user = await Teacher.findOne({username: username});
            if(!user){
                res.send("User not found");
            }else{
                if(await user.comparePassword(password)==true){
                    const userData = {name:  user.name, id: user._id,username: user.username, role: user.userType};
                    try{
                        const token = generateToken(userData);
                        res.cookie('auth', token,{ httpOnly: true });
                        res.redirect('/teacher');
                    }
                    catch(err){
                        console.log(err);
                        res.send(err);
                    }
                }
                else{
                    res.send("Incorrect, Try again");
                }
            }
        }
        catch{
            res.status(500).send('Server error');
        }
    }
});

module.exports = router;