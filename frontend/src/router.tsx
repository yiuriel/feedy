import { Routes, Route } from "react-router";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { PrivateAppLayout } from "./components/PrivateAppLayout/PrivateAppLayout";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="app" element={<PrivateAppLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<div>profile</div>} />
      </Route>
    </Routes>
  );
}
