import MessageBubble from "./MessageBubble";

const MessageList = ({ messages, currentUserId }) => {
  return (
    <div>
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
};

export default MessageList;
