const JWT = require("jsonwebtoken");
const colors = require("colors");

module.exports = async (req, res, next) => {
  try {
    //check if token present as if it is not present accessing it will cause error
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({ success: false, message: "Token missing" });
    }
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Auth Failed",
        });
      } else {
        req.body.userId = decode.userId;
        // console.log(req , decode.userId)
        console.log(`Auth middleware success`.bgGreen.white)
        next();
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Auth Error",
      error,
    });
  }
};
