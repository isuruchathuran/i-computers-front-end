import { Route, Routes } from "react-router-dom";
import Test from "./components/test";
import AdminPage from "./pages/admin";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/admin/register";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div className="w-full h-screen bg-[#0b0f19] text-white overflow-y-auto">
      <Toaster position="top-center" toastOptions={{
          style: {
              background: '#1f2937',
              color: '#fff',
          },
      }}/>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/admin/*" element={
            <ProtectedRoute roleRequired="admin">
                <AdminPage />
            </ProtectedRoute>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/test" element={<Test/>} />
      </Routes>
    </div>
  );
}
