import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import "./ParentLayout.scss";

interface MainLayoutProps {
  children?: ReactNode;
}

function ParentLayout({ children }: MainLayoutProps) {
  return (
    <>
      <NavBar />
      <div className="layout__content">
        <h1>Welcome</h1>
        <p>Pick a student to start</p>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default ParentLayout;
