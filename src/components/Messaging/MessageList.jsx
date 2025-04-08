import MessageBubble from "./MessageBubble";

const MessageList = ({ messages }) => {
  return (
    <div>
      {messages.map((msg, index) => (
        <MessageBubble key={msg.id ?? index} message={msg} />
      ))}
    </div>
  );
};

export default MessageList;
