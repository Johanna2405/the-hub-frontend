import IconBtn from "../components/IconBtn";

const ProfileSettings = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4 items-center">
        <i className="fi-rr-settings-sliders text-3xl"></i>
        <h1>Profile Settings</h1>
      </div>
      {/* change user data  */}
      <div className="collapse collapse-arrow bg-base-100 border border-lilac rounded-3xl md:w-2/3">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold text-lg">
          Change username & password
        </div>
        <div className="collapse-content ">
          <div className="flex flex-col gap-4">
            {/* Form */}
            <form className="w-full space-y-4">
              {/* Username Input */}
              <div className="form-control flex flex-col items-start  gap-4 md:flex-row md:items-center ">
                <label className="label">
                  <span className="label-text font-medium text-text">
                    New username
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="new username"
                  className="input input-bordered w-full bg-primary focus:outline-lilac focus:ring-2 rounded-2xl"
                  required
                />
                <button type="submit" className="btn btn-secondary">
                  change username
                </button>
              </div>
            </form>
            <form className="w-full space-y-4">
              {/* Password Input */}
              <div className="form-control flex flex-col items-start gap-4 md:flex-row md:items-center ">
                <label className="label">
                  <span className="label-text text-text font-medium">
                    New password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="input input-bordered w-full bg-primary focus:outline-lilac focus:ring-2 rounded-2xl"
                  required
                />
              </div>

              {/* Confirm Password Input */}
              <div className="form-control flex flex-col items-start gap-4 md:flex-row md:items-center ">
                <label className="label">
                  <span className="label-text text-text font-medium">
                    Confirm new password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="input input-bordered w-full bg-primary focus:outline-lilac focus:ring-2 rounded-2xl"
                  required
                />
              </div>
              <div className="flex justify-start md:w-2/3 md:justify-end">
                <button type="submit" className="btn btn-secondary">
                  change password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* change community */}
      <div className="collapse collapse-arrow bg-base-100 border border-lilac rounded-3xl md:w-2/3">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold text-lg">
          Choose your community
        </div>
        <div className="collapse-content ">
          <div className="flex flex-col gap-4">
            <form>
              <select className="w-full p-3 border-base text-text bg-primary rounded-2xl appearance-none pr-10 focus:outline-lilac">
                <option value="CommunityName">Community name</option>
              </select>
            </form>
          </div>
        </div>
      </div>
      {/* profile picture & status */}
      <div className="collapse collapse-arrow bg-base-100 border border-lilac rounded-3xl md:w-2/3">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold text-lg">
          Edit profile picture & status
        </div>
        <div className="collapse-content ">
          <div className="flex flex-col gap-8 py-4">
            <div className="avatar flex flex-col gap-4 items-center">
              <div className="w-44 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
              <input type="file" className="file-input file-input-secondary" />
              <IconBtn
                text={"save"}
                color={"ultramarine"}
                icon={"fi-rr-disk"}
              />
            </div>
            <div className="bg-primary rounded-3xl p-4">
              <span className="font-semibold">Update your status</span>
              {/* Add input from List item maybe */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
