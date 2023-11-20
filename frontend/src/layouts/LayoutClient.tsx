import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BreadcrumbClient from "../components/BreadcrumbClient";

const LayoutClient = () => {
  return (
    <div className="bg-[#f8f8fa]">
      <Header />
      <BreadcrumbClient />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutClient;
