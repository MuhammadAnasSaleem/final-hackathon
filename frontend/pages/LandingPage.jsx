import React from "react";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const loanCategories = [
  {
    name: "Wedding Loans",
    description: "Plan your special day with ease.",
    color: "bg-pink-100",
    hoverColor: "hover:bg-pink-200",
  },
  {
    name: "Home Construction Loans",
    description: "Build or renovate your dream home.",
    color: "bg-blue-100",
    hoverColor: "hover:bg-blue-200",
  },
  {
    name: "Business Startup Loans",
    description: "Kickstart your business journey.",
    color: "bg-green-100",
    hoverColor: "hover:bg-green-200",
  },
  {
    name: "Education Loans",
    description: "Invest in a brighter future.",
    color: "bg-yellow-100",
    hoverColor: "hover:bg-yellow-200",
  },
];

const LandingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/protected",
          {
            withCredentials: true, // Include cookies in the request
          }
        );
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(
          "Authentication failed:",
          error.response?.data?.message || error.message
        );
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Show a loading state while checking authentication
  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  // Only render protected content if authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-200 flex flex-col items-center py-10 px-4">
        <h1 className="text-4xl font-bold text-gray-700 mb-8">
          Explore Loan Categories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {loanCategories.map((category, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md cursor-pointer transition-all duration-300 ${category.color} ${category.hoverColor}`}
              onClick={() => alert(`Redirect to ${category.name} page`)}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {category.name}
              </h2>
              <p className="text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
