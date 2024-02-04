const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// defining the schema
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

// schema methods
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compareSync(enteredPassword, this.password);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hashSync(this.password, salt);
});

//defining the model
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
