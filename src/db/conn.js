const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/studentapi").then((data)=>{
    console.log("Connection Successful");
}).catch((err)=>{
    console.log("No connection");
})