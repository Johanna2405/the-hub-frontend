const AppCheckbox = ({ appName, icon, iconColor }) => {
  return (
    <div className="flex gap-4 px-4 py-2 border-2 border-primary rounded-2xl items-center justify-between">
      <div className="flex gap-4 items-center">
        <i className={`${icon} text-${iconColor} text-2xl pt-1`}></i>
        <span className="font-normal text-lg">{appName}</span>
      </div>
      <input type="checkbox" defaultChecked className="checkbox" />
    </div>
  );
};

export default AppCheckbox;
