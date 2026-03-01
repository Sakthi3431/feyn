import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import MainLayout from "..layouts/MainLayout";
import DashboardLayout from "../pages/DashboardLayout";

function AppRoutes() {
    return (
        <Routes>
            {/* Public Layout */}
            <Route element={<MainLayout />} >
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Route>

        {/* Dashboard Layout*/}

        <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />}/>           
        </Route>
        </Routes>
    );
}

export default AppRoutes;