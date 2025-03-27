import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden font-sora">
      <NavBar />
      <main className="flex flex-col px-4 py-10 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
