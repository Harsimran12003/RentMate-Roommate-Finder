import { getMatchesForUser } from "../services/matchService.js";

export const getMatches = async (req, res) => {
  try {
    const { userId } = req.params;            
    const matches = await getMatchesForUser(userId);
    res.json(matches);
  } catch (err) {
    res.status(400).json({ message: err.message || "Unable to fetch matches" });
  }
};
