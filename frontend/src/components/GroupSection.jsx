import React, { useState } from "react";

const GroupSection = ({
  groups,
  setGroups,
  selectedGroup,
  setSelectedGroup,
  currentUser,
  createGroup,
  deleteGroup,
  searchUsers,
}) => {
  const [newGroupName, setNewGroupName] = useState("");
  const [newMembers, setNewMembers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    const results = await searchUsers(query);
    setSearchResults(results);
  };

  const addMember = (user) => {
    if (!newMembers.includes(user.fullName)) {
      setNewMembers([...newMembers, user.fullName]);
    }
    setSearchResults([]);
  };

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return;
    const group = await createGroup({
      name: newGroupName,
      members: [currentUser.fullName, ...newMembers],
    });
    setGroups([...groups, group]);
    setSelectedGroup(group._id);
    setNewGroupName("");
    setNewMembers([]);
  };

  const handleDeleteGroup = async () => {
    if (!selectedGroup) return;
    if (!window.confirm("Are you sure you want to delete this group?")) return;
    await deleteGroup(selectedGroup);
    setGroups(groups.filter((g) => g._id !== selectedGroup));
    setSelectedGroup(null);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 mb-10">
      <h2 className="text-xl font-semibold mb-4 text-[#0D47A1]">Groups</h2>
      {!selectedGroup ? (
        <div>
          <input
            type="text"
            placeholder="New Group Name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className="border p-2 rounded-lg w-full mb-3"
          />
          <input
            type="text"
            placeholder="Search members..."
            onChange={(e) => handleSearch(e.target.value)}
            className="border p-2 rounded-lg w-full mb-2"
          />
          {searchResults.length > 0 && (
            <ul className="border bg-white rounded-lg max-h-40 overflow-y-auto mb-2">
              {searchResults.map((user) => (
                <li
                  key={user._id}
                  onClick={() => addMember(user)}
                  className="p-2 hover:bg-blue-100 cursor-pointer"
                >
                  {user.fullName} ({user.email})
                </li>
              ))}
            </ul>
          )}
          {newMembers.length > 0 && (
            <div className="mb-2">
              <p className="font-medium">Selected Members:</p>
              <div className="flex flex-wrap gap-2">
                {newMembers.map((m) => (
                  <span
                    key={m}
                    className="bg-blue-200 text-blue-800 px-3 py-1 rounded-lg"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
          <button
            onClick={handleCreateGroup}
            className="px-4 py-2 bg-[#1565C0] text-white rounded-lg mt-2 cursor-pointer hover:bg-[#0D47A1] transition"
          >
            Create Group
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="border p-2 rounded-lg"
          >
            {groups.map((g) => (
              <option key={g._id} value={g._id}>
                {g.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleDeleteGroup}
            className="ml-3 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
          >
            Delete Group
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupSection;
