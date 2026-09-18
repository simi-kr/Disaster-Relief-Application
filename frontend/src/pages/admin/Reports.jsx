import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import { FileBarChart, Zap, HandHeart, Users } from 'lucide-react';
import { readDisasters, readRequests, readResources, readVolunteers, subscribeToStore } from '../../services/localStore';
import { downloadCsv, downloadPdf } from '../../services/exportReport';

const Reports = () => {
    const [requests, setRequests] = useState(readRequests());
    const [disasters, setDisasters] = useState(readDisasters());
    const [resources, setResources] = useState(readResources());
    const [volunteers, setVolunteers] = useState(readVolunteers());
    useEffect(() => subscribeToStore(() => { setRequests(readRequests()); setDisasters(readDisasters()); setResources(readResources()); setVolunteers(readVolunteers()); }), []);
    const rows = [
        ...disasters.map(item => ({ entity: 'Disaster', id: item.id, name: item.name, status: item.status })),
        ...requests.map(item => ({ entity: 'Request', id: item.id, name: item.type, status: item.status })),
        ...resources.map(item => ({ entity: 'Resource', id: item.id, name: item.name, status: item.status })),
        ...volunteers.map(item => ({ entity: 'Volunteer', id: item.id, name: item.userName, status: item.status }))
    ];
    return (
        <div>
            <PageHeader
                title="System Intelligence & Reports"
                description="Analytical overview of all global operations, logistics, and casualties."
                action={<div style={{ display: 'flex', gap: '0.5rem' }}><button onClick={() => downloadCsv('resilio-report.csv', rows)} className="btn btn-secondary">Download CSV</button><button onClick={() => downloadPdf('resilio-report.pdf', 'Resilio Relief Report', rows)} className="btn btn-primary">Download PDF</button></div>}
            />

            <div className="grid-stats">
                <StatCard title="Resolved Disasters" value={disasters.filter(disaster => disaster.status === 'Resolved').length} icon={<Users size={18} />} color="success" subtitle={`${disasters.length} total disasters`} />
                <StatCard title="Resources Tracked" value={resources.length} icon={<Zap size={18} />} color="info" subtitle="Current inventory records" />
                <StatCard title="SOS Resolved" value={`${requests.length ? Math.round((requests.filter(request => request.status === 'Approved').length / requests.length) * 100) : 0}%`} icon={<HandHeart size={18} />} color="warning" subtitle={`${requests.length} tracked requests`} />
            </div>

            <div className="card" style={{ marginTop: '1.5rem' }}>
                <div className="card-header">
                    <FileBarChart size={18} style={{ marginRight: '0.5rem', display: 'inline-block' }} />
                    Sector Readiness Matrix
                </div>
                <div className="card-body" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>Current request records: {requests.length}. Export the report for offline analysis.</p>
                </div>
            </div>
        </div>
    );
};

export default Reports;
