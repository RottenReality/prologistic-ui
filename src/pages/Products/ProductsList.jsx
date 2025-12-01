import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../api/products";
import DataTable from "../../components/Table/DataTable";
import FilterBar from "../../components/Table/FilterBar";
import ProductForm from "../../components/Forms/ProductForm";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [openForm, setOpenForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts({ name: search });
      setProducts(response.data || []);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = () => {
    fetchProducts();
  };

  const handleFormSuccess = () => {
    fetchProducts();
    closeForm();
  };

  const handleDelete = async (product) => {
    if (!confirm(`Delete product "${product.name}"?`)) return;

    try {
      await deleteProduct(product.id);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const closeForm = () => {
    setOpenForm(false);
    setEditingProduct(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
      </div>

      <FilterBar
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
        onAdd={() => {
          setEditingProduct(null);
          setOpenForm(true);
        }}
      />

      <div className="bg-white p-4 shadow rounded-md">
        {loading ? (
          <p className="text-gray-500 italic">Loading products...</p>
        ) : (
          <DataTable
            columns={[
              { label: "Name", accessor: "name" },
              { label: "Description", accessor: "description" },
            ]}
            data={products}
            actions={{
              edit: (product) => {
                setEditingProduct(product);
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
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>

            <ProductForm
              product={editingProduct}
              onSuccess={handleFormSuccess}
              onClose={closeForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}
