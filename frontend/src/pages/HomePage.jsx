import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">
        Welcome to Blockchain Voting System
      </h1>
      <div className="flex space-x-4">
        <Link
          to="/admin"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Admin Login
        </Link>
        <Link
          to="/user"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          User Login
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
