import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import Shop from "../pages/Shop";
import Dashboard from "../pages/Dashboard";
import ServiceProviders from "../pages/ServiceProviders";
import ProductCard from "../pages/ProductCard";
import ProductDetails from "../pages/ProductDetails";
import SearchPage from "../pages/SearchPage";


function AppRoutes() {
  return (
    <Routes>
      {/* Public layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop/:id" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/service-providers" element={<ServiceProviders />} />
        <Route path="/product-card/:category/:id" element={<ProductCard />} />
        <Route path="/product-card/temp" element={<ProductDetails/>} />
        <Route path="/product-card/search" element={<SearchPage/>} />

      </Route>

      {/* Dashboard layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={
          <ProtectedRoute>
          <Dashboard />
          </ProtectedRoute>
          } />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
