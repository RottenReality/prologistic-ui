import { useEffect, useState } from "react";
import { getClients, deleteClient } from "../../api/clients";
import DataTable from "../../components/Table/DataTable";
import FilterBar from "../../components/Table/FilterBar";
import ClientForm from "../../components/Forms/ClientForm";

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

  const handleSearch = () => {
      fetchClients();
  };

    const handleFormSuccess = () => {
      fetchClients();
      closeForm();
    };

  const handleDelete = async (client) => {
    if (!confirm(`Delete client "${client.name}"?`)) return;

    try {
      await deleteClient(client.id);
      fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const closeForm = () => {
      setOpenForm(false);
      setEditingClient(null); 
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Clients</h1>
      </div>

      <FilterBar
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
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
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
                {editingClient ? "Edit Client" : "Add Client"}
            </h2>
            
            <ClientForm 
                client={editingClient} 
                onSuccess={handleFormSuccess}
                onClose={closeForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}
