import React from 'react'

const FilterBar = ({ search, setSearch, onSearch, onAdd }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 mb-4">

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search..."
        className="border px-3 py-2 rounded-md flex-1"
      />

      <button
        onClick={onSearch}
        className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
      >
        Search
      </button>

      {onAdd && (
        <button
          onClick={onAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          + Add
        </button>
      )}
    </div>
  );
}

export default FilterBar