import IconBtn from "../components/IconBtn";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useCommunity } from "../context/CommunityContext";
import { useNavigate } from "react-router";
import { changeUsername, changePassword, updateStatus } from "../utils/user";
import AppCheckbox from "../components/Settings/AppCheckbox";
import ThemeController from "../components/Settings/ThemeController";
import CommunitySelector from "../components/CommunitySelector";
import { showToast } from "../utils/toast";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const { user, setUser } = useUser();
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { pinboardSettings, setPinboardSettings } = useUser();

  const { joinedCommunities, currentCommunity, setCurrentCommunity } =
    useCommunity();

  // Add check if username is different!
  const handleChangeUsername = async (e) => {
    {
      e.preventDefault();
      try {
        await changeUsername(user.id, newUsername);
        setUser((prev) => ({ ...prev, username: newUsername }));
        showToast("Username updated.", "success");
      } catch (err) {
        console.error(err);
        showToast("Failed to update username.", "error");
      }
    }
  };

  const handleChangePassword = async (e) => {
    {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
        showToast("Passwords do not match.", "error");
        return;
      }
      try {
        await changePassword(user.id, newPassword);
        showToast("Password changed.", "success");
        setNewPassword("");
        setConfirmPassword("");
      } catch (err) {
        console.error(err);
        showToast("Failed to change password.", "error");
      }
    }
  };

  const handlePictureUpload = async () => {
    try {
      const updatedUser = await updateProfilePicture(user.id, selectedFile);
      setUser((prev) => ({
        ...prev,
        profile_picture: updatedUser.profile_picture,
      }));
      showToast("Profile picture updated!", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to upload picture.", "error");
    }
  };

  // const handleStatusUpdate = async () => {
  //   try {
  //     const updated = await updateStatus(user.id, status);
  //     setUser((prev) => ({ ...prev, status }));
  //     alert("Status updated!");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to update status");
  //   }
  // };

  return (
    <div className="flex flex-col gap-8">
      <Header
        title="Profile Settings"
        showBackButton={true}
        onBack={() => navigate(-1)}
      />
      {/* change theme  */}
      <div className="flex gap-4 justify-start">
        <ThemeController />
      </div>
      {/* update status */}
      <div className="bg-primary rounded-3xl p-4 flex flex-col gap-4 md:w-3/4">
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
            // onClick={handleStatusUpdate}
          />
        </div>
      </div>
      {/* Pinboard settings */}
      <div className="collapse collapse-arrow bg-base-100 border border-lilac rounded-3xl md:w-3/4">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold text-lg">
          Pinboard settings
        </div>
        <div className="collapse-content ">
          <div className="flex flex-col gap-4">
            <AppCheckbox
              icon={"fi-rr-text"}
              iconColor={"neon"}
              appName={"Posts"}
              checked={pinboardSettings.post}
              onChange={() =>
                setPinboardSettings((prev) => ({
                  ...prev,
                  post: !prev.post,
                }))
              }
            />
            <AppCheckbox
              icon={"fi-rs-list-check"}
              iconColor={"aquamarine"}
              appName={"Lists"}
              checked={pinboardSettings.list}
              onChange={() =>
                setPinboardSettings((prev) => ({
                  ...prev,
                  list: !prev.list,
                }))
              }
            />
            <AppCheckbox
              icon={"fi-rr-megaphone"}
              iconColor={"sage"}
              appName={"Messages"}
              checked={pinboardSettings.message}
              onChange={() =>
                setPinboardSettings((prev) => ({
                  ...prev,
                  message: !prev.message,
                }))
              }
            />
            <AppCheckbox
              icon={"fi-rr-calendar"}
              iconColor={"lilac"}
              appName={"Calendar"}
              checked={pinboardSettings.calendar}
              onChange={() =>
                setPinboardSettings((prev) => ({
                  ...prev,
                  calendar: !prev.calendar,
                }))
              }
            />
          </div>
        </div>
      </div>
      {/* change user data  */}
      <div className="collapse collapse-arrow bg-base-100 border border-lilac rounded-3xl md:w-3/4">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold text-lg">
          Change username & password
        </div>
        <div className="collapse-content ">
          <div className="flex flex-col gap-4">
            {/* Form */}
            <form className="w-full space-y-4" onSubmit={handleChangeUsername}>
              {/* Username Input */}
              <div className="form-control flex flex-col items-start  gap-4 md:flex-row md:items-center ">
                <label className="label">
                  <span className="label-text font-medium text-text">
                    New username
                  </span>
                </label>
                <input
                  type="text"
                  placeholder={user.username}
                  className="input input-bordered w-full bg-primary focus:outline-lilac focus:ring-2 rounded-2xl"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-secondary">
                  change username
                </button>
              </div>
            </form>
            <form className="w-full space-y-4" onSubmit={handleChangePassword}>
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
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex md:justify-end justify-start">
                <button type="submit" className="btn btn-secondary">
                  change password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* change community */}
      <div className="collapse collapse-arrow bg-base-100 border border-lilac rounded-3xl md:w-3/4">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold text-lg">
          Choose your community
        </div>
        <div className="collapse-content ">
          <div className="flex flex-col gap-4">
            <CommunitySelector />
            {/* <form> */}
            {/* <select
                className="w-full p-3 border-base text-text bg-primary rounded-2xl appearance-none pr-10 focus:outline-lilac"
                value={currentCommunity?.id || ""}
                onChange={(e) => {
                  const selected = joinedCommunities.find(
                    (c) => c.id === e.target.value
                  );
                  if (selected) {
                    setCurrentCommunity(selected);
                  }
                }}
              >
                {joinedCommunities.map((community) => (
                  <option key={community.id} value={community.id}>
                    {community.name}
                  </option>
                ))}
              </select> */}

            {/* </div> */}
            {/* </form> */}
          </div>
        </div>
      </div>
      {/* // profile picture */}
      <div className="collapse collapse-arrow bg-base-100 border border-lilac rounded-3xl md:w-3/4">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold text-lg">
          Edit profile picture
        </div>
        <div className="collapse-content ">
          <div className="flex flex-col gap-8 py-4">
            <div className="avatar flex flex-col gap-4 items-center">
              <div className="w-44 rounded-full">
                <img
                  src={user?.profile_picture || "/default-profile.png"}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
              <input
                type="file"
                className="file-input file-input-secondary h-full border-2"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
              <IconBtn
                text={"save"}
                color={"ultramarine"}
                icon={"fi-rr-disk"}
                onClick={handlePictureUpload}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
