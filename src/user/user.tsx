
// import React, { useState, useEffect } from "react";
// import { ShoppingCart } from "lucide-react";
// import axios from "axios";

// // Types
// type Product = {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
// };

// // Static userId for this example (in real use, get from login/session)
// const userId = "user123";

// const User = () => {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     axios.get("http://127.0.0.1:8000/products")
//       .then((response) => setProducts(response.data))
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);

//   const addToCart = (product: Product) => {
//     axios.post("http://127.0.0.1:8000/cart/add", {
//       product_id: product.id,
//       user_id: userId
//     })
//     .then((response) => {
//       alert(`${product.name} added to cart!`);
//     })
//     .catch((error) => {
//       console.error("Error adding to cart:", error);
//       alert("Failed to add to cart.");
//     });
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-4xl font-bold mb-8 text-gray-800">Shop Products 🛍️</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="bg-white p-4 rounded-2xl shadow-md border hover:shadow-lg transition"
//           >
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-48 object-cover rounded-xl mb-4"
//             />
//             <h2 className="text-lg font-semibold text-gray-900">
//               {product.name}
//             </h2>
//             <p className="text-green-600 font-bold text-md mb-4">
//               ₹{product.price.toLocaleString()}
//             </p>
//             <button
//               onClick={() => addToCart(product)}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2"
//             >
//               <ShoppingCart className="w-4 h-4" /> Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default User;
import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import axios from "axios";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;  // This will now be a Cloudinary URL from backend
};

const User = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch:", err));
  }, []);

  const addToCart = async (productId: number) => {
    try {
      await axios.post("http://127.0.0.1:8000/cart/add", { product_id: productId });
      alert("Product added to cart!");
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("Failed to add to cart.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Shop Products 🛍️</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-2xl shadow-md border">
            <img
              src={product.image}  // Use Cloudinary URL directly
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
            <p className="text-green-600 font-bold text-md mb-4">₹{product.price}</p>
            <button
              onClick={() => addToCart(product.id)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
