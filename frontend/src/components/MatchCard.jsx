import React from "react";

const MatchCard = ({ match, onViewProfile }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-center space-x-6">
        <img
          src={
            match.profilePhoto
              ? match.profilePhoto.startsWith("http")
                ? match.profilePhoto
                : `http://localhost:5000${match.profilePhoto}`
              : "https://via.placeholder.com/150"
          }
          alt={match.fullName}
          className="w-24 h-24 rounded-full object-cover border-4 border-[#3B82F6]"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {match.fullName}
          </h2>
          <p className="text-gray-600">
            {match.age ?? "-"} • {match.occupation ?? "-"}
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {(match.hobbies || []).map((h, i) => (
              <span
                key={`h-${i}`}
                className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
              >
                {h}
              </span>
            ))}
            {(match.habits || []).map((hb, i) => (
              <span
                key={`hb-${i}`}
                className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
              >
                {hb}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500 mb-1">Compatibility Score:</p>
        <div className="w-full bg-gray-200 h-3 rounded-full">
          <div
            className="h-3 bg-blue-500 rounded-full"
            style={{ width: `${match.score}%` }}
          />
        </div>
        <p className="text-right text-sm text-gray-600 mt-1">
          {match.score}%
        </p>
      </div>

      <div className="text-right mt-4">
        <button
          onClick={() => onViewProfile(match)}
          className="bg-[#3B82F6] text-white px-4 py-2 rounded-full hover:bg-[#1E40AF] transition-all duration-300 cursor-pointer"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
