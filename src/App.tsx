import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthTabs } from './components/auth/AuthTabs';
import { SignupPage } from './pages/SignupPage';
import { ProjectSelectionPage } from './pages/ProjectSelectionPage';
import { CreateProjectPage } from './pages/CreateProjectPage';
import { DashboardLayout } from './layouts/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';
import { UsersPage } from './pages/UsersPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { InventoryPage } from './pages/InventoryPage';
import { FinancePage } from './pages/FinancePage';
import { FundisPage } from './pages/FundisPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<AuthTabs />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/projects"
              element={
                <ProtectedRoute>
                  <ProjectSelectionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/new"
              element={
                <ProtectedRoute>
                  <CreateProjectPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard/:projectId" element={<DashboardPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="inventory" element={<InventoryPage />} />
              <Route path="finance" element={<FinancePage />} />
              <Route path="fundis" element={<FundisPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}