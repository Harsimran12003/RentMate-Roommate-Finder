import { useState } from "react";

export default function PropertyFilters({ onFilter }) {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const handleFilter = (e) => {
    e.preventDefault();
    onFilter({ state: state.toLowerCase(), city: city.toLowerCase() });
  };

  const handleClear = () => {
    setState("");
    setCity("");
    onFilter({ state: "", city: "" });
  };

  return (
    <form
      onSubmit={handleFilter}
      className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-8 w-full px-4"
    >
      {/* State Input */}
      <input
        type="text"
        placeholder="Filter by State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="border border-gray-300 px-3 py-2 rounded-lg w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* City Input */}
      <input
        type="text"
        placeholder="Filter by City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border border-gray-300 px-3 py-2 rounded-lg w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Apply Button */}
      <button
        type="submit"
        className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg"
      >
        Apply
      </button>

      {/* Clear Button */}
      <button
        type="button"
        onClick={handleClear}
        className="w-full sm:w-auto px-4 py-2 bg-gray-500 hover:bg-gray-600 transition text-white rounded-lg"
      >
        Clear
      </button>
    </form>
  );
}
