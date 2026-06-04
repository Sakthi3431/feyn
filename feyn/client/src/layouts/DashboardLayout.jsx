import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import TrendingProducts from "../components/TrendingProducts";

function DashboardLayout() {
    return (
        <>
        <Navbar />
        <div className="p-8 bg-gray-100 min-h-screen">
            <Outlet />
        </div>
        </>
    );
} 
export default DashboardLayout;