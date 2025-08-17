import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Properties = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const properties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      title: "Spacious 2BHK Apartment",
      price: "₹12,000/month",
      location: "Model Town, Ludhiana",
      tags: ["Wi-Fi", "AC", "Furnished"],
      description:
        "A spacious 2BHK with modern amenities, perfect for students and working professionals.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1560448075-bb13b9b3e8a0",
      title: "1 Room for Girls",
      price: "₹5,500/month",
      location: "Civil Lines, Ludhiana",
      tags: ["Near College", "Safe Area"],
      description:
        "Affordable single room accommodation in a safe locality, especially suited for college students.",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1586105251261-72a756497a12",
      title: "Studio Flat for Rent",
      price: "₹8,000/month",
      location: "Pakhowal Road, Ludhiana",
      tags: ["Pet Friendly", "Private Entry"],
      description:
        "Compact studio flat with private entry and pet-friendly environment.",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gradient-to-tr from-blue-50 to-purple-100">
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
                  onClick={() => setSelectedProperty(property)}
                  className="mt-5 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side Drawer */}
      <div
        className={`fixed inset-0 flex justify-end z-50 transition ${
          selectedProperty ? "visible" : "invisible"
        }`}
      >
        {/* Background Overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            selectedProperty ? "bg-opacity-40" : "bg-opacity-0"
          }`}
          onClick={() => setSelectedProperty(null)}
        ></div>

        {/* Drawer */}
        <div
          className={`relative w-full sm:w-96 bg-white h-full shadow-xl p-6 overflow-y-auto transform transition-transform duration-500 ease-in-out
          ${selectedProperty ? "translate-x-0" : "translate-x-full"}`}
        >
          {selectedProperty && (
            <>
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl"
                onClick={() => setSelectedProperty(null)}
              >
                ✕
              </button>
              <img
                src={selectedProperty.image}
                alt={selectedProperty.title}
                className="w-full h-52 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedProperty.title}
              </h2>
              <p className="text-blue-600 font-medium mt-1">
                {selectedProperty.price}
              </p>
              <p className="text-gray-600 mt-2">{selectedProperty.location}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {selectedProperty.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-gray-700 leading-relaxed">
                {selectedProperty.description}
              </p>

              <button className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition">
                Contact Owner
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;
