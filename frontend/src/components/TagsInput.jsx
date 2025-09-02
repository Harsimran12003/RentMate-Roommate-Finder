import { useState } from "react";

export default function TagsInput({ value = [], onChange }) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="border border-gray-300 rounded-lg p-2 flex flex-wrap gap-2">
      {value.map((tag, i) => (
        <span
          key={i}
          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
        >
          {tag}
          <button
            type="button"
            className="text-red-500 hover:text-red-700"
            onClick={() => removeTag(tag)}
          >
            ✕
          </button>
        </span>
      ))}
      <input
        type="text"
        className="flex-1 outline-none p-1 text-sm"
        placeholder="Type and press Enter..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
