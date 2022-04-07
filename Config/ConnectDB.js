const mongoose = require ("mongoose");

const connectDB= async ()=>{
   try {
         await mongoose.connect(process.env.MONGO_URI);
         console.log("DataBase is connected succefully")
   }catch (error){
       console.log("DataBase connection failed ", error)
   }
}

module.exports= connectDB;