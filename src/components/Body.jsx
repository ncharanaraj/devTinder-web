import { Outlet } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";

export const Body = () => {
  return (
    <div className="flex flex-col min-h-dvh">
      <NavBar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
