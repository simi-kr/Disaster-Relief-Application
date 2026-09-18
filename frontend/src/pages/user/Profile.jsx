import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const saveProfile = () => {
        if (!name.trim()) return;
        updateUser({ name: name.trim() });
        setEditing(false);
    };
    return (
        <div>
            <PageHeader
                title="User Profile"
                description="Manage your identity, standard gear, and certifications."
            />

            <div className="card" style={{ maxWidth: '600px' }}>
                <div className="card-header">
                    <User size={18} style={{ marginRight: '0.5rem', display: 'inline-block' }} />
                    Personal Information
                </div>
                <div className="card-body">
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-full)', background: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700 }}>
                            {(name || '?').charAt(0).toUpperCase()}
                        </div>
                        <div>
                            {editing ? <input className="form-input" value={name} onChange={event => setName(event.target.value)} /> : <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{name || 'Responder'}</h3>}
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{user?.role === 'ADMIN' ? 'Admin / Officer' : 'Field Responder'}</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div style={{ background: 'var(--bg-app)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Contact Number</span>
                            <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{user?.email || 'Not provided'}</span>
                        </div>
                        <div style={{ background: 'var(--bg-app)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Base Sector</span>
                            <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>Not provided</span>
                        </div>
                    </div>

                    <button onClick={() => editing ? saveProfile() : setEditing(true)} className="btn btn-secondary" style={{ marginTop: '2rem' }}>{editing ? 'Save Profile' : 'Edit Profile'}</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
