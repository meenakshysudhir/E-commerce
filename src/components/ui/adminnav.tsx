import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav className="bg-red-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <div className="space-x-4">
        {/* <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link> */}
        <Link to="/admin/dashboard" className="hover:underline">Products</Link>
        <Link to="/admin/orders" className="hover:underline">Orders</Link>
        <Link to="/admin/login" className="hover:underline">Logout</Link>
      </div>
    </nav>
  );
};

export default AdminNav;



