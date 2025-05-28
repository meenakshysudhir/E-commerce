import { BrowserRouter, Routes, Route } from "react-router-dom";
import EShoppingWebsite from "./user";
import AdminPage from "./admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EShoppingWebsite />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
