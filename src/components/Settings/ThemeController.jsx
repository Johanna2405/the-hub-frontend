import { useUser } from "../../context/UserContext";

const ThemeController = () => {
  const { themeMode, setThemeMode, effectiveTheme } = useUser();

  const cycleTheme = () => {
    const next =
      themeMode === "light"
        ? "dark"
        : themeMode === "dark"
        ? "system"
        : "light";
    setThemeMode(next);
  };

  const renderIcon = () => {
    switch (themeMode) {
      case "light":
        return <i className="fi-rr-brightness text-text text-2xl"></i>;
      case "dark":
        return <i className="fi-rr-moon-stars text-text text-2xl"></i>;
      case "system":
      default:
        return <i className="fi-rr-computer text-text text-2xl"></i>;
    }
  };

  return (
    <div
      className="flex items-center justify-between gap-4 px-4 py-3 bg-base rounded-2xl cursor-pointer select-none"
      onClick={cycleTheme}
    >
      <div className="flex items-center gap-4 w-full">
        <div className="text-text pt-1">{renderIcon()}</div>
        <span className="text-lg font-normal">Switch theme</span>
      </div>
    </div>
  );
};

export default ThemeController;
