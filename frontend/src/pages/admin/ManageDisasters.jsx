import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import StatusBadge from '../../components/StatusBadge';
import { ShieldAlert, Plus, Edit, Trash2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import api from '../../services/api';
import { readDisasters, subscribeToKey, writeCollection } from '../../services/localStore';

const ManageDisasters = () => {
    const [disasters, setDisasters] = useState(readDisasters());
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name: '', type: '', status: 'Warning', affected: '' });

    useEffect(() => {
        api.get('/disasters').then(res => { setDisasters(res.data); writeCollection('disasters', res.data); }).catch(err => console.warn('API-ready disasters request unavailable', err));
        return subscribeToKey('disasters', () => setDisasters(readDisasters()));
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this incident?')) return;
        try {
            await api.delete(`/disasters/${id}`);
            const next = disasters.filter(d => d.id !== id);
            setDisasters(next);
            writeCollection('disasters', next);
        } catch (e) {
            console.warn('API ready delete failed, applying local mock state', e);
            const next = disasters.filter(d => d.id !== id);
            setDisasters(next);
            writeCollection('disasters', next);
        }
    };
    const openForm = disaster => {
        setEditing(disaster || { id: null });
        setForm(disaster ? { name: disaster.name, type: disaster.type, status: disaster.status, affected: disaster.affected, location: disaster.location || '', lat: disaster.lat || '', lng: disaster.lng || '' } : { name: '', type: '', status: 'Reported', affected: '', location: '', lat: '', lng: '' });
    };
    const saveIncident = event => {
        event.preventDefault();
        if (!form.name.trim() || !form.type.trim()) return;
        const next = editing.id ? disasters.map(item => item.id === editing.id ? { ...item, ...form } : item) : [...disasters, { ...form, id: Date.now(), createdAt: new Date().toISOString() }];
        setDisasters(next);
        writeCollection('disasters', next);
        setEditing(null);
    };

    return (
        <div>
            <PageHeader
                title="Incident Response Management"
                description="Global oversight of active disasters, resource deployment, and triage zones."
                action={<button onClick={() => openForm()} className="btn btn-primary"><Plus size={16} /> New Incident</button>}
            />
            {editing && <form onSubmit={saveIncident} className="card" style={{ marginBottom: '1.5rem' }}><div className="card-body"><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}><input className="form-input" placeholder="Incident name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /><input className="form-input" placeholder="Incident type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} required /><select className="form-input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}><option>Reported</option><option>Active</option><option>Resolved</option></select><input className="form-input" placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required /><input className="form-input" placeholder="Affected count" value={form.affected} onChange={e => setForm({ ...form, affected: e.target.value })} /><input className="form-input" type="number" step="any" placeholder="Latitude" value={form.lat} onChange={e => setForm({ ...form, lat: e.target.value })} /><input className="form-input" type="number" step="any" placeholder="Longitude" value={form.lng} onChange={e => setForm({ ...form, lng: e.target.value })} /></div><div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}><button className="btn btn-primary" type="submit">Save Incident</button><button className="btn btn-secondary" type="button" onClick={() => setEditing(null)}>Cancel</button></div></div></form>}

            {disasters.some(disaster => Number.isFinite(Number(disaster.lat)) && Number.isFinite(Number(disaster.lng))) ? <div className="card" style={{ marginBottom: '1.5rem', overflow: 'hidden' }}>
                <MapContainer center={[Number(disasters.find(disaster => Number.isFinite(Number(disaster.lat)) && Number.isFinite(Number(disaster.lng))).lat), Number(disasters.find(disaster => Number.isFinite(Number(disaster.lat)) && Number.isFinite(Number(disaster.lng))).lng)]} zoom={7} style={{ height: '350px', width: '100%', zIndex: 0 }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
                    {disasters.filter(d => Number.isFinite(Number(d.lat)) && Number.isFinite(Number(d.lng))).map(d => (
                        <Marker key={d.id} position={[Number(d.lat), Number(d.lng)]}>
                            <Popup>
                                <strong>{d.name}</strong><br />
                                Type: {d.type} <br />
                                Status: {d.status}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div> : <div className="card" style={{ marginBottom: '1.5rem' }}><div className="card-body"><p style={{ color: 'var(--text-secondary)' }}>No saved disaster locations are available.</p></div></div>}

            <div className="card">
                <div className="card-header">
                    <ShieldAlert size={18} style={{ marginRight: '0.5rem', display: 'inline-block' }} />
                    Active Command Centers
                </div>
                <div className="card-body">
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-tertiary)' }}>
                                <th style={{ padding: '1rem' }}>Location</th>
                                <th style={{ padding: '1rem' }}>Type</th>
                                <th style={{ padding: '1rem' }}>Severity</th>
                                <th style={{ padding: '1rem' }}>Affected Base</th>
                                <th style={{ padding: '1rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {disasters.map(d => (
                                <tr key={d.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{d.name}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{d.type}</td>
                                    <td style={{ padding: '1rem' }}><StatusBadge status={d.status} /></td>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{d.affected}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button aria-label={`Edit ${d.name}`} className="btn btn-secondary" onClick={() => openForm(d)} style={{ padding: '0.4rem 0.5rem', fontSize: '0.75rem' }}><Edit size={14} /></button>
                                            <button className="btn btn-secondary" onClick={() => handleDelete(d.id)} style={{ padding: '0.4rem 0.5rem', fontSize: '0.75rem', color: 'var(--color-danger)' }}><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default ManageDisasters;
