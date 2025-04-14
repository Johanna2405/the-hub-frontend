import { useUser } from "../../context/UserContext";
import { formatTimeAgo } from "../../utils/helpers";

const MessageBubble = ({ message, onlineUserIds, lastSeenMap }) => {
  const { user } = useUser();
  const user_id = user?.id;
  const user_name = user?.name;

  const isOwn = message.user_id === user_id;
  const username = message.User?.username || user_name || "Unknown User";
  const profilePicture = message.User?.profile_picture || null;
  const isOnline = onlineUserIds.includes(String(message.user_id));
  const lastSeen = lastSeenMap?.[message.user_id];

  const isLastSeen = !isOnline && !!lastSeen;
  const statusMessage = isOnline
    ? "Active"
    : isLastSeen
    ? `Last seen ${formatTimeAgo(lastSeen)}`
    : "Offline";

  return (
    <div className={`chat ${isOwn ? "chat-end" : "chat-start"} my-4`}>
      {!isOwn && (
        <div className="flex flex-row items-center gap-2 pb-2 pl-14">
          {profilePicture ? (
            <div className="relative w-8 h-8 group">
              <img
                src={profilePicture}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span
                className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white 
                  ${isOnline ? "bg-green-500 animate-ping-once" : "bg-gray-400"}
                `}
              >
                <span
                  className={`
                    absolute top-[40%] left-2 
                    ${
                      isLastSeen
                        ? "px-1.5 py-0.5 text-[10px] leading-tight"
                        : "px-2 py-0.5 text-xs"
                    }
                    text-white rounded shadow-lg z-10
                    opacity-0 group-hover:opacity-100 
                    transition-opacity duration-200
                    after:content-[''] after:absolute after:-top-1 after:left-2
                    after:border-4 after:border-transparent
                    ${
                      isOnline
                        ? "bg-green-500 after:border-b-green-500"
                        : "bg-slate-500 after:border-b-slate-500"
                    }
                  `}
                >
                  {statusMessage}
                </span>
              </span>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-base flex items-center justify-center relative group">
              <p>
                <i className="fi fi-rr-user text"></i>
              </p>
              <span
                className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white 
                ${isOnline ? "bg-green-500 animate-ping-once" : "bg-gray-400"}
              `}
              >
                <span
                  className={`
                    absolute top-[40%] left-2 
                    ${
                      isLastSeen
                        ? "px-1 py-0.5 text-[10px] leading-tight w-24"
                        : "px-2 py-0.5 text-xs"
                    }
                    text-white rounded shadow-lg z-10
                    opacity-0 group-hover:opacity-100 
                    transition-opacity duration-200
                    after:content-[''] after:absolute after:-top-1 after:left-2
                    after:border-4 after:border-transparent
                    ${
                      isOnline
                        ? "bg-green-500 after:border-b-green-500"
                        : "bg-slate-500 after:border-b-slate-500"
                    }
                  `}
                >
                  {statusMessage}
                </span>
              </span>
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
