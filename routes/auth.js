require('dotenv').config();
const cookieParser = require('cookie-parser');
const http = require('http');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const adminAuthMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.auth;
        if (!token) {
            res.redirect('/');
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.role == "admin") {
            next();
        } else {
            res.redirect('/');
        }
    }
    catch(err){
        res.redirect('/');
    }
}
const teacherAuthMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.auth;
        if (!token) {
            res.redirect('/');
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.role == "teacher") {
            next();
        } else {
            res.redirect('/');
        }
    }
    catch(err){
        res.redirect('/');
    }
}
const studentAuthMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.auth;
        if (!token) {
            res.redirect('/');
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.role == "student") {
            next();
        } else {
            res.redirect('/');
        }
    }
    catch(err){
        res.redirect('/');
    }
}

const generateToken = function (userData) {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(userData, secret);
    return token;
}

const decodeCookie = async (token) => {
    const data = await jwt.verify(token, JWT_SECRET);
    return data;
}

const checkLogin = (req, res, next) => {
    try {
        const token = req.cookies.auth;
        if (!token) {
            next();
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.role == "admin") {
            res.redirect('/admin');
        } else if (decoded.role == "teacher") {
            res.redirect('/teacher');
        } else if (decoded.role == "student") {
            res.redirect('/student');
        } else {
            next();
        }
    }
    catch(err){
        return null;
    }
}

module.exports = { adminAuthMiddleware, teacherAuthMiddleware,studentAuthMiddleware, generateToken, checkLogin, decodeCookie };