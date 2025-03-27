import { Link, NavLink } from "react-router";

const NavBar = ({ isOpen, setIsOpen }) => {
  return (
    <div className="flex items-center justify-between p-4 gap-4">
      <button
        className={`btn btn-primary text-xl pt-1 ${isOpen ? "hidden" : "flex"}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <i className="fi-rr-sidebar"></i>
      </button>
      <Link to={"/"}>
        <img src="./logoipsum-329.svg" alt="Logo" />
      </Link>
      <div className="flex gap-2">
        <button className="btn btn-primary btn-icon text-xl">
          <i className="fi-rs-bell"></i>
        </button>
        <button className="btn btn-primary btn-icon text-xl">
          <i className="fi fi-rr-user"></i>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
