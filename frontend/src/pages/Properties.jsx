import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import PropertyCard from "../components/PropertyCard";
import PropertyForm from "../components/PropertyForm";
import PropertyFilters from "../components/PropertyFilters";
import PropertyDetails from "../components/PropertyDetails";
import {
  fetchProperties,
  fetchMyProperties,
  addProperty,
  deleteProperty,
  updateProperty,
} from "../services/propertyService";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMy, setViewMy] = useState(false);

  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [newProperty, setNewProperty] = useState({
    title: "",
    description: "",
    state: "",
    city: "",
    rent: "",
    location: "",
    tags: [],
    image: null,
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch properties
  const loadProperties = async (state = "", city = "") => {
    try {
      setLoading(true);
      const data = viewMy
        ? await fetchMyProperties()
        : await fetchProperties(state, city);
      setProperties(data);
      setStateFilter(state);
      setCityFilter(city);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties(stateFilter, cityFilter);
  }, [viewMy]);

  // Delete property
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await deleteProperty(id);
      setProperties(properties.filter((prop) => prop._id !== id));
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  // Add or Update property
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await updateProperty(editingId, newProperty);
        setProperties(
          properties.map((p) => (p._id === editingId ? updated : p))
        );
        setEditingId(null);
      } else {
        const added = await addProperty(newProperty);
        setProperties([...properties, added]);
      }

      setNewProperty({
        title: "",
        description: "",
        state: "",
        city: "",
        rent: "",
        location: "",
        tags: [],
        image: null,
      });
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  // Prefill form on edit
  const handleEdit = (property) => {
    setNewProperty({
      title: property.title,
      description: property.description,
      state: property.state,
      city: property.city,
      rent: property.rent,
      location: property.location,
      tags: Array.isArray(property.tags)
        ? property.tags
        : typeof property.tags === "string"
        ? property.tags.split(",").map((t) => t.trim())
        : [],
      image: null,
    });
    setEditingId(property._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setNewProperty({
      title: "",
      description: "",
      state: "",
      city: "",
      rent: "",
      location: "",
      tags: [],
      image: null,
    });
  };

  const onViewDetails = (id) => {
    setSelectedPropertyId(id);
    setShowDetails(true);
  };

  if (loading) return <p>Loading properties...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8 bg-gradient-to-br from-blue-100 via-white to-blue-50 relative">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Properties
        </h1>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setViewMy(false)}
            className={`px-4 py-2 rounded-lg shadow ${
              !viewMy ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            All Properties
          </button>
          <button
            onClick={() => setViewMy(true)}
            className={`px-4 py-2 rounded-lg shadow ${
              viewMy ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            My Properties
          </button>
        </div>

        {/* Filters */}
        {!viewMy && (
          <PropertyFilters
            onFilter={({ state, city }) => loadProperties(state, city)}
          />
        )}

        {/* Form */}
        {viewMy && (
          <PropertyForm
            newProperty={newProperty}
            setNewProperty={setNewProperty}
            editingId={editingId}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
          />
        )}

        {/* Cards */}
        {properties.length === 0 ? (
          <p className="text-center text-gray-600">No properties found.</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                viewMy={viewMy}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onViewDetails={() => onViewDetails(property._id)}
              />
            ))}
          </div>
        )}

        {/* Side Drawer */}
        {showDetails && selectedPropertyId && (
          <PropertyDetails
            propertyId={selectedPropertyId}
            onClose={() => setShowDetails(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Properties;
