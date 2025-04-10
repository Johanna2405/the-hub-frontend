import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchJoinedCommunities,
  fetchAllCommunities,
  fetchCommunitySettings,
  fetchCommunityPinBoard,
} from "../utils/community";
import { useNavigate } from "react-router";

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

    const initializeCommunities = async () => {
      try {
        const communities = await fetchJoinedCommunities();
        setJoinedCommunities(communities);
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
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};
