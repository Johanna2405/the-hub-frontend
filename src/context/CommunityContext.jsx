import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchJoinedCommunities,
  fetchCommunitySettings,
  fetchCommunityPinBoard,
  communityCleanup,
} from "../utils/community";

const CommunityContext = createContext();

export const useCommunity = () => useContext(CommunityContext);

export const CommunityProvider = ({ children }) => {
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [currentCommunity, setCurrentCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    calendar: true,
    lists: true,
    posts: true,
    events: true,
    messages: true,
  });
  const [pinBoard, setPinBoard] = useState([]);

  const refreshJoinedCommunities = async () => {
    try {
      const communities = await fetchJoinedCommunities();
      setJoinedCommunities(communities);
    } catch (err) {
      console.error("Failed to refresh communities:", err);
    }
  };

  // Load currentCommunity from localStorage (initial restore)
  useEffect(() => {
    const storedCommunity = localStorage.getItem("currentCommunity");
    if (storedCommunity) {
      try {
        setCurrentCommunity(JSON.parse(storedCommunity));
      } catch (err) {
        console.error("Failed to parse currentCommunity:", err);
      }
    }
  }, []);

  // Load communities
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const load = async () => {
      await refreshJoinedCommunities();
      setLoading(false);
    };

    load();
  }, []);

  // Persist currentCommunity in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (token && currentCommunity) {
      localStorage.setItem(
        "currentCommunity",
        JSON.stringify(currentCommunity)
      );
    } else {
      localStorage.removeItem("currentCommunity");
    }
  }, [currentCommunity]);

  useEffect(() => {
    const loadExtras = async () => {
      // if (!currentCommunity?.id) return;
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

  const cleanUpCommunity = () => {
    console.log("cleanUpCommunity called");
    setCurrentCommunity(null);
    setJoinedCommunities([]);
    setSettings({
      calendar: true,
      lists: true,
      posts: true,
      messages: true,
    });
    setPinBoard([]);
    communityCleanup();
  };

  return (
    <CommunityContext.Provider
      value={{
        joinedCommunities,
        currentCommunity,
        setCurrentCommunity,
        loading,
        settings,
        setSettings,
        pinBoard,
        setPinBoard,
        cleanUpCommunity,
        refreshJoinedCommunities,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};
