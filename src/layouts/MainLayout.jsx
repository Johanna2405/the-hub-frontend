import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { UserProvider } from "../context/UserContext";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <UserProvider>
      <div className="flex min-h-screen overflow-x-hidden font-sora">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex flex-col w-full transition-all items-center">
          <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
          <main className="flex-1 p-4 transition-all w-full md:w-4/5 lg:w-3/4 xl:w-2/3">
            <Outlet />
          </main>
        </div>
      </div>
    </UserProvider>
  );
};

export default MainLayout;
