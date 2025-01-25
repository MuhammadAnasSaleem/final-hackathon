const loanSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // User requesting the loan
    category: {
      type: String,
      required: true,
      enum: ["Wedding", "Home Construction", "Business Startup", "Education"],
    },
    subcategory: { type: String, required: true }, // Specific subcategory
    amount: { type: Number, required: true, max: 1000000 }, // Maximum PKR 10 Lakh
    period: { type: Number, required: true }, // Loan period in years
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Loan = model("Loan", loanSchema);
