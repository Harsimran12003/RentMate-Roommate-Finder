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

  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      const cityOk = cityFilter ? m.city === cityFilter : true;
      const genderOk = genderFilter ? m.gender === genderFilter : true;
      return cityOk && genderOk;
    });
  }, [matches, cityFilter, genderFilter]);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#DBEAFE] via-white to-[#EFF6FF]">
      <Sidebar />

      <div className="flex-1 py-12 px-6">
        <h1 className="text-4xl font-bold text-center text-[#1E3A8A] mb-10">
          Your Best Matches
        </h1>

        {!currentUser ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <>
            {/* Filters */}
            <div className="max-w-5xl mx-auto mb-8 flex flex-wrap gap-4 justify-center">
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="p-2 rounded-md border border-gray-300"
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
                className="p-2 rounded-md border border-gray-300"
              >
                <option value="">All Genders</option>
                {uniqueGenders.map((g, i) => (
                  <option key={i} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {filteredMatches.map((match) => (
                <MatchCard
                  key={match._id}
                  match={match}
                  onViewProfile={setSelectedMatch}
                />
              ))}

              {filteredMatches.length === 0 && (
                <p className="col-span-full text-center text-gray-600">
                  No matches found for the selected filters.
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Profile Pane */}
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
