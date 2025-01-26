import React, { useState } from "react";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");
  const [loanPeriodYears, setLoanPeriodYears] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [remainingLoan, setRemainingLoan] = useState("");

  const handleLoanAmountChange = (e) => {
    setLoanAmount(e.target.value);
  };

  const handleInitialDepositChange = (e) => {
    setInitialDeposit(e.target.value);
  };

  const handleLoanPeriodYearsChange = (e) => {
    setLoanPeriodYears(e.target.value);
  };

  const calculateLoan = () => {
    // Check if initial deposit is less than 10% of loan amount
    const minimumDeposit = loanAmount * 0.1; // 10% of loan amount
    if (initialDeposit < minimumDeposit) {
      alert(
        `Initial deposit must be at least 10% of the loan amount (PKR ${minimumDeposit.toFixed(
          2
        )}).`
      );
      return;
    }

    const remainingLoanAmount = loanAmount - initialDeposit;

    if (remainingLoanAmount < 0) {
      alert("Initial deposit cannot be more than loan amount.");
      return;
    }

    // Convert the loan period from years to months
    const loanPeriodMonths = loanPeriodYears * 12;

    // Calculate the monthly payment
    const monthlyPaymentAmount = remainingLoanAmount / loanPeriodMonths;

    setRemainingLoan(remainingLoanAmount);
    setMonthlyPayment(monthlyPaymentAmount);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default action (form submission)
      calculateLoan(); // Call calculateLoan when Enter is pressed
    }
  };

  return (
    <div className="w-full bg-gray-200 flex justify-center py-12 mt-10">
      <div className="w-full max-w-lg bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Loan Calculator
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Loan Amount
          </label>
          <input
            type="number"
            value={loanAmount}
            onChange={handleLoanAmountChange}
            onKeyDown={handleKeyDown} // Listen for Enter key press
            placeholder="Enter loan amount"
            className="mt-2 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Initial Deposit
          </label>
          <input
            type="number"
            value={initialDeposit}
            onChange={handleInitialDepositChange}
            onKeyDown={handleKeyDown} // Listen for Enter key press
            placeholder="Enter initial deposit"
            className="mt-2 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Loan Period (Years)
          </label>
          <input
            type="number"
            value={loanPeriodYears}
            onChange={handleLoanPeriodYearsChange}
            onKeyDown={handleKeyDown} // Listen for Enter key press
            placeholder="Enter loan period in years"
            className="mt-2 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={calculateLoan}
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Calculate
        </button>

        {remainingLoan && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Loan Breakdown</h3>
            <table className="w-full table-auto border-separate border-spacing-0 border border-gray-200">
              <tbody>
                <tr className="border-b">
                  <td className="p-3 text-sm text-gray-700">
                    Remaining Loan (after deposit):
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    PKR {remainingLoan}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-sm text-gray-700">
                    Monthly Payment:
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    PKR {monthlyPayment.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanCalculator;
