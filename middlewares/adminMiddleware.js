const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    // console.log(req.body.userId.bgYellow);
    const user = await userModel.findById(req.body.userId);
    // console.log(user);
    //check admin
    if (user?.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Admin auth fail",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Admin auth fail",
      error,
    });
  }
};
