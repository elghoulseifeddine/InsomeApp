const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "No first name typed"],
  },
  lastName: {
    type: String,
    required: [true, "No last name typed"],
  },
  email:{
      type: String,
      required: [true, "No email typed"]
  },
  password: {
      required:true,
      type: String,
      min: 6,
      max: 20
  },
  tel:{
    required:true,
    type: String
  },

  role:{
      type: String,
      required:true,
      enum:["admin","Team Leader","Team Member"],
      default:"Team Member"
  },
  
//   posts:[{
//       type: mongoose.Schema.Types.ObjectId,
//       ref:"Post"
//   }],

  dateOfCreation:{
      type: Date,
      default: Date.now()
  }
});

module.exports = mongoose.model("User", userSchema)