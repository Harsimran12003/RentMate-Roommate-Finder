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
  const [activeTab, setActiveTab] = useState("all");

  const loadProperties = async (state = "", city = "") => {
    try {
      setLoading(true);
      let data = [];
      if (activeTab === "my") data = await fetchMyProperties();
      else data = await fetchProperties(state, city);
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
  }, [activeTab]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await deleteProperty(id);
      setProperties(properties.filter((prop) => prop._id !== id));
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

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
        if (activeTab === "my") setProperties([...properties, added]);
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
      setActiveTab("my");
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

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
    setActiveTab("add");
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

  if (loading) return <p className="text-center mt-10">Loading properties...</p>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-100 via-white to-blue-50">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-10">
          Properties
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
          {["all", "my", "add"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg shadow font-medium transition-all ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {tab === "all"
                ? "All Properties"
                : tab === "my"
                ? "My Properties"
                : "Add Property"}
            </button>
          ))}
        </div>

        {/* Filters */}
        {activeTab === "all" && (
          <div className="mb-6">
            <PropertyFilters onFilter={({ state, city }) => loadProperties(state, city)} />
          </div>
        )}

        {/* Add / Edit Form */}
        {activeTab === "add" && (
          <div className="mb-8">
            <PropertyForm
              newProperty={newProperty}
              setNewProperty={setNewProperty}
              editingId={editingId}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
            />
          </div>
        )}

        {/* Property Cards */}
        {(activeTab === "all" || activeTab === "my") && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {properties.length === 0 ? (
              <p className="col-span-full text-center text-gray-600">
                No properties found.
              </p>
            ) : (
              properties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  viewMy={activeTab === "my"}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onViewDetails={() => onViewDetails(property._id)}
                />
              ))
            )}
          </div>
        )}

        {/* Details Drawer */}
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
