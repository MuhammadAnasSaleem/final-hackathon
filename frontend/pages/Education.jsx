import React from "react";
import LoanForm from "../components/loanForm.jsx";

const EducationLoan = () => {
  const handleFormSubmit = (formData) => {
    console.log("Education Loan Form Data:", formData);
    // API call or state update logic here
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Education Loan Application</h1>
      <LoanForm
        category="Education Loans"
        subcategories={["University Fees", "Child Fees Loan"]}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default EducationLoan;
