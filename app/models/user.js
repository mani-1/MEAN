var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");

// Creating Schema
var UserSchema = new Schema({
  username: { type: String, lowercase: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
});

// To make password as an encrypted one
UserSchema.pre("save", function (next) {
  var user = this;
  // To make password as an encrypted one
  bcrypt.hash(user.password, null, null, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model("User", UserSchema);
