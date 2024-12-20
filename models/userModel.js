const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: function () {
        if (this.role === "user" || this.role === "admin") {
          return true;
        }
        return false;
      },
    }, 
    organization: {
      type: String,
      require: function () {
        if (this.role === "organization") {
          return true;
        }
        return false;
      },
    },
    hospitalName: {
      type: String,
      require: function () {
        if (this.role === "hospital") {
          return true;
        }
        return false;
      },
    },
    email: {
      type: String,
      require: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "password is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      require: [true, "address is required"],
    },
    phone: {
      type: String,
      require: [true, "phone number is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
