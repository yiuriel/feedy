import { Routes, Route } from "react-router";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { PrivateAppLayout } from "./components/PrivateAppLayout/PrivateAppLayout";
import { CreateFeedbackForm } from "./pages/CreateFeedbackForm";
import { AnswerFeedbackForm } from "./pages/AnswerFeedbackForm";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/form/:id" element={<AnswerFeedbackForm />} />
      <Route path="app" element={<PrivateAppLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<div>profile</div>} />
        <Route path="create-feedback-form" element={<CreateFeedbackForm />} />
      </Route>
    </Routes>
  );
}
