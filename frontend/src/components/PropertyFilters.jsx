import { useState } from "react";

export default function PropertyFilters({ onFilter }) {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const handleFilter = (e) => {
    e.preventDefault();
    onFilter({ state, city });
  };

  const handleClear = () => {
    setState("");
    setCity("");
    onFilter({ state: "", city: "" });
  };

  return (
    <form onSubmit={handleFilter} className="flex justify-center space-x-2 mb-8">
      <input
        type="text"
        placeholder="Filter by State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="border px-3 py-2 rounded w-40"
      />
      <input
        type="text"
        placeholder="Filter by City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border px-3 py-2 rounded w-40"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
      >
        Apply
      </button>
      <button
        type="button"
        onClick={handleClear}
        className="px-4 py-2 bg-gray-500 text-white rounded-lg cursor-pointer"
      >
        Clear
      </button>
    </form>
  );
}
