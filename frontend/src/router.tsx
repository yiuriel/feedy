import { Routes, Route } from 'react-router';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
