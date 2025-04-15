import { useUser } from "../../context/UserContext";
import { useEffect } from "react";

const ThemeController = () => {
  const { currentTheme, setCurrentTheme } = useUser();

  // Apply theme to <html> when it changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  // Toggle function
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "thehub" ? "thedarkhub" : "thehub");
  };

  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-base rounded-2xl">
      <label className="swap swap-rotate">
        {/* this hidden checkbox controls the state */}
        <input
          type="checkbox"
          className="theme-controller"
          checked={currentTheme === "thedarkhub"}
          onChange={toggleTheme}
        />
        {/* sun icon */}
        <i className="fi-rr-brightness swap-off text-text text-2xl pt-1"></i>
        {/* moon icon */}
        <i className="fi-rr-moon-stars swap-on text-text text-2xl pt-1"></i>
        <span className="text-lg font-normal ml-10 mt-1">Switch theme</span>
      </label>
    </div>
  );
};
export default ThemeController;
