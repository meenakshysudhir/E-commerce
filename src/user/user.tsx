
// import React, { useState, useEffect } from "react";
// import { ShoppingCart } from "lucide-react";
// import axios from "axios";

// type Product = {
//   id: number;
//   name: string;
//   price: number;
//   image: string;  // This will now be a Cloudinary URL from backend
// };

// const User = () => {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     axios.get("http://127.0.0.1:8000/products")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Failed to fetch:", err));
//   }, []);

//   const addToCart = async (productId: number) => {
//     try {
//       await axios.post("http://127.0.0.1:8000/cart/add", { product_id: productId });
//       alert("Product added to cart!");
//     } catch (err) {
//       console.error("Add to cart failed:", err);
//       alert("Failed to add to cart.");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-4xl font-bold mb-8 text-gray-800">Shop Products 🛍️</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <div key={product.id} className="bg-white p-4 rounded-2xl shadow-md border">
//             <img
//               src={product.image}  // Use Cloudinary URL directly
//               alt={product.name}
//               className="w-full h-48 object-cover rounded-xl mb-4"
//             />
//             <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
//             <p className="text-green-600 font-bold text-md mb-4">₹{product.price}</p>
//             <button
//               onClick={() => addToCart(product.id)}
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
import { ShoppingCart, Star, StarHalf, StarOff } from "lucide-react";
import axios from "axios";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  rating?: number; // optional since we're adding it locally
};

// ⭐ Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex items-center text-yellow-400 mb-2">
      {[...Array(full)].map((_, i) => (
        <Star key={`full-${i}`} fill="currentColor" stroke="none" className="w-4 h-4" />
      ))}
      {half && <StarHalf key="half" fill="currentColor" stroke="none" className="w-4 h-4" />}
      {[...Array(empty)].map((_, i) => (
        <StarOff key={`empty-${i}`} className="w-4 h-4" />
      ))}
    </div>
  );
};

const User = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/products")
      .then((res) => {
        // Assign random rating to each product
        const ratedProducts = res.data.map((product: Product) => ({
          ...product,
          rating: getRandomRating(),
        }));
        setProducts(ratedProducts);
      })
      .catch((err) => console.error("Failed to fetch:", err));
  }, []);

  const getRandomRating = () => {
    const ratings = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
    return ratings[Math.floor(Math.random() * ratings.length)];
  };

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
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
            <StarRating rating={product.rating || 0} />
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
