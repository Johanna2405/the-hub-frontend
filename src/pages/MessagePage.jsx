import { useEffect, useRef } from "react";
import MessageList from "../components/Messaging/MessageList";
import MessageInput from "../components/Messaging/MessageInput";
import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import { setupChatListener, sendMessage, connectUser } from "../utils/messages";
import { useUser } from "../context/UserContext";
import { useCommunity } from "../context/CommunityContext";
import { fetchCommunityMessages } from "../utils/community";

const MessagePage = () => {
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [onlineUserIds, setOnlineUserIds] = useState([]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useUser();
  const user_id = user?.id;
  const { currentCommunity } = useCommunity();
  const isCommunityView = Boolean(currentCommunity?.id);
  const [lastSeenMap, setLastSeenMap] = useState({});

  useEffect(() => {
    if (user?.id) {
      connectUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (!user_id) return;
    if (!currentCommunity) return;

    const cleanup = setupChatListener(
      setMessages,
      setTypingUser,
      setOnlineUserIds,
      setLastSeenMap
    );

    const initializeChat = async () => {
      try {
        const data = await fetchCommunityMessages(currentCommunity?.id);
        setMessages(data);
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };

    initializeChat();

    return () => {
      if (typeof cleanup === "function") {
        cleanup();
      }
    };
  }, [user_id, currentCommunity]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text) => {
    const messageData = {
      user_id: user_id,
      user: user,
      community_id: currentCommunity.id,
      content: text,
    };

    sendMessage(messageData);
  };

  return (
    <>
      <Header
        title={
          isCommunityView
            ? `${currentCommunity.name} Community Chat`
            : "Community Chat"
        }
        showBackButton={true}
        onBack={() => navigate(-1)}
      />

      {!isCommunityView ? (
        <div className="bg-primary rounded-xl p-6 w-full min-h-[65vh] flex items-center justify-center text-center text-lg text-text opacity-60">
          Please select a community to view messages. Private messaging is not
          available at the moment.
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-primary rounded-xl p-4 w-full flex flex-col min-h-[70vh]">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-text text-lg opacity-60 min-h-7">
              Start your community chat here...
            </div>
          </div>
          {typingUser && (
            <div className="flex items-center gap-2 mt-2 ml-1 px-3 py-1 bg-slate-100 rounded-full text-sm text-slate-700 shadow-sm w-fit animate-fade-in">
              <span className="font-medium">{typingUser}</span>
              <span className="flex space-x-1">
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
              </span>
            </div>
          )}
          <MessageInput onSend={handleSend} />
        </div>
      ) : (
        <div className="flex items-end justify-end">
          <div className="bg-primary rounded-xl p-4 w-full flex flex-col justify-end min-h-[75vh]">
            <div className="mb-4 flex items-end justify-end">
              <div
                className="flex-grow overflow-y-auto mb-4 pt-2"
                style={{ maxHeight: "calc(75vh - 100px)" }}
              >
                <MessageList
                  messages={messages}
                  onlineUserIds={onlineUserIds}
                  lastSeenMap={lastSeenMap}
                />
                <div ref={messagesEndRef} />
              </div>
            </div>
            {typingUser && (
              <div className="flex items-center gap-2 mt-2 ml-1 px-3 py-1 bg-slate-100 rounded-full text-sm text-slate-700 shadow-sm w-fit animate-fade-in">
                <span className="font-medium">{typingUser}</span>
                <span className="flex space-x-1">
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                </span>
              </div>
            )}
            <MessageInput onSend={handleSend} />
          </div>
        </div>
      )}
    </>
  );
};

export default MessagePage;
