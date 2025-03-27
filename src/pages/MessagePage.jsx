import { useEffect, useRef } from "react";
import MessageList from "../components/Messaging/MessageList";
import MessageInput from "../components/Messaging/MessageInput";
import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router";

const MessagePage = () => {
  const navigate = useNavigate();
  //   const currentUserId = 101;

  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text) => {
    setMessages([
      ...messages,
      {
        id: Date.now(),
        text,
        // userId: currentUserId,
      },
    ]);
  };

  return (
    <>
      <Header
        title="Community Chat"
        showBackButton={true}
        onBack={() => navigate(-1)}
      />
      {messages.length === 0 ? (
        <div className="bg-primary rounded-xl p-4 w-full flex flex-col min-h-[70vh]">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-text text-lg opacity-60 min-h-7">
              Start your community chat here...
            </div>
          </div>
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
                  //   currentUserId={currentUserId}
                />
                <div ref={messagesEndRef} />
              </div>
            </div>
            <MessageInput onSend={handleSend} />
          </div>
        </div>
      )}
    </>
  );
};

export default MessagePage;
