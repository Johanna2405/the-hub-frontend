import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen overflow-x-hidden font-sora">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-col w-full transition-all">
        <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="flex-1 p-4 transition-all">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
