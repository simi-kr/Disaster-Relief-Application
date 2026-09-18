import React from 'react';
import { Construction } from 'lucide-react';

const Fallback = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
            <Construction size={48} style={{ color: 'var(--brand-primary)', marginBottom: '1rem' }} />
            <h2>Under Construction</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>This page is being built. Please check back later.</p>
        </div>
    );
};

export default Fallback;
