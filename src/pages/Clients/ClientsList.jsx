import { useEffect, useState } from "react";
import { getClients, deleteClient } from "../../api/clients";
import DataTable from "../../components/Table/DataTable";
import FilterBar from "../../components/Table/FilterBar";

export default function ClientsList() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [openForm, setOpenForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await getClients({ name: search });
      setClients(response.data || []);
    } catch (error) {
      console.error("Error loading clients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (client) => {
    if (!confirm(`Delete client "${client.name}"?`)) return;

    try {
      await deleteClient(client.id);
      fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Clients</h1>
      </div>

      <FilterBar
        search={search}
        setSearch={setSearch}
        onSearch={fetchClients}
        onAdd={() => {
          setEditingClient(null);
          setOpenForm(true);
        }}
      />

      <div className="bg-white p-4 shadow rounded-md">
        {loading ? (
          <p className="text-gray-500 italic">Loading clients...</p>
        ) : (
          <DataTable
            columns={[
              { label: "Name", accessor: "name" },
              { label: "Email", accessor: "email" },
              { label: "Phone", accessor: "phone" },
            ]}
            data={clients}
            actions={{
              edit: (client) => {
                setEditingClient(client);
                setOpenForm(true);
              },
              delete: handleDelete,
            }}
          />
        )}
      </div>

      {openForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingClient ? "Edit Client" : "Add Client"}
            </h2>

            <p className="text-gray-500">
              Form
            </p>

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
