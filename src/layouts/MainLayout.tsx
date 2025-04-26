import { ReactNode } from "react";
import NavBar from "./NavBar/NavBar";
import "./MainLayout.scss";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

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
