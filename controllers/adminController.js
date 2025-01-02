const userModel = require("../models/userModel");

const getDonarListController = async (req, res) => {
  try {
    const data = await userModel
      .find({ role: "donar" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      Totalcount: data.length,
      message: "Admin Donar List fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Admin Donar List API",
      error,
    });
  }
};

const getHospitalListController = async (req, res) => {
  try {
    const data = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      Totalcount: data.length,
      message: "Admin Hospital List fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Admin Hospital List API",
      error,
    });
  }
};

const getOrganizationListController = async (req, res) => {
  try {
    const data = await userModel
      .find({ role: "organization" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      Totalcount: data.length,
      message: "Admin Org List fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Admin org List API",
      error,
    });
  }
};

/////////////////////
// delete
const deleteController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Record deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in delete API",
      error,
    });
  }
};

//export
module.exports = {
  getDonarListController,
  getHospitalListController,
  getOrganizationListController,
  deleteController,
};
