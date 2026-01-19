const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      default: "+088",
    },
    password: {
      type: String,
      require: true,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
      default: null,
    },
    otpExpires: {
      type: Date,
    },
    resetPassToken: {
      type: String,
    },
    resetPassTokenExp: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) {
    return;
  }

  try {
    return (user.password = await bcrypt.hash(user.password, 10));
  } catch (error) {
    console.log("500 : internal server errors..!");
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const users = mongoose.model("user", userSchema);

module.exports = users;
