const mongoose = require("mongoose");


const expendSchema = new mongoose.Schema({
userId:{
    type: mongoose.Schema.Types.ObjectId,
      ref:"User"
},
  file:{
      type: String,
  },
  title:{
    type: String,
},
  total:{
    type: Number,
},
  categorie:{
    type: String,
    enum:["accomodation","other","transport","journey"]
},
  seller:{
    type: String,
},
  etat:{
    type: String,
    enum:["pending","validated","rejected"],
    default:"pending"
},

  dateOfCreation:{
      type: Date,
      default: Date.now()
  }
});

module.exports = mongoose.model("Expend", expendSchema);