import IconBtn from "../IconBtn";

const AppModal = ({ children, onClose }) => {
  return (
    <div>
      <h3 className="mt-24">Add something here</h3>

      <div className="mt-4 flex justify-center">
        <IconBtn
          icon="fi fi-rr-plus"
          color="lilac"
          text="create"
          onClick={() => document.getElementById("app_modal").showModal()}
        />
        <dialog id="app_modal" className="modal">
          <div className="modal-box bg-primary">
            <h3 className="font-bold text-lg  mb-4">Choose an App</h3>

            {[
              {
                label: "Posts",
                type: "post",
                icon: "fi fi-rr-edit",
                color: "neon",
              },
              {
                label: "Lists",
                type: "list",
                icon: "fi fi-rr-list",
                color: "ultramarine",
              },
              {
                label: "Messages",
                type: "message",
                icon: "fi fi-rr-megaphone",
                color: "sage",
              },
              {
                label: "Calendar",
                type: "event",
                icon: "fi fi-rr-calendar",
                color: "lilac",
              },
            ].map((app) => (
              <div
                key={app.type}
                className="flex justify-between items-center bg-base rounded-xl p-2 px-4 my-2"
              >
                {/* Icon + Label */}
                <div className="flex items-center gap-2">
                  <i
                    className={`text-lg ${app.icon} ${app.color}`}
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
