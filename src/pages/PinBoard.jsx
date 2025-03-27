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
      <div className="grid grid-cols-2 ">
        <ListCard />
        <PostCard />
        <EventCard />
        <MessageCard />
      </div>
    </div>
  );
};

export default PinBoard;
