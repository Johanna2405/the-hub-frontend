import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import MessagePage from "./pages/MessagePage.jsx";
import SignUp from "./pages/SignUp.jsx";
import PinBoard from "./pages/PinBoard.jsx";
import SignIn from "./pages/SignIn.jsx";
import DailyCalendar from "./components/Calendar/DailyCalendar.jsx";
import WeeklyCalendar from "./components/Calendar/WeeklyCalendar.jsx";

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
            <Route path="signin" element={<SignIn />} />
            <Route path="dailycalendar" element={<DailyCalendar />} />
            <Route path="weeklycalendar" element={<WeeklyCalendar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
