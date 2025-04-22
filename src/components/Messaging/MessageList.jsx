import MessageBubble from "./MessageBubble";

const MessageList = ({ messages, onlineUserIds, lastSeenMap }) => {
  return (
    <div>
      {messages.map((msg, index) => (
        <MessageBubble
          key={msg.id ?? index}
          message={msg}
          onlineUserIds={onlineUserIds || []}
          lastSeenMap={lastSeenMap || {}}
        />
      ))}
    </div>
  );
};

export default MessageList;
