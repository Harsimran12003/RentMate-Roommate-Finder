import React from "react";
import { useParams } from "react-router-dom";

const PropertyDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Property Detail 
      </h1>
      <p className="text-lg text-gray-600">Property ID: {id}</p>
        <div className="mt-6 bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Property Title
            </h2>
            <p className="text-gray-700 mb-4">
            Description of the property .
            </p>
            <p className="text-blue-600 font-bold text-lg">Price: ₹10,000/month</p>
            </div>
    </div>
  );
};

export default PropertyDetail;
