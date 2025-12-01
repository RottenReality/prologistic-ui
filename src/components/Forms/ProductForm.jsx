import { useState, useEffect } from "react";
import { createProduct, updateProduct } from "../../api/products"; 

export default function ProductForm({ product, onClose, onSuccess }) {
  const isEditing = Boolean(product);
  
  const [formData, setFormData] = useState({
      name: "",
      description: "", 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
      if (product) {
          setFormData({
              name: product.name || "",
              description: product.description || "",
          });
      }
  }, [product]);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setError(null);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      
      try {
          if (isEditing) {
              await updateProduct(product.id, formData); 
          } else {
              await createProduct(formData);
          }

          onSuccess();
      } catch (err) {
          console.error("Error saving product:", err);
          const apiError = err.response?.data?.detail || "An unexpected error occurred. Check console.";
          setError(apiError);
      } finally {
          setLoading(false);
      }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700">Name</label>
          <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="border px-3 py-2 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
          />
      </div>

      <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1 text-gray-700">Description</label>
          <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              disabled={loading}
              className="border px-3 py-2 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
      </div>
      
      {error && (
          <p className="text-red-600 text-sm p-2 bg-red-100 rounded-md border border-red-200">
              Error: {typeof error === 'string' ? error : "An error occurred."}
          </p>
      )}

      <div className="flex justify-end gap-3 mt-4">
          <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
              Cancel
          </button>

          <button
              type="submit"
              disabled={loading || !formData.name}
              className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
              {loading ? "Saving..." : (isEditing ? "Save changes" : "Create Product")}
          </button>
      </div>
    </form>
  );
}