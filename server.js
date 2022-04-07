require("dotenv").config({ path: "./config/.env" });


const express = require ("express");
const connectDB = require("./config/ConnectDB");
const user = require("./Routes/user");

const app= express();

connectDB();

app.use(express.json());

app.use("/user", user);


const PORT=process.env.PORT;


app.listen(PORT,(err) => {
    err
      ? console.log("Server connection failed")
      : console.log(`Server connected successfully on PORT ${PORT}`);
  });