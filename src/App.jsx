import { BrowserRouter, Routes, Route } from "react-router";
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
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="messages"
              element={
                <ProtectedRoute>
                  <MessagePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="pinboard"
              element={
                <ProtectedRoute>
                  <PinBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="posts"
              element={
                <ProtectedRoute>
                  <PostPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="lists"
              element={
                <ProtectedRoute>
                  <ListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="add-list"
              element={
                <ProtectedRoute>
                  <NewListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="calendartabs"
              element={
                <ProtectedRoute>
                  <CalendarTabs />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile-settings"
              element={
                <ProtectedRoute>
                  <ProfileSettings />
                </ProtectedRoute>
              }
            />
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
