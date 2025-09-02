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
      className="border p-4 rounded mb-6 shadow-md bg-white"
    >
      <h2 className="text-lg font-semibold mb-3">
        {editingId ? "Edit Property" : "Add New Property"}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Title"
          value={newProperty.title}
          onChange={(e) =>
            setNewProperty({ ...newProperty, title: e.target.value })
          }
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Rent"
          value={newProperty.rent}
          onChange={(e) =>
            setNewProperty({ ...newProperty, rent: e.target.value })
          }
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={newProperty.location}
          onChange={(e) =>
            setNewProperty({ ...newProperty, location: e.target.value })
          }
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="State"
          value={newProperty.state}
          onChange={(e) =>
            setNewProperty({ ...newProperty, state: e.target.value })
          }
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="City"
          value={newProperty.city}
          onChange={(e) =>
            setNewProperty({ ...newProperty, city: e.target.value })
          }
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="file"
          onChange={(e) =>
            setNewProperty({ ...newProperty, image: e.target.files[0] })
          }
          className="border px-3 py-2 rounded"
        />
      </div>
      <textarea
        placeholder="Description"
        value={newProperty.description}
        onChange={(e) =>
          setNewProperty({ ...newProperty, description: e.target.value })
        }
        className="border px-3 py-2 rounded w-full mt-3"
        rows="3"
        required
      />

      <div className="mt-3">
        <label className="block text-sm font-medium mb-1">Tags</label>
        <TagsInput
          value={newProperty.tags}
          onChange={(tags) => setNewProperty({ ...newProperty, tags })}
        />
      </div>

      <div className="mt-3 flex space-x-2">
        <button
          
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
        >
          {editingId ? "Update Property" : "Add Property"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default PropertyForm;
