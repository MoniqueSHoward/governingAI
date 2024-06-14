import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ChatbotPage from "./pages/ChatbotPage";
import Landing from "./pages/LandingPage";
import Error from "./pages/Error";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import GuidingPrinciplesPage from "./pages/GuidingPrinciplesPage"
import IntagePage from "./pages/IntakePage";

const AppRouter = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route index element={<Landing/>}  />
            <Route path="/chat" element={<ChatbotPage/>}  />
            <Route path="/dashboard" element={<DashboardPage/>}  />
            <Route path="/guiding-principles" element={<GuidingPrinciplesPage/>}  />
            <Route path="/intake" element={<IntagePage/>}  />
            <Route path="/profile" element={<ProfilePage/>}  />
            <Route path="*" element={<Error/>}  />
        </Routes>
        </BrowserRouter>
    </div>
  );
};

export default AppRouter;
