import React from "react";
import LoanForm from "../components/loanForm.jsx";

const BusinessLoan = () => {
  const handleFormSubmit = (formData) => {
    console.log("Business Loan Form Data:", formData);
    // API call or state update logic here
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Business Loan Application</h1>
      <LoanForm
        category="Business Startup Loans"
        subcategories={[
          "Buy Stall",
          "Advance Rent for Shop",
          "Shop Assets",
          "Shop Machinery",
        ]}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default BusinessLoan;
