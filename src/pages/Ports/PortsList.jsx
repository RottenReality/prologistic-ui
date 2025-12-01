// src/pages/Ports/PortsList.jsx

import { useEffect, useState } from "react";
import { getPorts, deletePort } from "../../api/ports";
import DataTable from "../../components/Table/DataTable";
import FilterBar from "../../components/Table/FilterBar";
import PortForm from "../../components/Forms/PortForm";

export default function PortsList() {
  const [ports, setPorts] = useState([]);
  const [search, setSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [editingPort, setEditingPort] = useState(null);

  const fetchPorts = async () => {
    try {
      setLoading(true);
      const response = await getPorts({
        name: search,
        location: locationSearch,
      });
      setPorts(response.data || []);
    } catch (error) {
      console.error("Error loading ports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPorts();
  }, []);

  const handleSearch = () => {
    fetchPorts();
  };

  const handleFormSuccess = () => {
    fetchPorts();
    closeForm();
  };

  const handleDelete = async (port) => {
    if (!confirm(`Delete port "${port.name}"?`)) return;

    try {
      await deletePort(port.id);
      fetchPorts();
    } catch (error) {
      console.error("Error deleting port:", error);
    }
  };

  const closeForm = () => {
    setOpenForm(false);
    setEditingPort(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Ports</h1>
      </div>

      <div className="mb-6 flex space-x-4">
        <FilterBar
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
          onAdd={() => {
            setEditingPort(null);
            setOpenForm(true);
          }}
        />

        <div className="flex items-start space-x-2">
          <input
            type="text"
            placeholder="Filter by Location..."
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm w-48"
          />
          <button
            onClick={handleSearch}
            className="p-2 rounded-md bg-green-600 text-white hover:bg-green-700"
          >
            Search Location
          </button>
        </div>
      </div>

      <div className="bg-white p-4 shadow rounded-md">
        {loading ? (
          <p className="text-gray-500 italic">Loading ports...</p>
        ) : (
          <DataTable
            columns={[
              { label: "Name", accessor: "name" },
              { label: "Location", accessor: "location" },
            ]}
            data={ports}
            actions={{
              edit: (port) => {
                setEditingPort(port);
                setOpenForm(true);
              },
              delete: handleDelete,
            }}
          />
        )}
      </div>

      {openForm && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingPort ? "Edit Port" : "Add Port"}
            </h2>

            <PortForm
              port={editingPort}
              onSuccess={handleFormSuccess}
              onClose={closeForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}
