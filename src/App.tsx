import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./signup";
import Login from "./login";
import AdminLogin from "./adminLogin";
import User from "./user/user";
import Admin from "./admin/admin";
// import AdminDashboard from "./pages/AdminDashboard";
// import UserDashboard from "./pages/UserDashboard";
import UserNav from "./components/ui/usernav";
import AdminNav from "./components/ui/adminnav";
import Orders from "./admin/orders";
import Cart from "./user/cart";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/user"
          element={
            <>
              <UserNav />
              <User />
          
            </>
          }
        />
        <Route
          path="/user/cart"
          element={
            <>
                          <UserNav />

              <Cart />
            </>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <>
              <AdminNav />
              <Admin />
            </>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <>
              <AdminNav />
              <Orders />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
