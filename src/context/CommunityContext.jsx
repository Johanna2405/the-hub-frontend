import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchJoinedCommunities,
  fetchCommunitySettings,
  fetchCommunityPinBoard,
} from "../utils/community";
import { useNavigate } from "react-router";

const CommunityContext = createContext();

export const useCommunity = () => useContext(CommunityContext);

export const CommunityProvider = ({ children }) => {
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [currentCommunity, setCurrentCommunity] = useState(() => {
    const stored = localStorage.getItem("currentCommunity");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({});
  const [pinBoard, setPinBoard] = useState([]);

  //   const navigate = useNavigate();

  // Load communities
  useEffect(() => {
    const initializeCommunities = async () => {
      try {
        const communities = await fetchJoinedCommunities();
        setJoinedCommunities(communities);

        if (!currentCommunity && communities.length > 0) {
          const lastSelected = localStorage.getItem("currentCommunity");
          const fallback = lastSelected
            ? JSON.parse(lastSelected)
            : communities[0];

          setCurrentCommunity(fallback);
          //   navigate(`/c/${fallback.slug}`); navigate to pinboard of community?
        }
      } catch (err) {
        console.error("Failed to fetch communities:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeCommunities();
  }, []);

  // Persist currentCommunity in localStorage
  useEffect(() => {
    if (currentCommunity) {
      localStorage.setItem(
        "currentCommunity",
        JSON.stringify(currentCommunity)
      );
    }
  }, [currentCommunity]);

  useEffect(() => {
    const loadExtras = async () => {
      if (currentCommunity) {
        try {
          const settings = await fetchCommunitySettings(currentCommunity.id);
          const pin = await fetchCommunityPinBoard(currentCommunity.id);
          setSettings(settings);
          setPinBoard(pin.pin_board || []);
        } catch (err) {
          console.error("Failed to load community details:", err);
        }
      }
    };

    loadExtras();
  }, [currentCommunity]);

  return (
    <CommunityContext.Provider
      value={{
        joinedCommunities,
        currentCommunity,
        setCurrentCommunity,
        loading,
        settings,
        pinBoard,
        setPinBoard,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};
