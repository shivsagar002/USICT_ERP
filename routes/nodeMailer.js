const nodemailer = require("nodemailer");
require('dotenv').config();
const sender = process.env.GMAIL_USER;


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

async function adminLogin(userInfo) {
    const info = await transporter.sendMail({
        from: `"USICT ERP" ${sender}`,
        to: `${userInfo.email}`,
        subject: "USICT ERP login Credientials",
        text: `Hello ${userInfo.name} you are registered as admin in  CPJ ERP System. Kindly use your credientials for login as admin.

        Your Creditentials =>
        website: https://ipu.shivsagar.tech
        username: ${userInfo.username} 
        password: ${userInfo.password}`,
    }, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

async function teacherLogin(userInfo) {
    const info = await transporter.sendMail({
        from: `"USICT ERP" ${sender}`,
        to: `${userInfo.email}`,
        subject: "USICT ERP login Credientials",
        text: `Hello ${userInfo.name} you are registered as admin in  CPJ ERP System. Kindly use your credientials for login as admin.

        Your Creditentials =>
        website: https://ipu.shivsagar.tech
        username: ${userInfo.username} 
        password: ${userInfo.password}`,
    }, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

async function studentLogin(userInfo) {
    const info = await transporter.sendMail({
        from: `"USICT ERP" ${sender}`,
        to: `${userInfo.email}`,
        subject: "USICT ERP login Credientials",
        text: `Hello ${userInfo.name} you are registered as admin in  CPJ ERP System. Kindly use your credientials for login as admin.

        Your Creditentials =>
        website: https://ipu.shivsagar.tech
        username: ${userInfo.username} 
        password: ${userInfo.password}`,
    }, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}


module.exports = { adminLogin, teacherLogin, studentLogin };