const Expend= require("../Models/Expend");
const User = require("../Models/User");

// ************************************ Add Expend *************************************

exports.addExpend = async (req, res) => {
  const newExpend = new Expend({ userId: req.user._id, ...req.body });
  try {

    

    const expend = await newExpend.save();

     const user  = await User.findOne({_id : req.user._id})
     user.expends = [...user.expends , expend._id]
     user.save()
    res.status(201).json({ msg: "Register Expends success", expend });
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Register Expends Failed" });
  }
};

// ************************************ update expend *************************************



exports.expendUpdate = async (req, res) => {
  
    try {
      const updateExpend=await Expend.findByIdAndUpdate({ _id: req.params.id },
        { $set: { ...req.body }})
      res.status(201).json({ msg: "Updated expend success", updateExpend });
    } catch (error) {
      console.log("3 : ", error);
      res.status(401).json({ msg: "Updated expend Failed" });
    }
  };


  // ************************************ Get all expends *************************************
  

  exports.expendGet = async (req, res) => {

    const allExpends = await Expend.find().populate("userId")
  
    try {
      await 
      res.status(201).json({ msg: "Get expends success" , allExpends});
    } catch (error) {
      console.log(error);
      res.status(401).json({ msg: "Get expends Failed" });
    }
  };

   // ************************************ Get expend by id *************************************
  

   exports.expendByIdGet = async (req, res) => {

    const { id } = req.params;
    const expend = await Expend.findById(id).populate("userId")
  
    try {
      await 
      res.status(201).json({ msg: "Get expend success" , expend});
    } catch (error) {
      console.log(error);
      res.status(401).json({ msg: "Get expend Failed" });
    }
  };


      // ************************************ Delete expend *************************************


      exports.expendDelete = async (req, res) => {
        const expend = await Expend.findOne({ _id: req.params.id });
        const userId= expend.userId
        const user = await User.findOne({ userId });
        try {   
           await user.expends.filter(expend=>expend!==req.params.id);
            const expendDeleted = await Expend.findOneAndDelete({
              _id: req.params.id,
            });
            await user.expends.filter(expend=>expend!==req.params.id);
          
          res.status(201).json({ msg: "expend deleted success", expendDeleted });
        } catch (error) {
          res.status(401).json({msg:"expend deleted failed" , error});
        }
      };