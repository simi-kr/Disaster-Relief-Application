import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { Settings as SettingsIcon } from 'lucide-react';
import { readCollectionByKey, writeCollection } from '../../services/localStore';
import { useAuth } from '../../context/AuthContext';

const Settings = () => {
    const { user } = useAuth();
    const settingsKey = `userSettings:${user?.email || 'current'}`;
    const [settings, setSettings] = useState(() => ({ notifications: true, gps: true, saver: false, ...readCollectionByKey(`userSettings:${user?.email || 'current'}`, {}) }));
    const toggle = key => setSettings(current => { const next = { ...current, [key]: !current[key] }; writeCollection(settingsKey, next); return next; });
    return (
        <div>
            <PageHeader
                title="Settings"
                description="System preferences, notification management, and privacy."
            />

            <div className="card" style={{ maxWidth: '600px' }}>
                <div className="card-header">
                    <SettingsIcon size={18} style={{ marginRight: '0.5rem', display: 'inline-block' }} />
                    Application Preferences
                </div>
                <div className="card-body">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>Push Notifications</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Receive critical alerts on your mobile device</p>
                            </div>
                            <button onClick={() => toggle('notifications')} className={`btn ${settings.notifications ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.4rem 0.75rem' }}>{settings.notifications ? 'Enabled' : 'Disabled'}</button>
                        </div>

                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>GPS Tracking</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Allow system to locate you for precise routing</p>
                            </div>
                            <button onClick={() => toggle('gps')} className={`btn ${settings.gps ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.4rem 0.75rem' }}>{settings.gps ? 'Enabled' : 'Disabled'}</button>
                        </div>

                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>Data Saver Mode</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Reduce map fidelity for low bandwidth zones</p>
                            </div>
                            <button onClick={() => toggle('saver')} className={`btn ${settings.saver ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.4rem 0.75rem' }}>{settings.saver ? 'Enabled' : 'Disabled'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
