import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShieldAlert, LogOut, Siren } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ navItems }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: 'rgba(255, 90, 31, 0.1)', color: 'var(--brand-primary)', borderRadius: 'var(--radius-sm)' }}>
                    <ShieldAlert size={20} />
                </div>
                <div className="sidebar-brand">
                    <h1>Resilio Command</h1>
                    <span>Alpha Division • Sector 07</span>
                </div>
            </div>

            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--brand-secondary-hover)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShieldAlert size={16} color="var(--brand-primary)" />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>Task Force Alpha</h4>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Severe (DEFCON 2)</span>
                    </div>
                </div>
            </div>

            <nav className="sidebar-nav">
                <div className="sidebar-section-title">Tactical Controls</div>
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                            `sidebar-nav-item ${isActive ? 'active' : ''}`
                        }
                    >
                        {item.icon}
                        <span>{item.label}</span>
                        {item.label === 'Volunteer Units' && (
                            <span style={{ marginLeft: 'auto', background: 'rgba(239,68,68,0.2)', color: 'var(--color-danger-text)', padding: '0.125rem 0.35rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700 }}>12</span>
                        )}
                        {item.label === 'Incident Control' && (
                            <span style={{ marginLeft: 'auto', background: 'var(--brand-primary)', color: '#fff', padding: '0.125rem 0.35rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700 }}>3</span>
                        )}
                    </NavLink>
                ))}
            </nav>
            <div className="sidebar-footer">
                <button onClick={() => navigate(user?.role === 'ADMIN' ? '/admin/notifications' : '/user/request-help')} style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-primary)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>
                    <Siren size={16} color="var(--brand-primary)" />
                    Broadcast Alert
                </button>

                <div style={{ padding: '0.75rem 1.25rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>Role Mode:</span>
                        <span style={{ color: 'var(--text-primary)' }}>{user?.role === 'ADMIN' ? 'Admin' : 'User'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>System Logs:</span>
                        <span>v2.4.1</span>
                    </div>
                </div>

                <button onClick={() => { logout(); navigate('/login'); }} className="sidebar-nav-item" style={{ marginTop: '0.5rem', width: '100%', textAlign: 'left' }}>
                    <LogOut size={16} />
                    <span>Log Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
