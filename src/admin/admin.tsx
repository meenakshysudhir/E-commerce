import React, { useState } from "react";
import axios from "axios";

type ProductFormData = {
  id: number | "";
  name: string;
  price: number | "";
  image: string;
  quantity: number | "";
};

export default function ProductForm() {
  const [formData, setFormData] = useState<ProductFormData>({
    id: "",
    name: "",
    price: "",
    image: "",
    quantity: "",
  });

  const [message, setMessage] = useState<string>("");

  // Handle input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    // For numeric fields convert to number or empty string
    if (["id", "price", "quantity"].includes(name)) {
      setFormData(prev => ({
        ...prev,
        [name]: value === "" ? "" : Number(value),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  // On form submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Basic validation: all fields required
    if (
      formData.id === "" ||
      !formData.name ||
      formData.price === "" ||
      !formData.image ||
      formData.quantity === ""
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/admin/products", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage(`Product added: ${response.data.name}`);
      setFormData({ id: "", name: "", price: "", image: "", quantity: "" });
    } catch (error: any) {
      setMessage(
        error.response?.data?.detail || "Failed to add product. Try again."
      );
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow">
      <h2 className="text-2xl mb-4 font-semibold">Add New Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="number"
          name="id"
          placeholder="Product ID"
          value={formData.id}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
