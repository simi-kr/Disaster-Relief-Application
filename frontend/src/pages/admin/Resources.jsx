import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import StatusBadge from '../../components/StatusBadge';
import { Package, Droplets, Zap, Baby, Plus } from 'lucide-react';
import { readResources, writeCollection } from '../../services/localStore';

const AdminResources = () => {
    const [resources, setResources] = useState(readResources());
    const [shipmentOpen, setShipmentOpen] = useState(false);
    const [shipment, setShipment] = useState({ name: '', quantity: '', location: '', lat: '', lng: '' });
    const adjust = name => { const value = window.prompt(`Enter updated quantity for ${name}:`); if (value !== null && value.trim()) { const next = resources.map(item => item.name === name ? { ...item, qty: value.trim() } : item); setResources(next); writeCollection('resources', next); } };
    const saveShipment = event => {
        event.preventDefault();
        if (!shipment.name.trim() || !shipment.quantity.trim()) return;
        const next = [...resources, { id: Date.now(), name: shipment.name.trim(), qty: shipment.quantity.trim(), location: shipment.location.trim(), lat: shipment.lat, lng: shipment.lng, status: 'Available' }];
        setResources(next);
        writeCollection('resources', next);
        setShipment({ name: '', quantity: '', location: '', lat: '', lng: '' });
        setShipmentOpen(false);
    };
    return (
        <div>
            <PageHeader
                title="Global Asset Inventory"
                description="Manage logistics, incoming donations, and dispatch capabilities."
                action={<button onClick={() => setShipmentOpen(value => !value)} className="btn btn-primary"><Plus size={16} /> Log Incoming Shipment</button>}
            />
            {shipmentOpen && <form onSubmit={saveShipment} className="card" style={{ marginBottom: '1.5rem' }}><div className="card-body"><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}><input className="form-input" placeholder="Resource name" value={shipment.name} onChange={event => setShipment({ ...shipment, name: event.target.value })} required /><input className="form-input" placeholder="Quantity" value={shipment.quantity} onChange={event => setShipment({ ...shipment, quantity: event.target.value })} required /><input className="form-input" placeholder="Location" value={shipment.location} onChange={event => setShipment({ ...shipment, location: event.target.value })} /><input className="form-input" type="number" step="any" placeholder="Latitude" value={shipment.lat} onChange={event => setShipment({ ...shipment, lat: event.target.value })} /><input className="form-input" type="number" step="any" placeholder="Longitude" value={shipment.lng} onChange={event => setShipment({ ...shipment, lng: event.target.value })} /></div><div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}><button type="submit" className="btn btn-primary">Save Shipment</button><button type="button" onClick={() => setShipmentOpen(false)} className="btn btn-secondary">Cancel</button></div></div></form>}

            <div className="card">
                <div className="card-header">
                    Base Hub Stock Levels
                </div>
                <div className="card-body">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                        {resources.map((item, i) => (
                            <div key={i} style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)' }}>
                                    {i === 0 ? <Droplets size={24} color="var(--color-info)" /> : i === 1 ? <Zap size={24} color="var(--color-warning)" /> : i === 2 ? <Package size={24} color="var(--color-danger)" /> : <Baby size={24} color="var(--color-success)" />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginBottom: '0.25rem' }}>{item.name}</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Qty: {item.qty}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <StatusBadge status={item.status} />
                                        <button onClick={() => adjust(item.name)} style={{ color: 'var(--brand-primary)', fontSize: '0.8rem', fontWeight: 600 }}>Adjust</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminResources;
