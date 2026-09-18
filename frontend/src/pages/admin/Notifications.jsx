import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { Send, Bell } from 'lucide-react';
import { addNotification, readNotifications, subscribeToKey } from '../../services/localStore';

const AdminNotifications = () => {
    const [form, setForm] = useState({ severity: 'General Update', sector: 'All Global Units (System Wide)', title: '', message: '' });
    const [feedback, setFeedback] = useState('');
    const [notifications, setNotifications] = useState(readNotifications());
    useEffect(() => subscribeToKey('notifications', () => setNotifications(readNotifications())), []);
    const submit = event => { event.preventDefault(); if (!form.title.trim() || !form.message.trim()) { setFeedback('Enter a title and message before broadcasting.'); return; } addNotification(form); setFeedback('Broadcast queued for delivery.'); setForm({ ...form, title: '', message: '' }); };
    return (
        <div>
            <PageHeader
                title="Broadcast Push Notifications"
                description="Force system-wide alerts, SMS, and app notifications to all active bases."
            />

            <div className="card" style={{ maxWidth: '800px' }}>
                <div className="card-header">
                    <Bell size={18} style={{ marginRight: '0.5rem', display: 'inline-block' }} />
                    New Announcement
                </div>
                <div className="card-body">
                    <form onSubmit={submit}>
                        <div className="form-group">
                            <label className="form-label">Alert Severity</label>
                            <select name="severity" value={form.severity} onChange={event => setForm({ ...form, severity: event.target.value })} className="form-input">
                                <option>General Update</option>
                                <option>Important (Yellow)</option>
                                <option>CRITICAL EVACUATION ALERT (Red)</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Target Audience Sector</label>
                            <select name="sector" value={form.sector} onChange={event => setForm({ ...form, sector: event.target.value })} className="form-input">
                                <option>All Global Units (System Wide)</option>
                                <option>Central Operations</option>
                                <option>Kochi Sector</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Message Title</label>
                            <input value={form.title} onChange={event => setForm({ ...form, title: event.target.value })} type="text" className="form-input" placeholder="e.g. Idukki Dam Gates Opening" />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Transmission Summary</label>
                            <textarea value={form.message} onChange={event => setForm({ ...form, message: event.target.value })} className="form-input" rows="4" placeholder="Type the broadcast message..."></textarea>
                        </div>
                        {feedback && <p role="status" style={{ marginTop: '1rem', color: 'var(--color-info-text)' }}>{feedback}</p>}

                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button type="submit" className="btn btn-primary" style={{ background: 'var(--color-danger)', boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)' }}><Send size={16} /> Broadcast ALERT</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="card" style={{ maxWidth: '800px', marginTop: '1.5rem' }}><div className="card-header"><Bell size={18} style={{ marginRight: '0.5rem', display: 'inline-block' }} />Workflow Notifications</div><div className="card-body">{notifications.filter(notification => notification.recipientRole === 'ADMIN').map(notification => <div key={notification.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)' }}><strong>{notification.title}</strong><p style={{ color: 'var(--text-secondary)', margin: '0.35rem 0' }}>{notification.message}</p><span style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>{new Date(notification.createdAt).toLocaleString()}</span></div>)}{!notifications.some(notification => notification.recipientRole === 'ADMIN') && <p style={{ color: 'var(--text-secondary)' }}>No volunteer workflow notifications.</p>}</div></div>
        </div>
    );
};

export default AdminNotifications;
