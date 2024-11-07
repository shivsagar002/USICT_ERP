const { default: mongoose } = require("mongoose");
require('dotenv').config();

const mongoURL = process.env.MongoDB_URL;

mongoose.connect(mongoURL, {});

const db = mongoose.connection;

db.on("connected", ()=>{
    console.log("Connected with DB");
})

db.on( "error" , (err) => {
    console.log(`DB connection error : ${err}`); 
});

db.on( "close", () => {
   console.log('DB connection closed'); 
});

module.exports = db;