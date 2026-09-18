import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, MapPin, Radio, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Topbar = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const routePrefix = user?.role === 'ADMIN' ? '/admin' : '/user';
    const [search, setSearch] = useState('');

    const handleSearch = (event) => {
        if (event.key === 'Enter' && search.trim()) {
            navigate(`${routePrefix}/disasters?search=${encodeURIComponent(search.trim())}`);
        }
    };

    return (
        <header className="topbar">
            <div className="topbar-left">
                <div className="defcon-badge">
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-danger)' }}></div>
                    DEFCON 2 Active
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Radio size={14} /> Kerala Coastal Cyclone & Monsoon Relief Grid Synced
                </div>
            </div>

            <div className="topbar-right">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginRight: '1rem', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>National Crisis Hotline:</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>112 / 1077</span>
                    <span style={{ color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-success)' }}></div>
                        All 4 Sat-Links Operational
                    </span>
                </div>

                <div style={{ position: 'relative' }}>
                    <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleSearch} placeholder="Search disasters, centers..." style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.5rem 1rem 0.5rem 2rem', fontSize: '0.85rem', color: '#fff', width: '240px', outline: 'none' }} />
                </div>

                <button className="icon-btn" onClick={() => navigate(`${routePrefix}/notifications`)} aria-label="Open notifications">
                    <Bell size={18} />
                </button>
                <button className="icon-btn" onClick={() => navigate(user?.role === 'ADMIN' ? '/admin/location-map' : '/user/relief-centers')} aria-label="Open location map">
                    <MapPin size={18} />
                </button>

                <button className="btn btn-primary" onClick={() => navigate(user?.role === 'ADMIN' ? '/admin/relief-requests' : '/user/request-help')} style={{ padding: '0.5rem 1rem' }}>
                    + Request Help
                </button>
            </div>
        </header>
    );
};

export default Topbar;
