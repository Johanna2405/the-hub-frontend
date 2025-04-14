const ThemeController = () => {
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-secondary text-base">
        Choose your theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-300  rounded-2xl z-1 w-52 p-2 shadow-2xl"
      >
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller w-full btn btn-sm  btn-ghost justify-start hover:border-none"
            aria-label="Default light"
            value="thehub"
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller w-full btn btn-sm btn-ghost justify-start  hover:border-none"
            aria-label="Default dark"
            value="thedarkhub"
          />
        </li>
      </ul>
    </div>
  );
};
export default ThemeController;
