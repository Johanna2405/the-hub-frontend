import IconBtn from "../components/IconBtn";

const Header = ({ title, showBackButton, onBack, RightAction }) => {
  return (
    <header className="mb-6">
      {showBackButton && (
        <div className="mb-4 flex items-center">
          <IconBtn
            onClick={onBack}
            color={"text"}
            icon={"fi-ss-arrow-small-left"}
          />
          <span className="ml-2 font-medium text-text">Go Back</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-text">{title}</h1>
        {RightAction && <div>{RightAction}</div>}
      </div>
    </header>
  );
};

export default Header;
