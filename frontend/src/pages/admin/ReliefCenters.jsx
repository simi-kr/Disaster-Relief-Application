import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import StatusBadge from '../../components/StatusBadge';
import { MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import { readReliefCenters, subscribeToKey, writeCollection } from '../../services/localStore';

const AdminReliefCenters = () => {
    const [centers, setCenters] = useState(readReliefCenters());
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name: '', location: '', status: 'Active', capacity: '', facilities: '', lat: '', lng: '' });
    useEffect(() => subscribeToKey('reliefCenters', () => setCenters(readReliefCenters())), []);
    const openForm = center => { setEditing(center || { id: null }); setForm(center ? { ...center } : { name: '', location: '', status: 'Active', capacity: '', facilities: '', lat: '', lng: '' }); };
    const save = event => { event.preventDefault(); if (!form.name.trim() || !form.location.trim()) return; const next = editing.id ? centers.map(item => item.id === editing.id ? { ...item, ...form } : item) : [...centers, { ...form, id: Date.now() }]; setCenters(next); writeCollection('reliefCenters', next); setEditing(null); };
    const remove = center => { if (window.confirm(`Delete ${center.name}?`)) { const next = centers.filter(item => item.id !== center.id); setCenters(next); writeCollection('reliefCenters', next); } };
    return <div>
        <PageHeader title="Resource Centers" description="Manage capacity and infrastructure reports for verified relief centers." action={<button onClick={() => openForm()} className="btn btn-primary"><Plus size={16} /> Add Center</button>} />
        {editing && <form onSubmit={save} className="card" style={{ marginBottom: '1.5rem' }}><div className="card-body"><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}><input className="form-input" placeholder="Center name" value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} required /><input className="form-input" placeholder="Location" value={form.location} onChange={event => setForm({ ...form, location: event.target.value })} required /><select className="form-input" value={form.status} onChange={event => setForm({ ...form, status: event.target.value })}><option>Active</option><option>Closed</option><option>Full</option></select><input className="form-input" placeholder="Capacity" value={form.capacity} onChange={event => setForm({ ...form, capacity: event.target.value })} /><input className="form-input" placeholder="Facilities" value={form.facilities} onChange={event => setForm({ ...form, facilities: event.target.value })} /><input className="form-input" type="number" step="any" placeholder="Latitude" value={form.lat} onChange={event => setForm({ ...form, lat: event.target.value })} /><input className="form-input" type="number" step="any" placeholder="Longitude" value={form.lng} onChange={event => setForm({ ...form, lng: event.target.value })} /></div><div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}><button type="submit" className="btn btn-primary">Save</button><button type="button" onClick={() => setEditing(null)} className="btn btn-secondary">Cancel</button></div></div></form>}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>{centers.map(center => <div key={center.id} className="card"><div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}><span>{center.name}</span><StatusBadge status={center.status} /></div><div className="card-body"><p style={{ color: 'var(--text-secondary)' }}><MapPin size={14} /> {center.location}</p><p style={{ margin: '0.75rem 0' }}>Capacity: {center.capacity || 'Not provided'} · Facilities: {center.facilities || 'Not provided'}</p><div style={{ display: 'flex', gap: '0.5rem' }}><button onClick={() => openForm(center)} className="btn btn-secondary"><Edit size={14} /> Edit</button><button onClick={() => remove(center)} className="btn btn-secondary" style={{ color: 'var(--color-danger)' }}><Trash2 size={14} /> Delete</button></div></div></div>)}{!centers.length && <div className="card"><div className="card-body"><p style={{ color: 'var(--text-secondary)' }}>No relief centers have been added.</p></div></div>}</div>
    </div>;
};

export default AdminReliefCenters;
