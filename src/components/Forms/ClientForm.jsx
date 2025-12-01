import { useState, useEffect } from "react";
import { createClient, updateClient } from "../../api/clients"; 

export default function ClientForm({ client, onClose, onSuccess }) {
    const isEditing = Boolean(client);
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (client) {
            setFormData({
                name: client.name || "",
                email: client.email || "",
                phone: client.phone || "",
            });
        }
    }, [client]);

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
                await updateClient(client.id, formData);
            } else {
                await createClient(formData);
            }

            onSuccess();

        } catch (err) {
            console.error("Error saving client:", err);
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
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                <input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    required
                    disabled={loading}
                    className="border px-3 py-2 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1 text-gray-700">Phone</label>
                <input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                    className="border px-3 py-2 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                />
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
                    disabled={loading || !formData.name || !formData.email}
                    className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Saving..." : (isEditing ? "Save changes" : "Create client")}
                </button>
            </div>
        </form>
    );
}