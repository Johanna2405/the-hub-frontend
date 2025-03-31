import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";
import SignedOutLayout from "./layouts/SignedOutLayout.jsx";
import Home from "./pages/Home.jsx";
import MessagePage from "./pages/MessagePage.jsx";
import SignUp from "./pages/SignUp.jsx";
import PinBoard from "./pages/PinBoard.jsx";
import SignIn from "./pages/SignIn.jsx";
import DailyCalendar from "./components/Calendar/DailyCalendar.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import WeeklyCalendar from "./components/Calendar/WeeklyCalendar.jsx";
import MonthlyCalendar from "./components/Calendar/MonthlyCalendar.jsx";
import PostPage from "./pages/PostPage.jsx";
import ListPage from "./pages/ListPage.jsx";
import NewListPage from "./pages/NewListPage.jsx";
import Onboarding from "./pages/Onboarding.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="messages" element={<MessagePage />} />
            <Route path="pinboard" element={<PinBoard />} />
            <Route path="dailycalendar" element={<DailyCalendar />} />
            <Route path="weeklycalendar" element={<WeeklyCalendar />} />
            <Route path="monthlycalendar" element={<MonthlyCalendar />} />
            <Route path="posts" element={<PostPage />} />
            <Route path="lists" element={<ListPage />} />
            <Route path="add-list" element={<NewListPage />} />
          </Route>
          <Route path="/" element={<SignedOutLayout />}>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="onboarding" element={<Onboarding />} />
          </Route>
          <Route path="get-started" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
