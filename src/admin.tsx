import { useState, useEffect } from "react";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: "",      // <-- Here you enter product ID manually
    name: "",
    price: "",
    image: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  function handleInput(e) {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  }

  function handleAddProduct(e) {
    e.preventDefault();

    // Convert id and price to numbers before sending to backend
    const productData = {
      id: Number(newProduct.id),
      name: newProduct.name,
      price: Number(newProduct.price),
      image: newProduct.image,
    };

    fetch("http://localhost:8000/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to add product");
        return res.json();
      })
      .then(addedProduct => {
        setProducts(prev => [...prev, addedProduct]);
        setMessage(`Added product: ${addedProduct.name}`);
        setNewProduct({ id: "", name: "", price: "", image: "" });
      })
      .catch(err => setMessage(err.message));
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Add / Update Product</h2>
        <form onSubmit={handleAddProduct} className="flex flex-col gap-4 max-w-md">
          <input
            type="number"
            name="id"
            placeholder="Product ID"
            value={newProduct.id}
            onChange={handleInput}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInput}
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            step="0.01"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInput}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={handleInput}
            required
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add / Update Product
          </button>
        </form>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </section>

      {/* You can add other admin sections here */}
    </div>
  );
}
