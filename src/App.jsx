import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import MessagePage from "./pages/MessagePage.jsx";
import SignUp from "./pages/SignUp.jsx";
import PinBoard from "./pages/PinBoard.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="messages" element={<MessagePage />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="pinboard" element={<PinBoard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
