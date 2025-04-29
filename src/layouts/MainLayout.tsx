import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import "./MainLayout.scss";

interface MainLayoutProps {
  children?: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <NavBar />
      <div className="layout__content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default MainLayout;
