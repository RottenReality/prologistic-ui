import { useState, useEffect } from "react";
import { createSeaShipment, updateSeaShipment } from "../../api/seaShipments";

export default function SeaShipmentForm({
  shipment,
  onClose,
  onSuccess,
  masterData,
}) {
  const isEditing = Boolean(shipment);
  const { clients, products, ports } = masterData;

  const [formData, setFormData] = useState({
    client_id: "",
    product_id: "",
    port_id: "",
    quantity: 1,
    register_date: new Date().toISOString().split("T")[0],
    delivery_date: "",
    price: 0,
    fleet_number: "",
    guide_number: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (shipment) {
      setFormData({
        client_id: shipment.client_id,
        product_id: shipment.product_id,
        port_id: shipment.port_id,
        quantity: shipment.quantity,
        register_date: shipment.register_date
          ? shipment.register_date.split("T")[0]
          : "",
        delivery_date: shipment.delivery_date
          ? shipment.delivery_date.split("T")[0]
          : "",
        price: shipment.price,
        fleet_number: shipment.fleet_number,
        guide_number: shipment.guide_number,
      });
    }
  }, [shipment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (
      ["client_id", "product_id", "port_id", "quantity", "price"].includes(name)
    ) {
      newValue = value === "" ? "" : Number(value);
    }
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const dataToSend = {
      ...formData,
      quantity: Number(formData.quantity) || 0,
      price: Number(formData.price) || 0,
    };

    try {
      if (isEditing) {
        await updateSeaShipment(shipment.id, dataToSend);
      } else {
        await createSeaShipment(dataToSend);
      }
      onSuccess();
    } catch (err) {
      console.error("Error saving sea shipment:", err);
      const apiError =
        err.response?.data?.detail || "An unexpected error occurred.";
      setError(apiError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Client</label>
          <select
            name="client_id"
            value={formData.client_id}
            onChange={handleChange}
            required
            disabled={loading}
            className="border px-3 py-2 rounded-md w-full"
          >
            <option value="">Select Client</option>
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
            value={formData.product_id}
            onChange={handleChange}
            required
            disabled={loading}
            className="border px-3 py-2 rounded-md w-full"
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Port (Delivery)
          </label>
          <select
            name="port_id"
            value={formData.port_id}
            onChange={handleChange}
            required
            disabled={loading}
            className="border px-3 py-2 rounded-md w-full"
          >
            <option value="">Select Port</option>
            {ports.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <input
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            type="number"
            min="1"
            required
            disabled={loading}
            className="border px-3 py-2 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Base Price</label>
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            min="0"
            step="0.01"
            required
            disabled={loading}
            className="border px-3 py-2 rounded-md w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t pt-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Fleet Number (Example: ABC1234D)
          </label>
          <input
            name="fleet_number"
            value={formData.fleet_number}
            onChange={handleChange}
            maxLength="8"
            placeholder="ABC1234D"
            required
            disabled={loading}
            className="border px-3 py-2 rounded-md w-full uppercase"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Guide Number (10 chars)
          </label>
          <input
            name="guide_number"
            value={formData.guide_number}
            onChange={handleChange}
            maxLength="10"
            required
            disabled={loading}
            className="border px-3 py-2 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Register Date
          </label>
          <input
            name="register_date"
            value={formData.register_date}
            onChange={handleChange}
            type="date"
            required
            disabled={loading}
            className="border px-3 py-2 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Delivery Date
          </label>
          <input
            name="delivery_date"
            value={formData.delivery_date}
            onChange={handleChange}
            type="date"
            required
            disabled={loading}
            className="border px-3 py-2 rounded-md w-full"
          />
        </div>
      </div>

      {error && (
        <p className="text-red-600 text-sm p-2 bg-red-100 rounded-md">
          {typeof error === "string" ? error : "An error occurred."}
        </p>
      )}

      <div className="flex justify-end gap-3 mt-4 border-t pt-4">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          {loading
            ? "Saving..."
            : isEditing
            ? "Save changes"
            : "Create Shipment"}
        </button>
      </div>
    </form>
  );
}
