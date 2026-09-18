import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import {
    LayoutDashboard, AlertTriangle, HandHeart,
    Package, MapPin, HeartHandshake, Bell, User, Settings, Archive
} from 'lucide-react';

const userNavItems = [
    { label: 'Dashboard', path: '/user/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'Disasters', path: '/user/disasters', icon: <AlertTriangle size={18} /> },
    { label: 'Request Help', path: '/user/request-help', icon: <HandHeart size={18} /> },
    { label: 'My Requests', path: '/user/my-requests', icon: <Archive size={18} /> },
    { label: 'Resources', path: '/user/resources', icon: <Package size={18} /> },
    { label: 'Relief Centers', path: '/user/relief-centers', icon: <MapPin size={18} /> },
    { label: 'Volunteer', path: '/user/volunteer', icon: <HeartHandshake size={18} /> },
    { label: 'Notifications', path: '/user/notifications', icon: <Bell size={18} /> },
    { label: 'Profile', path: '/user/profile', icon: <User size={18} /> },
    { label: 'Settings', path: '/user/settings', icon: <Settings size={18} /> }
];

const UserLayout = () => {
    return (
        <div className="app-container">
            <Sidebar navItems={userNavItems} />
            <div className="main-content">
                <Topbar />
                <main className="page-wrapper">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default UserLayout;
