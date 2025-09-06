import React from "react";
import TagsInput from "./TagsInput";

const PropertyForm = ({
  newProperty,
  setNewProperty,
  editingId,
  handleSubmit,
  handleCancel,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-5"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {editingId ? "Edit Property" : "Add New Property"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <input
          type="text"
          placeholder="Title"
          value={newProperty.title}
          onChange={(e) =>
            setNewProperty({ ...newProperty, title: e.target.value })
          }
          className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-teal-400 transition"
          required
        />

        <input
          type="number"
          placeholder="Rent"
          value={newProperty.rent}
          onChange={(e) =>
            setNewProperty({ ...newProperty, rent: e.target.value })
          }
          className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-teal-400 transition"
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={newProperty.location}
          onChange={(e) =>
            setNewProperty({ ...newProperty, location: e.target.value })
          }
          className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-teal-400 transition"
          required
        />

        <input
          type="text"
          placeholder="State"
          value={newProperty.state}
          onChange={(e) =>
            setNewProperty({ ...newProperty, state: e.target.value })
          }
          className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-teal-400 transition"
          required
        />

        <input
          type="text"
          placeholder="City"
          value={newProperty.city}
          onChange={(e) =>
            setNewProperty({ ...newProperty, city: e.target.value })
          }
          className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-teal-400 transition"
          required
        />

        <input
          type="file"
          onChange={(e) =>
            setNewProperty({ ...newProperty, image: e.target.files[0] })
          }
          className="border border-gray-300 px-4 py-3 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-teal-400 transition"
          
        />
      </div>

      <textarea
        placeholder="Description"
        value={newProperty.description}
        onChange={(e) =>
          setNewProperty({ ...newProperty, description: e.target.value })
        }
        className="border border-gray-300 px-4 py-3 rounded-lg w-full mt-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-teal-400 transition resize-none"
        rows="4"
        required
      />

      <div className="mt-5">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Tags
        </label>
        <TagsInput
          value={newProperty.tags}
          onChange={(tags) => setNewProperty({ ...newProperty, tags })}
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition cursor-pointer"
        >
          {editingId ? "Update Property" : "Add Property"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg shadow-md transition cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default PropertyForm;
