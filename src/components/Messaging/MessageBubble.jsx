const MessageBubble = ({ message, currentUserId }) => {
  const isOwn = message.userId === currentUserId;
  const username = message.username || "Unknown";
  const profilePicture = message.profilePicture;

  return (
    <div className={`chat ${isOwn ? "chat-end" : "chat-start"} my-4`}>
      {!isOwn && (
        <div className="flex flex-row items-center gap-2 pb-2 pl-14">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-base flex items-center justify-center">
              <p>
                <i className="fi fi-rr-user text"></i>
              </p>
            </div>
          )}
          <p>
            <span className="font-bold text-text">{username}</span>
          </p>
        </div>
      )}

      <div
        className={`${
          isOwn ? "chat-bubble-lilac" : "chat-bubble-sage"
        } break-words whitespace-pre-wrap`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;
