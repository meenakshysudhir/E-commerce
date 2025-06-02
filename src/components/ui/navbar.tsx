import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Home, ClipboardList, PlusCircle } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "text-blue-600 font-bold" : "text-gray-800";

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-xl font-semibold text-blue-700">E-Shop</div>

      <div className="flex gap-6">
        <Link to="/user" className={isActive("/user")}>
          <div className="flex items-center gap-1">
            <Home size={18} />
            <span>User</span>
          </div>
        </Link>

        <Link to="/user/cart" className={isActive("/user/cart")}>
          <div className="flex items-center gap-1">
            <ShoppingCart size={18} />
            <span>Cart</span>
          </div>
        </Link>

        <Link to="/admin/add" className={isActive("/admin/add")}>
          <div className="flex items-center gap-1">
            <PlusCircle size={18} />
            <span>Add Product</span>
          </div>
        </Link>

        <Link to="/admin/orders" className={isActive("/admin/orders")}>
          <div className="flex items-center gap-1">
            <ClipboardList size={18} />
            <span>Orders</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
