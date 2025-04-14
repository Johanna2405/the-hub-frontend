import { Outlet } from "react-router";
import Footer from "../components/Footer";
import { Link } from "react-router";

const SignedOutLayout = () => {
  return (
    <div className="flex min-h-screen overflow-x-hidden font-sora">
      <div className="flex flex-col justify-between w-full transition-all items-center">
        {/* Maybe link to the landingpage? */}
        <Link to={"/get-started"}>
          <img src="./hub-dark.svg" alt="Logo" className="p-4 w-36" />
        </Link>
        <main className="flex flex-col items-center p-4 w-full ">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default SignedOutLayout;
