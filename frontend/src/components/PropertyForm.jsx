import React from "react";

const PropertyForm = ({
  newProperty,
  setNewProperty,
  handleSubmit,
  handleCancel,
  editingId,
}) => {
  return (
    <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto animate-fadeIn">
      <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4 text-center">
        {editingId ? "Edit Property" : "Add New Property"}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Title */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            value={newProperty.title}
            onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
            placeholder="e.g. Cozy 2BHK Apartment"
            className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* Rent */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Rent (₹)</label>
          <input
            type="number"
            value={newProperty.rent}
            onChange={(e) => setNewProperty({ ...newProperty, rent: e.target.value })}
            placeholder="e.g. 15000"
            className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* State */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">State</label>
          <input
            type="text"
            value={newProperty.state}
            onChange={(e) => setNewProperty({ ...newProperty, state: e.target.value })}
            placeholder="e.g. Punjab"
            className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* City */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">City</label>
          <input
            type="text"
            value={newProperty.city}
            onChange={(e) => setNewProperty({ ...newProperty, city: e.target.value })}
            placeholder="e.g. Ludhiana"
            className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* Location */}
        <div className="flex flex-col sm:col-span-2">
          <label className="text-gray-700 font-medium mb-1">Location</label>
          <input
            type="text"
            value={newProperty.location}
            onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
            placeholder="e.g. Model Town, Ludhiana"
            className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col sm:col-span-2">
          <label className="text-gray-700 font-medium mb-1">Description</label>
          <textarea
            value={newProperty.description}
            onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
            placeholder="Write a brief description..."
            rows={3}
            className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* Tags */}
        <div className="flex flex-col sm:col-span-2">
          <label className="text-gray-700 font-medium mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            value={newProperty.tags.join(", ")}
            onChange={(e) =>
              setNewProperty({
                ...newProperty,
                tags: e.target.value.split(",").map((t) => t.trim()),
              })
            }
            placeholder="e.g. furnished, near metro, pet-friendly"
            className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col sm:col-span-2">
          <label className="text-gray-700 font-medium mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewProperty({ ...newProperty, image: e.target.files[0] })}
            className="border rounded-xl p-2 bg-white focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 justify-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2.5 px-6 rounded-xl hover:bg-blue-700 transition-all"
          >
            {editingId ? "Update Property" : "Add Property"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 text-white py-2.5 px-6 rounded-xl hover:bg-gray-500 transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
