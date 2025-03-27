import PostCard from "../components/PinBoard/PostCard";
import EventCard from "../components/PinBoard/EventCard";
import ListCard from "../components/PinBoard/ListCard";
import CardFilter from "../components/PinBoard/CardFilter";
import MessageCard from "../components/PinBoard/MessageCard";

const PinBoard = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-4">
      <h2 className="text-neon">Hello username</h2>
      <h1>Good Morning</h1>
      <CardFilter />
      <div className="flex">
        {/* Column A */}
        <div className="flex flex-col w-1/2">
          <ListCard />
          <EventCard />
        </div>

        {/* Column B */}
        <div className="flex flex-col w-1/2">
          <PostCard />
          <MessageCard />
        </div>
      </div>
    </div>
  );
};

export default PinBoard;
