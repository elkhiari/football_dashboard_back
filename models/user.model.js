const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      unique: [true, "Username already exists"],
      lowercase: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    defaultPassword: {
      type: Boolean,
      default: true,
    },
    defaultProfile: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
