import { useUser } from "../../context/UserContext";

const MessageBubble = ({ message, onlineUserIds }) => {
  const { user } = useUser();
  const user_id = user?.id;
  const user_name = user?.name;

  const isOwn = message.user_id === user_id;
  const username = message.User?.username || user_name || "Unknown User";
  const profilePicture = message.User?.profile_picture || null;
  const isOnline = onlineUserIds.includes(String(message.user_id));

  return (
    <div className={`chat ${isOwn ? "chat-end" : "chat-start"} my-4`}>
      {!isOwn && (
        <div className="flex flex-row items-center gap-2 pb-2 pl-14">
          {profilePicture ? (
            <div className="relative w-8 h-8">
              <img
                src={profilePicture}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              {isOnline && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-base flex items-center justify-center relative">
              <p>
                <i className="fi fi-rr-user text"></i>
              </p>
              {isOnline && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
              )}
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
        {message.content}
      </div>
    </div>
  );
};

export default MessageBubble;
