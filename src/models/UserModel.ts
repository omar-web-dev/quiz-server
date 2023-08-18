import mongoose from "mongoose";

const userSchema: mongoose.Schema = new mongoose.Schema({

  email: {
    type: String,
    required: [true, "Email is required."],
    trim: true,
    unique: true,
    lowercase: true,
  },

  type: {
    type: String,
    enum: ["subscriber", "admin"],
    default: "subscriber",
  },

  password: {
    type: String,
    default: "1234",
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
});


userSchema.post("save", function (error: any, doc: any, next: any) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("Email already exists!"));
  } else {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
