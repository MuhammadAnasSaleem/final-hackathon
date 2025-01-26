// components/WeddingLoan.jsx
import React from "react";
import LoanForm from "../components/loanForm.jsx";

const HomeContainerLoan = () => {
  const handleFormSubmit = (formData) => {
    console.log("Home Loan Form Data:", formData);
    // API call or state update logic here
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Home Loan Application</h1>
      <LoanForm
        category="Home Loan"
        subcategories={["Buying", "Furniture", "Renovation", "COnstruction"]}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default HomeContainerLoan;
