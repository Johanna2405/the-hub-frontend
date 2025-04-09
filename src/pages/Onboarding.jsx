import { useEffect, useState } from "react";
import {
  fetchAllCommunities,
  createCommunity,
  joinCommunity,
} from "../utils/community";
import { useNavigate } from "react-router";
import { useCommunity } from "../context/CommunityContext";
import { showToast } from "../utils/toast";
import IconBtn from "../components/IconBtn";

const Onboarding = () => {
  const [communities, setCommunities] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [newName, setNewName] = useState("");
  const { setCurrentCommunity } = useCommunity();
  const navigate = useNavigate();

  // Load existing communities
  useEffect(() => {
    const loadCommunities = async () => {
      try {
        const data = await fetchAllCommunities();
        setCommunities(data);
      } catch (err) {
        showToast("Failed to load communities", "error");
      }
    };

    loadCommunities();
  }, []);

  // Join selected
  const handleJoin = async (e) => {
    e.preventDefault();
    if (!selectedId) return;

    try {
      await joinCommunity(selectedId);
      const joined = communities.find((c) => c.id === parseInt(selectedId));
      setCurrentCommunity(joined);
      showToast(`Joined "${joined.name}"!`, "success");
      navigate("/");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  // Create new
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    try {
      const community = await createCommunity({ name: newName });
      await joinCommunity(community.id); // automatic join
      setCurrentCommunity(community);
      showToast(`Created "${community.name}"!`, "success");
      navigate("/");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  // Skip onboarding
  const handleSkip = () => {
    setCurrentCommunity(null);
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-8 items-center py-12">
      <h1 className="text-center">Welcome to the community.</h1>
      <h2 className="text-neon">Choose your community...</h2>

      <form onSubmit={handleJoin} className="w-full max-w-sm">
        <div className="flex items-center gap-4">
          <select
            className="w-full p-3 border-base text-text bg-primary rounded-2xl appearance-none pr-10 focus:outline-lilac"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            <option value="">Select a community</option>
            {communities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <IconBtn text="Join" icon="fi-rr-arrow-right" color="lilac" />
        </div>
      </form>

      <h3 className="text-neon">...or create a new one.</h3>
      <form
        onSubmit={handleCreate}
        className="flex gap-4 items-center max-w-sm w-full"
      >
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="creative name"
          className="w-full bg-primary px-3 py-2 text-text rounded-2xl focus:outline-lilac"
          required
        />
        <IconBtn text="Create" icon="fi-rr-plus-small" color="lilac" />
      </form>

      <button
        onClick={handleSkip}
        className="mt-6 text-sm text-muted hover:underline cursor-pointer"
      >
        Skip for now
      </button>
    </div>
  );
};

export default Onboarding;
