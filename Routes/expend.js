const express = require("express");
const isAuth = require("../middelwares/passport-setup");
const { addExpend, expendByIdGet, expendUpdate, expendDelete } = require("../Controllers/expendController");
const { expendGet } = require("../Controllers/expendController");
const Router = express.Router();

Router.post("/addExpend",isAuth() ,addExpend);
Router.get("/currentExpend/:id", isAuth(), expendByIdGet);
Router.put("/updateExpend/:id",isAuth(), expendUpdate);
Router.delete("/deleteExpend/:id", isAuth(), expendDelete);
Router.get("/getExpend", expendGet);


module.exports = Router;