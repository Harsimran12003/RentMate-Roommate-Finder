import React, { useEffect, useMemo, useState } from "react";
import { getMatches } from "../services/matchService";
import { getUserProfile } from "../services/profileService";
import Sidebar from "../components/Sidebar";
import { AnimatePresence } from "framer-motion";
import MatchCard from "../components/MatchCard";
import ProfilePane from "../components/ProfilePane";

const Match = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const user = await getUserProfile(token);
        setCurrentUser(user);

        const data = await getMatches(user._id, token);
        setMatches(data);
      } catch (err) {
        console.error("Match load error:", err);
      }
    };
    load();
  }, []);

  const uniqueCities = useMemo(
    () => [...new Set(matches.map((m) => m.city).filter(Boolean))],
    [matches]
  );

  const uniqueGenders = useMemo(
    () => [...new Set(matches.map((m) => m.gender).filter(Boolean))],
    [matches]
  );

  // Apply filters
  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      const cityOk = cityFilter ? m.city === cityFilter : true;
      const genderOk = genderFilter ? m.gender === genderFilter : true;
      const nameOk = nameFilter
        ? m.fullName?.toLowerCase().includes(nameFilter.toLowerCase())
        : true;
      return cityOk && genderOk && nameOk;
    });
  }, [matches, cityFilter, genderFilter, nameFilter]);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#DBEAFE] via-white to-[#EFF6FF]">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 py-8 px-4 sm:px-6 md:px-8 overflow-x-hidden">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#1E3A8A] mb-8 sm:mb-10">
          Your Best Matches
        </h1>

        {!currentUser ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <>
            {/* Filters Section */}
            <div className="max-w-6xl mx-auto mb-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center">
              <input
                type="text"
                placeholder="Search by name..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="w-full sm:w-56 p-2 sm:p-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-sm sm:text-base"
              />

              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full sm:w-44 p-2 sm:p-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-sm sm:text-base"
              >
                <option value="">All Cities</option>
                {uniqueCities.map((city, i) => (
                  <option key={i} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="w-full sm:w-44 p-2 sm:p-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-sm sm:text-base"
              >
                <option value="">All Genders</option>
                {uniqueGenders.map((g, i) => (
                  <option key={i} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Match Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {filteredMatches.length > 0 ? (
                filteredMatches.map((match) => (
                  <MatchCard
                    key={match._id}
                    match={match}
                    onViewProfile={setSelectedMatch}
                  />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-600">
                  No matches found for the selected filters.
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Profile Side Panel */}
      <AnimatePresence>
        {selectedMatch && (
          <ProfilePane
            match={selectedMatch}
            onClose={() => setSelectedMatch(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Match;
