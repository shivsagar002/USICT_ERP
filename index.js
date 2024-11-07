const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//DB Connection
const db = require('./db');

// DB Models Import
const Admin = require('./models/admin');
const Student = require('./models/student');
const Teacher = require('./models/teacher');
const Event = require('./models/event');

const {checkLogin} = require('./routes/auth');

const PORT = process.env.PORT || 5000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', checkLogin, (req, res) => {
    res.render('index');
});

app.listen(PORT, () => console.log('Server listening on port 8080'));

app.get('/pdfViewer', (req, res) => {
    console.log(req.body);
    res.render('pdfViewer');
})

app.get('/events', async (req, res) => {
    const events = await Event.find();
    res.json(events);
});
app.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

const loginRoute = require('./routes/loginRoute');
app.use('/login', loginRoute);

const adminRoute = require('./routes/adminRoutes');
app.use('/admin', adminRoute);

const studentRoute = require('./routes/studentRoutes');
app.use('/student', studentRoute);

const teacherRoute = require('./routes/teacherRoutes');
app.use('/teacher', teacherRoute);

const viewRoute = require('./routes/viewRoutes');
app.use('/view', viewRoute);
