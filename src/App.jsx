import { BrowserRouter, Routes, Route } from "react-router";
import { UserProvider } from "./context/UserContext.jsx";
import { CommunityProvider } from "./context/CommunityContext.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import SignedOutLayout from "./layouts/SignedOutLayout.jsx";
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
import Settings from "./pages/Settings.jsx";
import { ToastContainer } from "react-toastify";
import "./toast.css";

function App() {
  return (
    <>
      <UserProvider>
        <CommunityProvider>
          <BrowserRouter>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
            />
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<PinBoard />} />
                <Route path="messages" element={<MessagePage />} />
                <Route path="posts" element={<PostPage />} />
                <Route path="lists" element={<ListPage />} />
                <Route path="add-list" element={<NewListPage />} />
                <Route path="calendartabs" element={<CalendarTabs />} />
                <Route path="settings" element={<Settings />} />
                {/* Community Routes */}
                <Route path="community/:communityId">
                  <Route path="posts" element={<PostPage />} />
                  <Route path="messages" element={<MessagePage />} />
                  <Route path="lists" element={<ListPage />} />
                  <Route path="add-list" element={<NewListPage />} />
                  <Route path="calendar" element={<CalendarTabs />} />
                </Route>
              </Route>
              <Route path="/" element={<SignedOutLayout />}>
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="onboarding" element={<Onboarding />} />
              </Route>
              <Route path="get-started" element={<LandingPage />} />
            </Routes>
          </BrowserRouter>
        </CommunityProvider>
      </UserProvider>
    </>
  );
}

export default App;
