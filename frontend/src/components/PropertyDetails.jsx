import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getPropertyById } from "../services/propertyService"; 

const PropertyDetails = ({ propertyId, onClose }) => {
  const [property, setProperty] = useState(null);
  const [view, setView] = useState("property"); 
  const navigate = useNavigate();

  // Fetch full property details
  useEffect(() => {
    if (propertyId) {
      getPropertyById(propertyId)
        .then((data) => setProperty(data))
        .catch((err) => console.error(err));
    }
  }, [propertyId]);

  if (!property) return null;
  const tenant = property.tenant;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 70 }}
        className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white shadow-2xl z-50 overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          {view === "tenant" ? (
            <button
              onClick={() => setView("property")}
              className="flex items-center gap-2 text-gray-600 hover:text-black"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          ) : (
            <h2 className="text-xl font-bold">Property Details</h2>
          )}
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600 hover:text-black" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {view === "property" && (
            <>
              <img
                src={
                  property.image
                    ? property.image.startsWith("http")
                      ? property.image
                      : `http://localhost:5000${property.image}`
                    : "https://via.placeholder.com/400"
                }
                alt={property.title}
                className="w-full h-50 object-fit rounded-xl shadow-md"
              />
              <h1 className="text-2xl font-extrabold mt-4">{property.title}</h1>
              <p className="text-blue-600 font-bold text-lg mt-2">
                ₹{property.rent}/month
              </p>
              <p className="text-gray-700">
                {property.city}, {property.state}
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                {property.description}
              </p>

              {/* Tenant Info */}
              {tenant && (
                <div className="mt-6 border-t pt-4 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        tenant.profilePhoto
                          ? tenant.profilePhoto.startsWith("http")
                            ? tenant.profilePhoto
                            : `http://localhost:5000${tenant.profilePhoto}`
                          : "https://via.placeholder.com/400"
                      }
                      alt={tenant.fullName}
                      className="w-14 h-14 rounded-full object-cover shadow"
                    />
                    <div>
                      <p className="font-semibold text-lg">{tenant.fullName}</p>
                      <p className="text-gray-600 text-sm">{tenant.email}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setView("tenant")}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-2 rounded-lg shadow-md transition"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => navigate(`/chat/${tenant._id}`)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition"
                    >
                      Chat
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {view === "tenant" && tenant && (
            <>
              <div className="flex flex-col items-center">
                <img
                  src={
                    tenant.profilePhoto
                      ? tenant.profilePhoto.startsWith("http")
                        ? tenant.profilePhoto
                        : `http://localhost:5000${tenant.profilePhoto}`
                      : "https://via.placeholder.com/400"
                  }
                  alt={tenant.fullName}
                  className="w-28 h-28 rounded-full object-cover shadow-md"
                />
                <h3 className="text-xl font-semibold mt-4">
                  {tenant.fullName}
                </h3>
              </div>

              {/* Tenant fields */}
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Tenant Details</h4>
                <div className="space-y-2">
                  {Object.entries(tenant).map(([key, value]) => {
                    if (
                      [
                        "_id",
                        "profilePhoto",
                        "__v",
                        "password",
                        "email",
                        "phone",
                        "lastLogin",
                        "createdAt",
                        "updatedAt",
                      ].includes(key)
                    )
                      return null;
                    return (
                      <p key={key} className="text-gray-700 text-sm">
                        <span className="font-medium capitalize">{key}: </span>
                        {String(value)}
                      </p>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => navigate(`/chat/${tenant._id}`)}
                className="mt-8 w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition"
              >
                Start Chat
              </button>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PropertyDetails;
