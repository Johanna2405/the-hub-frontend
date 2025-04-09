import { useNavigate } from "react-router";

const CommunitySelector = ({ communities = [], onSelect }) => {
  const navigate = useNavigate();

  const handleSelect = (community) => {
    if (onSelect) {
      onSelect(community.slug); // update global state
    }
    navigate(`/community/${community.id}/pinboard`);
  };

  // Prevent render if communities is empty or still loading
  if (!communities || communities.length === 0) {
    return (
      <div className="text-sm text-gray-400 italic">
        You haven’t joined any communities yet.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block font-medium mb-2 text-text">
        Select a community:
      </label>
      <select
        onChange={(e) => {
          const selectedId = e.target.value;
          const selected = communities.find((c) => c.id === selectedId);
          if (selected) {
            handleSelect(selected);
          }
        }}
        className="select select-bordered w-full max-w-xs bg-primary text-text"
        defaultValue=""
      >
        <option value="" disabled>
          Choose...
        </option>
        {communities.map((community) => (
          <option key={community.id} value={community.id}>
            {community.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CommunitySelector;
