import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen overflow-x-hidden font-sora">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-col w-full transition-all items-center">
        <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="flex-1 px-4 py-8 lg:py-12 transition-all w-full lg:w-3/4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
