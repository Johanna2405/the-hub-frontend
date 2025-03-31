import { Outlet } from "react-router";
import Footer from "../components/Footer";

const SignedOutLayout = () => {
  return (
    <div className="flex min-h-screen overflow-x-hidden font-sora">
      <div className="flex flex-col w-full transition-all items-center">
        <img src="./logoipsum-329.svg" alt="Logo" className="p-4" />
        <main className="flex flex-col items-center min-h-64 p-4 w-full md:w-4/5 lg:w-3/4 xl:w-2/3">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default SignedOutLayout;
