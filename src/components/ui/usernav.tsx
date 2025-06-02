// import { Link } from "react-router-dom";

// const UserNav = () => {
//   return (
//     <nav className="bg-blue-600 text-white p-4 flex justify-between">
//       <h1 className="text-xl font-bold">User Panel</h1>
//       <div className="space-x-4">
//         <Link to="/user" className="hover:underline">Dashboard</Link>
//         <Link to="cart" className="hover:underline">Cart</Link>
//         <Link to="/" className="hover:underline">Logout</Link>
//       </div>
//     </nav>
//   );
// };

// export default UserNav;

import { Link, useLocation } from "react-router-dom";

const UserNav = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/user" },
    { name: "Cart", path: "/user/cart" },
    { name: "Logout", path: "/" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-2xl font-semibold text-blue-700 mb-2 sm:mb-0">🛍️ User Panel</h1>
        <div className="flex space-x-2 sm:space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-300 
                ${
                  location.pathname === item.path
                    ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
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

export default UserNav;

