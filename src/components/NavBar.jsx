import { Link, NavLink } from "react-router";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between p-4 gap-4">
      <NavLink to={"/menu"}>
        <button className="btn btn-primary btn-icon text-xl">
          <i className="fi-rr-menu-burger"></i>
        </button>
      </NavLink>
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
