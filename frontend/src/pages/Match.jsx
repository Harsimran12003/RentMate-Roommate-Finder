import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // adjust path based on your folder structure

// Dummy Data
const allMatches = [
  {
    id: 1,
    name: "Aarav Sharma",
    age: 24,
    occupation: "Software Engineer",
    image: "https://via.placeholder.com/150",
    interests: ["Gaming", "Cooking", "Fitness"],
  },
  {
    id: 2,
    name: "Priya Mehta",
    age: 22,
    occupation: "Interior Designer",
    image: "https://via.placeholder.com/150",
    interests: ["Reading", "Yoga", "Photography"],
  },
  {
    id: 3,
    name: "Jennie",
    age: 22,
    occupation: "Interior Designer",
    image: "https://via.placeholder.com/150",
    interests: ["Yoga", "Photography"],
  },
];

const Match = () => {
  const navigate = useNavigate();
  const [occupationFilter, setOccupationFilter] = useState("");
  const [interestFilter, setInterestFilter] = useState("");

  const filteredMatches = allMatches.filter((match) => {
    const occMatch = occupationFilter ? match.occupation === occupationFilter : true;
    const interestMatch = interestFilter
      ? match.interests.includes(interestFilter)
      : true;
    return occMatch && interestMatch;
  });

  const uniqueOccupations = [...new Set(allMatches.map((m) => m.occupation))];
  const uniqueInterests = [...new Set(allMatches.flatMap((m) => m.interests))];

  const getCompatibility = () => Math.floor(Math.random() * 41) + 60;

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#DBEAFE] via-white to-[#EFF6FF]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 py-12 px-6">
        <h1 className="text-4xl font-bold text-center text-[#1E3A8A] mb-10">
          Your Best Matches
        </h1>

        {/* Filters */}
        <div className="max-w-5xl mx-auto mb-8 flex flex-wrap gap-4 justify-center">
          <select
            value={occupationFilter}
            onChange={(e) => setOccupationFilter(e.target.value)}
            className="p-2 rounded-md border border-gray-300"
          >
            <option value="">All Occupations</option>
            {uniqueOccupations.map((occ, i) => (
              <option key={i} value={occ}>
                {occ}
              </option>
            ))}
          </select>

          <select
            value={interestFilter}
            onChange={(e) => setInterestFilter(e.target.value)}
            className="p-2 rounded-md border border-gray-300"
          >
            <option value="">All Interests</option>
            {uniqueInterests.map((int, i) => (
              <option key={i} value={int}>
                {int}
              </option>
            ))}
          </select>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {filteredMatches.map((match) => {
            const score = getCompatibility();

            return (
              <div
                key={match.id}
                className="bg-white rounded-2xl shadow-xl p-6 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex items-center space-x-6">
                  <img
                    src={match.image}
                    alt={match.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-[#3B82F6]"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {match.name}
                    </h2>
                    <p className="text-gray-600">
                      {match.age} • {match.occupation}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {match.interests.map((interest, i) => (
                        <span
                          key={i}
                          className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Compatibility Score */}
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-1">
                    Compatibility Score:
                  </p>
                  <div className="w-full bg-gray-200 h-3 rounded-full">
                    <div
                      className="h-3 bg-blue-500 rounded-full"
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-sm text-gray-600 mt-1">
                    {score}%
                  </p>
                </div>

                <div className="text-right mt-4">
                  <button
                    onClick={() => navigate(`/profile/${match.id}`)}
                    className="bg-[#3B82F6] text-white px-4 py-2 rounded-full hover:bg-[#1E40AF] transition-all duration-300"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Match;
