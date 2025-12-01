import { useEffect, useState } from "react";
import { getWarehouses, deleteWarehouse } from "../../api/warehouses";
import DataTable from "../../components/Table/DataTable";
import FilterBar from "../../components/Table/FilterBar";
import WarehouseForm from "../../components/Forms/WarehouseForm";

export default function WarehousesList() {
  const [warehouses, setWarehouses] = useState([]);
  const [search, setSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState(null);

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      const response = await getWarehouses({
        name: search,
        location: locationSearch,
      });
      setWarehouses(response.data || []);
    } catch (error) {
      console.error("Error loading warehouses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const handleSearch = () => {
    fetchWarehouses();
  };

  const handleFormSuccess = () => {
    fetchWarehouses();
    closeForm();
  };

  const handleDelete = async (warehouse) => {
    if (!confirm(`Delete warehouse "${warehouse.name}"?`)) return;

    try {
      await deleteWarehouse(warehouse.id);
      fetchWarehouses();
    } catch (error) {
      console.error("Error deleting warehouse:", error);
    }
  };

  const closeForm = () => {
    setOpenForm(false);
    setEditingWarehouse(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Warehouses</h1>
      </div>

      <div className="mb-6 flex space-x-4">
        <FilterBar
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
          onAdd={() => {
            setEditingWarehouse(null);
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
          <p className="text-gray-500 italic">Loading warehouses...</p>
        ) : (
          <DataTable
            columns={[
              { label: "Name", accessor: "name" },
              { label: "Location", accessor: "location" },
            ]}
            data={warehouses}
            actions={{
              edit: (warehouse) => {
                setEditingWarehouse(warehouse);
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
              {editingWarehouse ? "Edit Warehouse" : "Add Warehouse"}
            </h2>

            <WarehouseForm
              warehouse={editingWarehouse}
              onSuccess={handleFormSuccess}
              onClose={closeForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}
