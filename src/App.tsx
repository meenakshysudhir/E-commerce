import { BrowserRouter, Routes, Route } from "react-router-dom";
import EShoppingWebsite from "./user/user";
import Cart from "./user/cart"
import AdminPage from "./admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<EShoppingWebsite />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
