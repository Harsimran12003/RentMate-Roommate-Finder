import React from "react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property, viewMy, onEdit, onDelete, onViewDetails }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
      <img
        src={
          property.image
            ? property.image.startsWith("http")
              ? property.image
              : `http://localhost:5000${property.image}`
            : "https://via.placeholder.com/400"
        }
        alt={property.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800">
          {property.title}
        </h3>
        <p className="text-blue-600 font-medium mt-1">
          ₹{property.rent}/month
        </p>
        <p className="text-gray-600 mt-2 text-sm">
          {property.city}, {property.state} — {property.location}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {property.tags &&
            (Array.isArray(property.tags)
              ? property.tags
              : property.tags.split(",")
            ).map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 text-blue-800 px-4 py-1 rounded-full text-xs font-semibold shadow-md border border-blue-300 tracking-wide"
              >
                {typeof tag === "string" ? tag.trim() : String(tag)}
              </span>
            ))}
        </div>
        <button
          onClick={() => onViewDetails(property)}
          className="mt-5 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition cursor-pointer"
        >
          View Details
        </button>

        {viewMy && (
          <div className="mt-3 flex space-x-2">
            <button
              onClick={() => onEdit(property)}
              className="px-3 py-1 bg-yellow-500 text-white rounded cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(property._id)}
              className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
