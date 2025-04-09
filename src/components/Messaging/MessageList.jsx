import MessageBubble from "./MessageBubble";

const MessageList = ({ messages, onlineUserIds }) => {
  return (
    <div>
      {messages.map((msg, index) => (
        <MessageBubble
          key={msg.id ?? index}
          message={msg}
          onlineUserIds={onlineUserIds}
        />
      ))}
    </div>
  );
};

export default MessageList;
