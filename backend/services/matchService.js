// services/matchService.js
import User from "../models/User.js";

/** Turn hobbies into an array (your model stores a String) */
const toArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  // comma/pipe/semicolon separated allowed
  return String(val)
    .split(/[,;|]/)
    .map(s => s.trim())
    .filter(Boolean);
};

const intersect = (a, b) => {
  const setB = new Set((b || []).map(x => x.toLowerCase()));
  return (a || []).filter(x => setB.has(x.toLowerCase()));
};

/**
 * Compute compatibility with priority:
 *  - Hobbies + Habits: up to 70 pts total (10 per shared item, capped)
 *  - City bonus: +30 pts if same city
 */
export const computeCompatibility = (user, other) => {
  const userHobbies = toArray(user.hobbies);
  const otherHobbies = toArray(other.hobbies);

  const userHabits = Array.isArray(user.habits) ? user.habits : toArray(user.habits);
  const otherHabits = Array.isArray(other.habits) ? other.habits : toArray(other.habits);

  const sharedHobbies = intersect(userHobbies, otherHobbies);
  const sharedHabits = intersect(userHabits, otherHabits);

  const hobbyScore = Math.min(sharedHobbies.length * 10, 40); // up to 40
  const habitScore = Math.min(sharedHabits.length * 10, 30);  // up to 30
  const hhScore = hobbyScore + habitScore;                    // up to 70

  const cityBonus = (user.city && other.city && user.city.trim().toLowerCase() === other.city.trim().toLowerCase())
    ? 30 : 0;

  return Math.min(hhScore + cityBonus, 100);
};

/** Get matches for a userId */
export const getMatchesForUser = async (userId) => {
  const currentUser = await User.findById(userId);
  if (!currentUser) throw new Error("User not found");

  const others = await User.find({ _id: { $ne: userId } });

  const matches = others.map(o => {
    const score = computeCompatibility(currentUser, o);

    // Normalize hobbies to array for the frontend UI
    const hobbiesArray = toArray(o.hobbies);
    return {
      _id: o._id,
      fullName: o.fullName,
      age: o.age,
      occupation: o.occupation,
      profilePhoto: o.profilePhoto,
      city: o.city,
      gender: o.gender,
      hobbies: hobbiesArray,
      habits: Array.isArray(o.habits) ? o.habits : toArray(o.habits),
      score,
    };
  });

  // Sort by score desc
  matches.sort((a, b) => b.score - a.score);
  return matches;
};
