import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-primary w-full px-4 pt-8 pap-8 min-h-[33vh]">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="p-8 flex flex-col items-center md:items-start gap-4">
          <Link to={"/get-started"}>
            <img src="./logoipsum-329.svg" alt="Logo" />
          </Link>
          <span className="font-bold">the hub</span>
          <span>contact information here</span>
        </div>
        <div className="flex gap-12">
          <div className="p-8 flex flex-col gap-4">
            <span className="font-bold">navigation</span>
            <span>imprint</span>
            <span>data privacy</span>
          </div>
          <div className="p-8 flex flex-col gap-4">
            <span className="font-bold">social</span>
            <div className="grid grid-cols-2 gap-4">
              <i className="fi-rr-exclamation text-4xl text-ultramarine"></i>
              <i className="fi-rr-exclamation text-4xl text-ultramarine"></i>
              <i className="fi-rr-exclamation text-4xl text-ultramarine"></i>
              <i className="fi-rr-exclamation text-4xl text-ultramarine"></i>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center">© 2025 the hub | All rights reserved</p>
    </footer>
  );
};
export default Footer;
