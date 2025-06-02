import { BrowserRouter, Routes, Route } from "react-router-dom";
import EShoppingWebsite from "./user/user";
import Cart from "./user/cart";
import AdminPage from "./admin/admin";
import Orders from "./admin/orders";
import Navbar from "./components/ui/navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/user" element={<EShoppingWebsite />} />
        <Route path="/admin/add" element={<AdminPage />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/user/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
