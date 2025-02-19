import { Routes, Route } from "react-router";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/private/Dashboard";
import { PrivateAppLayout } from "./components/PrivateAppLayout/PrivateAppLayout";
import { CreateFeedbackForm } from "./pages/private/CreateFeedbackForm";
import { AnswerFeedbackForm } from "./pages/AnswerFeedbackForm";
import { Forms } from "./pages/private/Forms";
import { Analytics } from "./pages/private/Analytics";
import { Profile } from "./pages/private/Profile";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/form/:id" element={<AnswerFeedbackForm />} />
      <Route path="app" element={<PrivateAppLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="forms" element={<Forms />} />
        <Route path="profile" element={<Profile />} />
        <Route path="create-feedback-form" element={<CreateFeedbackForm />} />
      </Route>
    </Routes>
  );
}
