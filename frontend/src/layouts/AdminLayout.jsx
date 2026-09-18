import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import {
    LayoutDashboard, ShieldAlert, FileText,
    Package, MapPin, Users, FileBarChart, Bell, Settings, MapPinned
} from 'lucide-react';

const adminNavItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'Disasters', path: '/admin/manage-disasters', icon: <ShieldAlert size={18} /> },
    { label: 'Relief Requests', path: '/admin/relief-requests', icon: <FileText size={18} /> },
    { label: 'Resources', path: '/admin/resources', icon: <Package size={18} /> },
    { label: 'Resource Centers', path: '/admin/relief-centers', icon: <MapPin size={18} /> },
    { label: 'Volunteers', path: '/admin/volunteers', icon: <Users size={18} /> },
    { label: 'Users', path: '/admin/users', icon: <Users size={18} /> },
    { label: 'Location Map', path: '/admin/location-map', icon: <MapPinned size={18} /> },
    { label: 'Notifications', path: '/admin/notifications', icon: <Bell size={18} /> },
    { label: 'Reports', path: '/admin/reports', icon: <FileBarChart size={18} /> },
    { label: 'Settings', path: '/admin/settings', icon: <Settings size={18} /> }
];

const AdminLayout = () => {
    return (
        <div className="app-container">
            <Sidebar navItems={adminNavItems} />
            <div className="main-content">
                <Topbar />
                <main className="page-wrapper">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
