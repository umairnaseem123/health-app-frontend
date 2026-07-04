import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import SymptomFormPage from "./pages/SymptomChecker/SymptomFormPage";
import ResultPage from "./pages/SymptomChecker/ResultPage";
import BPTrackerPage from "./pages/BPTracker/BPTrackerPage";
import ReportUploadPage from "./pages/ReportUpload/ReportUploadPage";
import EmergencyPage from "./pages/Emergency/EmergencyPage";
import HistoryPage from "./pages/History/HistoryPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/symptom-checker"
          element={
            <ProtectedRoute>
              <SymptomFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/symptom-checker/result"
          element={
            <ProtectedRoute>
              <ResultPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bp-tracker"
          element={
            <ProtectedRoute>
              <BPTrackerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportUploadPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/emergency"
          element={
            <ProtectedRoute>
              <EmergencyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
