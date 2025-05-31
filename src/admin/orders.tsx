import React, { useEffect, useState } from "react";
import axios from "axios";

type OrderItem = {
  product_id?: number;
  product_name?: string;
  quantity: number;
  unit_price?: number;
  total_amount?: number;
  id?: number;
  amount?: number;
};

type Order = {
  order_id: string;
  items: OrderItem[];
  total_amount: number;
  created_at: string;
};

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8000/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      {orders.map((order, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-xl p-4 mb-6 shadow-sm"
        >
          <div className="mb-2">
            <strong>Order ID:</strong> {order.order_id}
          </div>
          <div className="mb-2">
            <strong>Date:</strong> {new Date(order.created_at).toLocaleString()}
          </div>
          <div className="mb-2">
            <strong>Total Amount:</strong> ₹{order.total_amount.toLocaleString()}
          </div>
          <div className="mt-4">
            <strong>Items:</strong>
            <ul className="list-disc list-inside ml-4">
              {order.items.map((item, i) => (
                <li key={i} className="mt-1">
                  {item.product_name
                    ? `${item.product_name} (x${item.quantity}) - ₹${item.total_amount}`
                    : `Product ID ${item.id} (x${item.quantity}) - ₹${item.amount}`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
