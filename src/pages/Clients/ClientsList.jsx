import React from 'react'
import { useState } from "react";

const ClientsList = () => {
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Clients</h1>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={() => setOpenForm(true)}
        >
          + Add Client
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search client..."
          className="border px-3 py-2 rounded-md w-full max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white p-4 shadow rounded-md">
        <p className="text-gray-500 italic">Clients table</p>
      </div>

      {openForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-200 bg-opacity-40">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Client Form</h2>
            <p className="text-gray-500">Form</p>

            <button
              className="mt-4 text-sm px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
              onClick={() => setOpenForm(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientsList