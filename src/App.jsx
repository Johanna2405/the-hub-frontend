import { BrowserRouter, Routes, Route } from "react-router";
import { UserProvider } from "./context/UserContext.jsx";
import { CommunityProvider } from "./context/CommunityContext.jsx";
import { ToastContainer } from "react-toastify";
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
import Settings from "./pages/Settings.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./toast.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <CommunityProvider>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
            />
            <Routes>
              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<PinBoard />} />
                <Route path="messages" element={<MessagePage />} />
                <Route path="posts" element={<PostPage />} />
                <Route path="lists" element={<ListPage />} />
                <Route path="add-list" element={<NewListPage />} />
                <Route path="settings" element={<Settings />} />

                {/* Community Routes */}
                <Route path="community/:communityId">
                  <Route path="pinboard" element={<PinBoard />} />
                  <Route path="posts" element={<PostPage />} />
                  <Route path="messages" element={<MessagePage />} />
                  <Route path="lists" element={<ListPage />} />
                  <Route path="add-list" element={<NewListPage />} />
                </Route>
              </Route>

              {/* Public Routes */}
              <Route path="/" element={<SignedOutLayout />}>
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
              </Route>
              <Route path="get-started" element={<LandingPage />} />
            </Routes>
          </CommunityProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
