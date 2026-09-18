import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { Settings as SettingsIcon, Server } from 'lucide-react';
import { readCollectionByKey, writeCollection } from '../../services/localStore';

const AdminSettings = () => {
    const [settings, setSettings] = useState(() => ({ registrationOpen: true, maintenance: false, ...readCollectionByKey('adminSettings', {}) }));
    const toggle = key => setSettings(current => { const next = { ...current, [key]: !current[key] }; writeCollection('adminSettings', next); return next; });
    return (
        <div>
            <PageHeader
                title="Command Center Settings"
                description="Global application rules, API keys, and maintenance mode parameters."
            />

            <div className="card" style={{ maxWidth: '700px' }}>
                <div className="card-header">
                    <Server size={18} style={{ marginRight: '0.5rem', display: 'inline-block' }} />
                    Architecture Configuration
                </div>
                <div className="card-body">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>New Responder Registration</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Allow open signups for new field volunteers</p>
                            </div>
                            <button onClick={() => toggle('registrationOpen')} className={`btn ${settings.registrationOpen ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.4rem 0.75rem' }}>{settings.registrationOpen ? 'Open' : 'Closed'}</button>
                        </div>

                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>System Status Lockout</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Enable MAINTENANCE MODE (Force disconnect all users)</p>
                            </div>
                            <button onClick={() => toggle('maintenance')} className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}>{settings.maintenance ? 'Activated' : 'Deactivated'}</button>
                        </div>

                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem' }}>Telemetry API Node</h4>
                            <input type="text" className="form-input" style={{ width: '100%' }} defaultValue="wss://telemetry.core.local/v2/stream" disabled />
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>Changing the global telemetry endpoint requires sysadmin root.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
