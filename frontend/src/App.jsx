import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// User Dashboards & Pages
import UserDashboard from './pages/user/Dashboard';
import UserDisasters from './pages/user/Disasters';
import UserRequestHelp from './pages/user/RequestHelp';
import UserMyRequests from './pages/user/MyRequests';
import UserResources from './pages/user/Resources';
import UserReliefCenters from './pages/user/ReliefCenters';
import UserVolunteer from './pages/user/Volunteer';
import UserNotifications from './pages/user/Notifications';
import UserProfile from './pages/user/Profile';
import UserSettings from './pages/user/Settings';

// Admin Dashboards & Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminManageDisasters from './pages/admin/ManageDisasters';
import AdminReliefRequests from './pages/admin/ReliefRequests';
import AdminResources from './pages/admin/Resources';
import AdminReliefCenters from './pages/admin/ReliefCenters';
import AdminVolunteers from './pages/admin/Volunteers';
import AdminReports from './pages/admin/Reports';
import AdminNotifications from './pages/admin/Notifications';
import AdminUsers from './pages/admin/Users';
import AdminSettings from './pages/admin/Settings';
import AdminLocationMap from './pages/admin/LocationMap';

// Fallback
import Fallback from './pages/Fallback';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) {
    return <Navigate to={user.role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard'} replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Routes */}
      <Route path="/user" element={<ProtectedRoute role="USER"><UserLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/user/dashboard" replace />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="disasters" element={<UserDisasters />} />
        <Route path="request-help" element={<UserRequestHelp />} />
        <Route path="my-requests" element={<UserMyRequests />} />
        <Route path="resources" element={<UserResources />} />
        <Route path="relief-centers" element={<UserReliefCenters />} />
        <Route path="volunteer" element={<UserVolunteer />} />
        <Route path="notifications" element={<UserNotifications />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="settings" element={<UserSettings />} />
        {/* Catch-all for undefined user routes */}
        <Route path="*" element={<Fallback />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute role="ADMIN"><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="manage-disasters" element={<AdminManageDisasters />} />
        <Route path="relief-requests" element={<AdminReliefRequests />} />
        <Route path="resources" element={<AdminResources />} />
        <Route path="relief-centers" element={<AdminReliefCenters />} />
        <Route path="volunteers" element={<AdminVolunteers />} />
        <Route path="location-map" element={<AdminLocationMap />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="settings" element={<AdminSettings />} />
        {/* Catch-all for undefined admin routes */}
        <Route path="*" element={<Fallback />} />
      </Route>

      {/* Global Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
