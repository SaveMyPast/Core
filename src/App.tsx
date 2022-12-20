import * as React from "react";
import "./App.css";
import Welcome from "./routes/Welcome";
import { Route, Routes } from "react-router-dom";
import Profile from "./routes/Profile";
import Prompts from "./routes/Prompts";
import Settings from "./routes/Settings";
import Timeline from "./routes/Timeline";
import Administration from "./routes/Administration";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Navigation from "./components/general/navigation/Navigation";
import Login from "./components/general/Auth/Login";
import ForgotPassword from "./components/general/Auth/ForgotPassword";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./services/firebase";

function App() {
  const [user] = useAuthState(auth);
  if (!user) {
    return (
      <>
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/prompts" element={<Prompts />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/administration" element={<Administration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
