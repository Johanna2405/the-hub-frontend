import IconBtn from "../IconBtn";
import { useUser } from "../../context/UserContext";

const AppModal = ({ onSelect }) => {
  const { pinboardSettings } = useUser();

  const apps = [
    {
      label: "Posts",
      type: "posts",
      icon: "fi fi-rr-edit",
      color: "neon",
    },
    {
      label: "Lists",
      type: "lists",
      icon: "fi fi-rr-list",
      color: "ultramarine",
    },
    {
      label: "Events",
      type: "events",
      icon: "fi fi-rr-calendar",
      color: "lilac",
    },
  ];

  return (
    <div>
      <div className="mt-4 flex justify-center">
        <IconBtn
          icon="fi-rr-plus-small"
          color="neon"
          onClick={() => document.getElementById("app_modal").showModal()}
        />
        <dialog id="app_modal" className="modal">
          <div className="modal-box bg-primary">
            <h3 className="font-bold text-lg  mb-4">Choose an App</h3>

            {apps.map((app) => (
              <div
                key={app.type}
                className="flex justify-between items-center bg-base rounded-xl p-2 px-4 my-2"
              >
                {/* Icon + Label */}
                <div className="flex items-center gap-4">
                  <i
                    className={`text-lg pt-1 ${app.icon} text-${app.color}`}
                    style={{ color: app.color }}
                  />
                  <span className="font-medium">{app.label}</span>
                </div>

                {/* Plus-Button */}
                <IconBtn
                  icon="fi-rr-plus-small text-6xl"
                  className="text-4xl"
                  color="neon"
                  onClick={() => {
                    onSelect(app.type);
                    document.getElementById("app_modal").close();
                  }}
                />
              </div>
            ))}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default AppModal;
