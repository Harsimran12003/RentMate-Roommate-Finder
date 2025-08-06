import React from "react";
import { useNavigate } from "react-router-dom";

const Properties = () => {
  const navigate = useNavigate();

  const properties = [
    {
      id: 1,
      image: "",
      title: "Spacious 2BHK Apartment",
      price: "₹12,000/month",
      location: "Model Town, Ludhiana",
      tags: ["Wi-Fi", "AC", "Furnished"],
    },
    {
      id: 2,
      image: "",
      title: "1 Room for Girls",
      price: "₹5,500/month",
      location: "Civil Lines, Ludhiana",
      tags: ["Near College", "Safe Area"],
    },
    {
      id: 3,
      image: "",
      title: "Studio Flat for Rent",
      price: "₹8,000/month",
      location: "Pakhowal Road, Ludhiana",
      tags: ["Pet Friendly", "Private Entry"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-purple-100 py-12 px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Available Properties
      </h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800">
                {property.title}
              </h3>
              <p className="text-blue-600 font-medium mt-1">{property.price}</p>
              <p className="text-gray-600 mt-2 text-sm">{property.location}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {property.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => navigate(`/property/${property.id}`)}
                className="mt-5 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;
