// components/WeddingLoan.jsx
import React from "react";
import LoanForm from "../components/loanForm.jsx";

const WeddingLoan = () => {
  const handleFormSubmit = (formData) => {
    console.log("Wedding Loan Form Data:", formData);
    // API call or state update logic here
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Wedding Loan Application</h1>
      <LoanForm
        category="Wedding Loans"
        subcategories={["Valima", "Furniture", "Valima Food", "Jahez"]}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default WeddingLoan;
