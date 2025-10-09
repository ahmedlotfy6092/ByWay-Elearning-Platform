import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import { AdminLayout } from "./components/AdminLayout";
import { Dashboard } from "./components/Dashboard";
import { InstructorsPage } from "./components/InstructorsPage";
import CoursesPage from "./components/CoursesPage";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/instructors"
          element={
            <AdminLayout>
              <InstructorsPage />
            </AdminLayout>
          }
        />
        <Route
          path="/courses"
          element={
            <AdminLayout>
              <CoursesPage />
            </AdminLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
