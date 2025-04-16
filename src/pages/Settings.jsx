import IconBtn from "../components/IconBtn";
import Header from "../components/Header";
import ConfirmModal from "../components/ConfirmModal";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useCommunity } from "../context/CommunityContext";
import { useNavigate } from "react-router";
import {
  changeUsername,
  changePassword,
  // updateStatus,
  updateProfilePicture,
  fetchUser,
} from "../utils/user";
import AppCheckbox from "../components/Settings/AppCheckbox";
import ThemeController from "../components/Settings/ThemeController";
import CommunitySettingsModal from "../components/Settings/CommunitySettingsModal";
import { showToast } from "../utils/toast";
import {
  fetchAllCommunities,
  joinCommunity,
  updateCommunitySettings,
  deleteCommunity,
  leaveCommunity,
} from "../utils/community";

const Settings = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const { user, setUser, pinboardSettings, setPinboardSettings } = useUser();
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [communities, setCommunities] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isCommunityModalOpen, setCommunityModalOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    // joinedCommunities,
    currentCommunity,
    setCurrentCommunity,
    settings,
    setSettings,
    refreshJoinedCommunities,
  } = useCommunity();

  //clear old object URLs for profile temporary images
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Load existing communities
  useEffect(() => {
    const loadCommunities = async () => {
      try {
        const data = await fetchAllCommunities();
        setCommunities(data);
      } catch (err) {
        console.log(err);
        showToast("Failed to load communities", "error");
      }
    };

    loadCommunities();
  }, []);

  if (!user) {
    return <div className="p-8 text-center">Loading user data...</div>;
  }

  const handleChangeUsername = async (e) => {
    {
      e.preventDefault();
      if (newUsername === user.username) {
        showToast("Please choose a new username.", "error");
        return;
      }
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
    if (!selectedFile) {
      showToast("No file selected!", "error");
      return;
    }

    console.log("Selected File:", selectedFile);

    try {
      await updateProfilePicture(selectedFile);

      const updatedUser = await fetchUser();
      setUser(updatedUser);

      setSelectedFile(null);
      setPreviewUrl(null);
      showToast("Profile picture updated!", "success");
    } catch (err) {
      console.error("Upload error:", err);
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

  const toggleSetting = async (key) => {
    try {
      const updated = {
        ...settings,
        [key]: !settings[key],
      };

      setSettings(updated);
      await updateCommunitySettings(currentCommunity.id, updated);
      showToast("Community settings updated!", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to update settings", "error");
    }
  };

  const removeCommunityFromState = (id) => {
    setCommunities((prevCommunities) =>
      prevCommunities.filter((community) => community.id !== id)
    );
  };

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    setShowConfirm(false);
    try {
      removeCommunityFromState(currentCommunity.id);
      await deleteCommunity(currentCommunity.id);
      setCurrentCommunity(null);
      showToast("Community deleted.", "success");
      navigate("/");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete community", "error");
    }
  };

  const handleLeave = async (communityId) => {
    try {
      await leaveCommunity(communityId);
      showToast("You’ve successfully left the community", "success");
      setTimeout(() => {
        setCurrentCommunity(null);
        navigate(0);
      }, 750);
    } catch (err) {
      console.error("Failed to leave community:", err);
      showToast("Failed to leave community", "error");
    }
  };

  return (
    <div className="flex flex-col gap-8 ">
      <Header
        title={`Settings for ${user.username}`}
        showBackButton={true}
        onBack={() => navigate(-1)}
      />
      {/* change theme  */}
      <div className="flex gap-4 justify-start">
        <ThemeController />
      </div>
      {/* update status */}
      {/* <div className="bg-primary rounded-3xl p-4 flex flex-col gap-4 md:w-3/4">
        <h2>{user.username}</h2>
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
      </div> */}
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start">
        {/* Pinboard settings */}
        {currentCommunity === null && (
          <div className="collapse collapse-arrow bg-base-100 border border-lilac rounded-3xl">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold text-lg">
              Pinboard settings
            </div>
            <div className="collapse-content ">
              <div className="flex flex-col gap-4">
                <AppCheckbox
                  icon={"fi-rr-text"}
                  iconColor={"neon"}
                  appName={"Posts"}
                  checked={pinboardSettings.posts}
                  onChange={() =>
                    setPinboardSettings((prev) => ({
                      ...prev,
                      posts: !prev.posts,
                    }))
                  }
                />
                <AppCheckbox
                  icon={"fi-rs-list-check"}
                  iconColor={"ultramarine"}
                  appName={"Lists"}
                  checked={pinboardSettings.lists}
                  onChange={() =>
                    setPinboardSettings((prev) => ({
                      ...prev,
                      lists: !prev.lists,
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
        )}

        {/* change user data  */}
        <div className="collapse collapse-arrow bg-base-100 border border-lilac rounded-3xl">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold text-lg ">
            Change username & password
          </div>
          <div className="collapse-content ">
            <div className="flex flex-col gap-4">
              <span className="label-text font-medium text-text py-4 border-b border-lilac">
                Current Username: {user.username} <br />
                E-Mail: {user.email}
              </span>

              {/* Form */}
              <form
                className="w-full space-y-4"
                onSubmit={handleChangeUsername}
              >
                {/* Username Input */}
                <div className="form-control flex flex-col items-start gap-4 2xl:flex-row 2xl:items-center pb-8 border-b border-lilac">
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
                  <button type="submit" className="btn btn-secondary text-base">
                    change username
                  </button>
                </div>
              </form>
              <form
                className="w-full space-y-4"
                onSubmit={handleChangePassword}
              >
                {/* Password Input */}
                <div className="form-control flex flex-col items-start gap-4 2xl:flex-row 2xl:items-center pt-4">
                  <label className="label">
                    <span className="label-text text-text font-medium">
                      New password (min 8 characters)
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
                <div className="form-control flex flex-col items-start gap-4 2xl:flex-row 2xl:items-center ">
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
                <div className="flex 2xl:justify-end justify-start">
                  <button type="submit" className="btn btn-secondary text-base">
                    change password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* change community */}
        <div className="collapse collapse-arrow bg-base-100 border border-lilac rounded-3xl">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold text-lg">
            Community Settings
          </div>
          <div className="collapse-content ">
            <div className="flex flex-col gap-4">
              <IconBtn
                text={`Join or add a community`}
                icon="fi-rr-plus-small"
                color="lilac"
                onClick={() => setCommunityModalOpen(true)}
              />

              {currentCommunity && (
                <div className="flex flex-col gap-4">
                  <IconBtn
                    text={`Leave ${currentCommunity.name}`}
                    icon="fi-rr-leave"
                    color="ultramarine"
                    onClick={() => handleLeave(currentCommunity.id)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Admin community settings */}
        {currentCommunity?.role === "admin" && (
          <div className="collapse collapse-arrow bg-base-100 border border-lilac rounded-3xl">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title">
              <div className="flex items-center gap-4">
                <h4 className="font-semibold text-lg">Admin Settings</h4>
                <span className="rounded-full border border-lilac px-4 py-1 text-sm">
                  {currentCommunity.name}
                </span>
              </div>
            </div>
            <div className="collapse-content ">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h4>Select community apps</h4>
                  <div className="flex flex-col gap-4">
                    <AppCheckbox
                      icon={"fi-rr-text"}
                      iconColor={"neon"}
                      appName={"Posts"}
                      checked={settings.posts ?? true}
                      onChange={() => toggleSetting("posts")}
                    />
                    <AppCheckbox
                      icon={"fi-rs-list-check"}
                      iconColor={"aquamarine"}
                      appName={"Lists"}
                      checked={settings.lists ?? true}
                      onChange={() => toggleSetting("lists")}
                    />
                    <AppCheckbox
                      icon={"fi-rr-megaphone"}
                      iconColor={"sage"}
                      appName={"Messages"}
                      checked={settings.messages ?? true}
                      onChange={() => toggleSetting("messages")}
                    />
                    <AppCheckbox
                      icon={"fi-rr-calendar"}
                      iconColor={"lilac"}
                      appName={"Calendar"}
                      checked={settings.calendar ?? true}
                      onChange={() => toggleSetting("calendar")}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <IconBtn
                    text={`Delete ${currentCommunity.name} community`}
                    icon="fi-rr-trash"
                    color="ultramarine"
                    onClick={handleDelete}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {/* // profile picture */}
        <div className="collapse collapse-arrow bg-base-100 border border-lilac rounded-3xl">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold text-lg">
            Edit profile picture
          </div>
          <div className="collapse-content ">
            <div className="flex flex-col gap-8 py-4">
              <div className="avatar flex flex-col gap-4 items-center">
                <div className="w-44 rounded-full">
                  <img
                    src={
                      previewUrl ||
                      user?.profilePicture ||
                      "/default-profile.png"
                    }
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-secondary h-full border-2"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setSelectedFile(file);

                    if (file) {
                      const objectUrl = URL.createObjectURL(file);
                      setPreviewUrl(objectUrl);
                    }
                  }}
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

      {isCommunityModalOpen && (
        <div className="fixed inset-0 bg-primary/25 backdrop-blur-sm z-50 flex items-center justify-center framer-motion">
          <div className="bg-base p-4 md:p-6 rounded-3xl shadow-lg relative w-full max-w-xl mx-4">
            <button
              className="absolute top-6 right-6 text-lg text-text "
              onClick={() => setCommunityModalOpen(false)}
            >
              ✕
            </button>
            <CommunitySettingsModal
              closeModal={() => setCommunityModalOpen(false)}
            />
          </div>
        </div>
      )}

      {currentCommunity && (
        <ConfirmModal
          isOpen={showConfirm}
          message={`Are you sure you want to delete "${
            currentCommunity?.name || "this community"
          }"? This cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default Settings;
