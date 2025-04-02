import IconBtn from "../components/IconBtn";
import Header from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router";

const ProfileSettings = () => {
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8">
      <Header
        title="Profile Settings"
        showBackButton={true}
        onBack={() => navigate(-1)}
      />
      {/* Pinboard settings */}
      <div className="collapse collapse-arrow bg-base-100 border border-lilac rounded-3xl md:w-2/3">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold text-lg">
          Pinboard settings
        </div>
        <div className="collapse-content ">
          <div className="flex flex-col gap-4"></div>
        </div>
      </div>
      {/* change theme  */}
      <div className="flex gap-4 justify-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-secondary">
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
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start hover:border-none"
                aria-label="Default light"
                value="thehub"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start  hover:border-none"
                aria-label="Default dark"
                value="thedarkhub"
              />
            </li>
          </ul>
        </div>
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
        <input type="radio" name="my-accordion-2" />
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
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold text-lg">
          Edit profile picture & status
        </div>
        <div className="collapse-content ">
          <div className="flex flex-col gap-8 py-4">
            <div className="avatar flex flex-col gap-4 items-center">
              <div className="w-44 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
              <input
                type="file"
                className="file-input file-input-secondary h-full border-2"
              />
              <IconBtn
                text={"save"}
                color={"ultramarine"}
                icon={"fi-rr-disk"}
              />
            </div>

            <div className="bg-primary rounded-3xl p-4 flex flex-col gap-4">
              <span className="font-semibold">Update your status</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="latest status"
                  className="flex-1 px-2 py-2 rounded-2xl placeholder:text-gray-400 focus:outline-none bg-base text-text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <IconBtn
                  text={"update"}
                  color={"ultramarine"}
                  icon={"fi-rr-disk"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
