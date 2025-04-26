import { ReactNode } from "react";
import NavBar from "./NavBar/NavBar";
import "./MainLayout.scss";
import Footer from "./Footer/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <NavBar />
      <div className="layout__content">{children}</div>
      <Footer />
    </>
  );
}

export default MainLayout;
