import React, { useState } from "react";
import { Trash2 } from "lucide-react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2499,
    quantity: 1,
    image: "https://via.placeholder.com/80?text=Headphones",
  },
  {
    id: 2,
    name: "Smartwatch",
    price: 4999,
    quantity: 2,
    image: "https://via.placeholder.com/80?text=Smartwatch",
  },
];

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: number, amount: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500 text-xl py-20">
          Your cart is empty
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between bg-white p-5 rounded-2xl shadow-sm border border-gray-100 gap-6"
              >
                <div className="flex items-center gap-5 w-full md:w-2/3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-xl object-cover border"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      ₹{item.price.toLocaleString()} each
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 text-lg rounded-full bg-gray-200 hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="text-md font-medium text-gray-700">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 text-lg rounded-full bg-gray-200 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-5">
                  <p className="text-md font-semibold text-green-600">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-600"
                    title="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-inner">
            <h2 className="text-2xl font-bold text-gray-800">
              Total: ₹{totalPrice.toLocaleString()}
            </h2>
            <button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-semibold transition-all">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
