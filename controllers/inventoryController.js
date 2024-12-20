const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

//create inventory
const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body;
    //validation
    const user = await userModel.findOne({ email });
    // console.log("user=",user)
    if (!user) {
      throw new Error("User Not Found".bgRed); //shows message in terminal
      //   return res.status(404).send({
      //     success: false,
      //     message: "User Not Found",
      //   });
    }
    if (inventoryType === "in" && user.role !== "donar") {
      throw new Error("Not a donar account".bgRed);
    }
    if (inventoryType === "out" && user.role !== "hospital") {
      throw new Error("Not a hospital".bgRed);
    }
    //save inventory
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood record added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Create Inventory API",
      error,
    });
  }
};

//get all blood recors
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organization: req.body.organization,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ created: -1 });
    return res.status(200).send({
      success: true,
      message: "Got all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Get Inventory",
      error,
    });
  }
};

module.exports = { createInventoryController, getInventoryController };
