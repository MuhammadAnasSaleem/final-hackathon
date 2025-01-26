import React, { useState } from "react";
import axios from "axios";
// import jwt_decode from "jwt-decode";
const baseurl = "http://localhost:3000/api/v1";

const LoanForm = ({ category, subcategories }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cnic: "",
    address: "",
    phone: "",
    category: "", // Added category field
    subcategory: "", // Added subcategory field
    amount: "",
    period: "",
    guarantors: [
      { name: "", email: "", location: "", cnic: "" },
      { name: "", email: "", location: "", cnic: "" },
    ],
    statement: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuarantorChange = (index, field, value) => {
    const updatedGuarantors = [...formData.guarantors];
    updatedGuarantors[index][field] = value;
    setFormData((prev) => ({ ...prev, guarantors: updatedGuarantors }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const token = document.cookie.split("=")[1]; // If you store token in a cookie

    // if (token) {
    //   const decodedToken = jwt_decode(token);
    //   const user = decodedToken.userId; // Assuming the token contains the userId

    //   // Now include user in the form data
    //   const updatedFormData = { ...formData, user };}
    try {
      const response = await axios.post(`${baseurl}/loans`, formData, {
        withCredentials: true,
      });
      alert(
        "Loan application submitted successfully and the data is sent to backends"
      );

      setFormData({
        name: "",
        email: "",
        cnic: "",
        address: "",
        phone: "",
        category: "",
        subcategory: "",
        amount: "",
        period: "",
        guarantors: [
          { name: "", email: "", location: "", cnic: "" },
          { name: "", email: "", location: "", cnic: "" },
        ],
        statement: "",
      });
    } catch (error) {
      setError(
        error.response?.data?.message || "Error submitting loan application"
      );
      alert(error.response?.data?.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold text-gray-700">
        {category} Loan Application
      </h2>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          required
        >
          <option value="">Select Category</option>
          <option value="Wedding">Wedding</option>
          <option value="Home Construction">Home Construction</option>
          <option value="Business Startup">Business Startup</option>
          <option value="Education">Education</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Subcategory
        </label>
        <select
          name="subcategory"
          value={formData.subcategory}
          onChange={handleChange}
          className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          required
        >
          <option value="">Select Subcategory</option>
          {subcategories?.map((subcategory) => (
            <option key={subcategory} value={subcategory}>
              {subcategory}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Loan Amount
        </label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          placeholder="Enter loan amount"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Loan Period
        </label>
        <input
          type="number"
          name="period"
          value={formData.period}
          onChange={handleChange}
          className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          placeholder="Enter loan period (in years)"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          placeholder="Enter your name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">CNIC</label>
        <input
          type="text"
          name="cnic"
          value={formData.cnic}
          onChange={handleChange}
          className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          placeholder="Enter your CNIC"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          placeholder="Enter your address"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          placeholder="Enter your phone number"
          required
        />
      </div>

      {formData.guarantors.map((guarantor, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-semibold text-gray-600">
            Guarantor {index + 1}
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={guarantor.name}
              onChange={(e) =>
                handleGuarantorChange(index, "name", e.target.value)
              }
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              placeholder="Enter guarantor's name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={guarantor.email}
              onChange={(e) =>
                handleGuarantorChange(index, "email", e.target.value)
              }
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              placeholder="Enter guarantor's email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              value={guarantor.location}
              onChange={(e) =>
                handleGuarantorChange(index, "location", e.target.value)
              }
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              placeholder="Enter guarantor's location"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              CNIC
            </label>
            <input
              type="text"
              value={guarantor.cnic}
              onChange={(e) =>
                handleGuarantorChange(index, "cnic", e.target.value)
              }
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              placeholder="Enter guarantor's CNIC"
              required
            />
          </div>
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Statement
        </label>
        <textarea
          name="statement"
          value={formData.statement}
          onChange={handleChange}
          className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          placeholder="Enter your statement (optional)"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
      >
        Submit Application
      </button>
    </form>
  );
};

export default LoanForm;
