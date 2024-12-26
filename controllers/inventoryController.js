const mongoose = require("mongoose");
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
      // throw new Error("User Not Found".bgRed);
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donar account".bgRed);
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital".bgRed);
    // }

    //iinventory out logic
    if (inventoryType === "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;

      const organization = new mongoose.Types.ObjectId(req.body.userId);
      //For specified blood group
      //calculate blood quantity - in
      const totalBloodIn = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalIn = totalBloodIn[0]?.total || 0;
      console.log("Total In=", totalBloodIn);
      //calculate blood quantity - out
      const totalBloodOut = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      console.log("Total Out=", totalBloodOut);
      const totalOut = totalBloodOut[0]?.total || 0;

      //calculation
      const availableQuantity = totalIn - totalOut;
      if (availableQuantity < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuantity}mL of ${requestedBloodGroup} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }
    // save inventory
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
    console.log("req.body=", req.body);
    const inventory = await inventoryModel
      .find({
        organization: req.body.userId,
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

//get donar records
const getDonarsController = async (req, res) => {
  try {
    // console.log("Inside getDonarsController".bgYellow);
    const organization = req.body.userId;
    //find donars
    const donarId = await inventoryModel.distinct("donar", {
      organization: organization,
    });
    // console.log(`donarId=, ${donarId}`.bgYellow);
    const donars = await userModel.find({_id: { $in: donarId } });
    // console.log(`donars=, ${donars}`.bgYellow);
    return res.status(200).send({
      success: true,
      message: "Got donar records successfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Get Donar Record API",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarsController,
};
