import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Loan Schema Definition
const loanSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // User requesting the loan
    category: {
      type: String,
      required: true,
      enum: ["Wedding", "Home Construction", "Business Startup", "Education"], // Loan categories
    },
    subcategory: { type: String, required: true }, // Specific subcategory
    amount: { type: Number, required: true, max: 1000000 }, // Maximum PKR 10 Lakh
    period: { type: Number, required: true }, // Loan period in years
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending", // Default status is pending
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// Loan Model
export const Loan = model("Loan", loanSchema);
