import { Link } from "react-router-dom";

const UserNav = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">User Panel</h1>
      <div className="space-x-4">
        <Link to="/user/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/cart" className="hover:underline">Cart</Link>
        <Link to="/" className="hover:underline">Logout</Link>
      </div>
    </nav>
  );
};

export default UserNav;