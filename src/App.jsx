import { useState } from "react";
import PostCard from "./components/PinBoard/PostCard";
import ListCard from "./components/PinBoard/ListCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="flex items-center justify-center min-h-screen text-6xl text-green-300">
        The Hub frontend page
      </h1>
      <PostCard />
      <ListCard />
    </>
  );
}

export default App;
