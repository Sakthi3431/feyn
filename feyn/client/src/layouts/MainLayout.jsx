import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home.jsx";

function MainLayout() {
  return (
    <>
      <Navbar />
      <Home/>
    </>
  );
}

export default MainLayout;