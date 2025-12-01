// src/pages/LandShipments/LandShipmentsList.jsx

import { useEffect, useState, useCallback } from "react";
import { getLandShipments, deleteLandShipment } from "../../api/landShipments";
import DataTable from "../../components/Table/DataTable";
import { getClients } from "../../api/clients";
import { getProducts } from "../../api/products";
import { getWarehouses } from "../../api/warehouses";
import LandShipmentForm from "../../components/Forms/LandShipmentForm";

export default function LandShipmentsList() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filtros
  const [filters, setFilters] = useState({
    client_id: "",
    product_id: "",
    warehouse_id: "",
    plate: "",
    guide_number: "",
    date_from: "",
    date_to: "",
  });

  // Maestros
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [masterDataLoaded, setMasterDataLoaded] = useState(false);

  const [openForm, setOpenForm] = useState(false);
  const [editingShipment, setEditingShipment] = useState(null);

  // Función auxiliar de formateo (reutilizada dentro de fetchShipments)
  const formatDateString = (dateString) => {
    if (!dateString) return "";
    // Soporta tanto "YYYY-MM-DD" como "YYYY-MM-DDT..."
    const datePart = dateString.split("T")[0];
    const [year, month, day] = datePart.split("-");
    return `${day}/${month}/${year}`;
  };

  const fetchShipments = async () => {
    if (!masterDataLoaded) return;

    try {
      setLoading(true);
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "" && v !== null)
      );

      const response = await getLandShipments(cleanFilters);
      const rawData = response.data || [];

      // SOLUCIÓN: Pre-formatear los datos para que DataTable pueda usar 'accessor'
      const formattedData = rawData.map((item) => ({
        ...item,
        // Creamos campos de texto simples para la tabla
        register_date_fmt: formatDateString(item.register_date),
        delivery_date_fmt: formatDateString(item.delivery_date),
        // Aseguramos que los números se vean bien
        final_price_fmt: item.final_price ? `$${item.final_price}` : "$0",
      }));

      setShipments(formattedData);
    } catch (error) {
      console.error("Error loading land shipments:", error);
    } finally {
      setLoading(false);
    }
  };

  // 1. Carga inicial de Maestros
  useEffect(() => {
    const loadMasterData = async () => {
      try {
        const [clientsRes, productsRes, warehousesRes] = await Promise.all([
          getClients(),
          getProducts(),
          getWarehouses(),
        ]);
        setClients(clientsRes.data || []);
        setProducts(productsRes.data || []);
        setWarehouses(warehousesRes.data || []);
      } catch (error) {
        console.error("Error loading master data:", error);
      } finally {
        setMasterDataLoaded(true);
      }
    };
    loadMasterData();
  }, []);

  // 2. Carga inicial de Envíos
  useEffect(() => {
    if (masterDataLoaded) {
      fetchShipments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [masterDataLoaded]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSuccess = () => {
    fetchShipments();
    closeForm();
  };

  const handleDelete = async (shipment) => {
    if (!confirm(`Delete shipment #${shipment.guide_number}?`)) return;
    try {
      await deleteLandShipment(shipment.id);
      fetchShipments();
    } catch (error) {
      console.error("Error deleting shipment:", error);
    }
  };

  const closeForm = () => {
    setOpenForm(false);
    setEditingShipment(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Land Shipments</h1>

      {/* --- BARRA DE FILTROS --- */}
      <div className="bg-white p-4 shadow rounded-md mb-6 border border-blue-100">
        <h3 className="font-medium mb-3">Filter Shipments</h3>
        <div className="grid grid-cols-4 gap-4 items-end">
          {/* Selectors */}
          <div>
            <label className="block text-sm font-medium mb-1">Client</label>
            <select
              name="client_id"
              value={filters.client_id}
              onChange={handleFilterChange}
              className="w-full border p-2 rounded-md"
            >
              <option value="">All Clients</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Product</label>
            <select
              name="product_id"
              value={filters.product_id}
              onChange={handleFilterChange}
              className="w-full border p-2 rounded-md"
            >
              <option value="">All Products</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Warehouse</label>
            <select
              name="warehouse_id"
              value={filters.warehouse_id}
              onChange={handleFilterChange}
              className="w-full border p-2 rounded-md"
            >
              <option value="">All Warehouses</option>
              {warehouses.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>

          {/* Inputs */}
          <div>
            <label className="block text-sm font-medium mb-1">Plate</label>
            <input
              type="text"
              name="plate"
              value={filters.plate}
              onChange={handleFilterChange}
              placeholder="Vehicle Plate"
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Guide Number
            </label>
            <input
              type="text"
              name="guide_number"
              value={filters.guide_number}
              onChange={handleFilterChange}
              placeholder="Guide Number"
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date From</label>
            <input
              type="date"
              name="date_from"
              value={filters.date_from}
              onChange={handleFilterChange}
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date To</label>
            <input
              type="date"
              name="date_to"
              value={filters.date_to}
              onChange={handleFilterChange}
              className="w-full border p-2 rounded-md"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-2">
            <button
              onClick={fetchShipments}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Search
            </button>
            <button
              onClick={() => {
                setEditingShipment(null);
                setOpenForm(true);
              }}
              className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* --- TABLA DE DATOS --- */}
      <div className="bg-white p-4 shadow rounded-md overflow-x-auto">
        {loading ? (
          <p className="text-gray-500 italic">Loading shipments...</p>
        ) : (
          <DataTable
            columns={[
              { label: "Guide No.", accessor: "guide_number" },
              { label: "Client ID", accessor: "client_id" },
              { label: "Product ID", accessor: "product_id" },
              { label: "Warehouse ID", accessor: "warehouse_id" },
              { label: "Plate", accessor: "plate" },
              { label: "Qty", accessor: "quantity" },
              // AHORA USAMOS LOS CAMPOS _fmt QUE CREAMOS
              { label: "Reg. Date", accessor: "register_date_fmt" },
              { label: "Del. Date", accessor: "delivery_date_fmt" },

              { label: "Price", accessor: "price" },
              { label: "Disc.", accessor: "discount" },
              { label: "Final Price", accessor: "final_price" }, // o final_price_fmt si prefieres con símbolo
            ]}
            data={shipments}
            actions={{
              edit: (shipment) => {
                setEditingShipment(shipment);
                setOpenForm(true);
              },
              delete: handleDelete,
            }}
          />
        )}
      </div>

      {/* Modal */}
      {openForm && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">
              {editingShipment
                ? "Edit Land Shipment"
                : "Register Land Shipment"}
            </h2>

            <LandShipmentForm
              shipment={editingShipment}
              onSuccess={handleFormSuccess}
              onClose={closeForm}
              masterData={{ clients, products, warehouses }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
