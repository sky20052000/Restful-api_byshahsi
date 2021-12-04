const mongoose = require("mongoose");
const validator = require("validator");

// creating schema
const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 3,
    unique:true
  },
  lastname: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Error");
      }
    },
  },
  phone: {
    type: Number,
    minlength: 10,
    required: true
    
  },
  address: {
    type: String,
    required: true,
  },
  date:{
    type:Date,
    default:Date.now
  }
});


//  create new collection or model
const Student = new mongoose.model("Student",studentSchema);

module.exports = Student;