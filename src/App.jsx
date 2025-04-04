import { BrowserRouter, Routes, Route } from "react-router";
import { UserProvider } from "./context/UserContext.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import SignedOutLayout from "./layouts/SignedOutLayout.jsx";
import Home from "./pages/Home.jsx";
import MessagePage from "./pages/MessagePage.jsx";
import SignUp from "./pages/SignUp.jsx";
import PinBoard from "./pages/PinBoard.jsx";
import SignIn from "./pages/SignIn.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import ListPage from "./pages/ListPage.jsx";
import NewListPage from "./pages/NewListPage.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import CalendarTabs from "./components/Calendar/CalendarTabs.jsx";
import ProfileSettings from "./pages/ProfileSettings.jsx";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="messages" element={<MessagePage />} />
              <Route path="pinboard" element={<PinBoard />} />
              <Route path="posts" element={<PostPage />} />
              <Route path="lists" element={<ListPage />} />
              <Route path="add-list" element={<NewListPage />} />
              <Route path="calendartabs" element={<CalendarTabs />} />
              <Route path="profile-settings" element={<ProfileSettings />} />
            </Route>
            <Route path="/" element={<SignedOutLayout />}>
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="onboarding" element={<Onboarding />} />
            </Route>
            <Route path="get-started" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;