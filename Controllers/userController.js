const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ************************************ Add User *************************************

exports.addUser = async (req, res) => {
    const newUser = new User({ ...req.body });
    const email = newUser.email;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({ msg: "User already exist" });
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.password, salt);
  
      newUser.password = hash;
  
      await newUser.save();
      res.status(201).json({ msg: "Register User success" });
    } catch (error) {
      console.log(error);
      res.status(401).json({ msg: "Register User Failed" });
    }
  };

  // ************************************ login User *************************************


  exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (!user) return res.status(401).json({ msg: "Bad credentiel" });
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) return res.status(401).json({ msg: "Bad credentiel" });
  
    try {
      const payload = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      };
  
      const token = await jwt.sign(payload, process.env.secretOrPrivateKey);
  
      res.status(200).json({ token: `Bearer ${token}` });
    } catch (err) {
      console.log(err)
      res.status(400).json({ errors: err });
    }
  };


  // ************************* get user by ID ********************************

  exports.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).populate("expends")
    // const user = await User.findById(req.params.id)
  
    try {
      await 
      res.status(201).json({ msg: "Get user success" , user});
    } catch (error) {
      console.log(error);
      res.status(401).json({ msg: "Get user Failed" });
    }
  };


  // ************************************ update User *************************************



  exports.UserUpdate = async (req, res) => {
    const { id } = req.params;
    // let user = await User.findById(id);
    // let userUpdate= null
    try {
      // await User.findById(id)
      if(req.file){
          const user= await User.findById(id)
        //  userUpdate = await User.findByIdAndUpdate(id,{$set : {...req.body,image : req.file.path}})
        userUpdate = await User.findByIdAndUpdate(id,{$set : {...req.body,image : req.file.path}})
    }else{
     
         userUpdate = await User.findByIdAndUpdate(id,{$set : {...req.body, dateOfCreation : date.now()}})
    };
      res.status(201).json({ msg: "Updated User success",userUpdate});
    } catch (error) {
      console.log("3 : ", error);
      res.status(401).json({ msg: "Updated User Failed", error });
    }
  };


   // ************************************ Delete User *************************************


  exports.UserDelete = async (req, res) => {
    const { id } = req.params;
    try {
      await User.findByIdAndRemove(id)
      res.status(201).json({ msg: "Deleted User success"  });
    } catch (error) {
      res.status(401).json({ msg: "Deleted User Failed" });
    }
  };


      // ************************************ Get User *************************************


  exports.UserGet = async (req, res) => {

    const allUsers = await User.find().populate("expends");
    // const allUsers = await User.find();
  
    try {
      await 
      res.status(201).json({ msg: "Get Users success" , allUsers});
    } catch (error) {
      console.log(error);
      res.status(401).json({ msg: "Get Users Failed" });
    }
  };