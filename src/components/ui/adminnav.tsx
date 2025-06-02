// import { Link } from "react-router-dom";

// const AdminNav = () => {
//   return (
//     <nav className="bg-red-600 text-white p-4 flex justify-between">
//       <h1 className="text-xl font-bold">Admin Panel</h1>
//       <div className="space-x-4">
//         {/* <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link> */}
//         <Link to="/admin/dashboard" className="hover:underline">Products</Link>
//         <Link to="/admin/orders" className="hover:underline">Orders</Link>
//         <Link to="/admin/login" className="hover:underline">Logout</Link>
//       </div>
//     </nav>
//   );
// };

// export default AdminNav;



  import { Link, useLocation } from "react-router-dom";

  const AdminNav = () => {
    const location = useLocation();

    const navItems = [
      { name: "Dashboard", path: "/admin/dashboard" },
      // { name: "Products", path: "/admin/admin" },
      { name: "Orders", path: "/admin/orders" },
      { name: "Logout", path: "/admin/login" },
    ];

    return (
      <nav className="bg-blue-100 border-b border-blue-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-2xl font-semibold text-blue-700 mb-2 sm:mb-0">🛠️ Admin Panel</h1>
          <div className="flex space-x-2 sm:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-300
                  ${
                    location.pathname === item.path
                      ? "bg-blue-200 text-blue-800 font-medium shadow-sm"
                      : "text-gray-600 hover:bg-blue-200 hover:text-blue-800"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    );
  };

  export default AdminNav;
