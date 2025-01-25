import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    cninc: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/,
    },
    role: { type: String, enum: ["user", "admin"], default: "user" }, // For user/admin distinction
  },
  { timestamps: true }
);
// userSchema.index({ cninc: 1 }, { unique: true });

export const User = model("User", userSchema);
