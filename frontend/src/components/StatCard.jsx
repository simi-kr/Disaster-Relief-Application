import React from 'react';

const StatCard = ({ title, value, icon, color = 'primary', subtitle, badge, onClick }) => {
    const handleKeyDown = event => {
        if (onClick && (event.key === 'Enter' || event.key === ' ')) onClick();
    };
    return (
        <div className="stat-card" onClick={onClick} onKeyDown={handleKeyDown} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
            <div className="stat-card-header">
                <div className={`stat-icon ${color}`}>
                    {icon}
                </div>
                {badge && (
                    <span className={`status-badge status-${badge.color || 'info'}`}>
                        {badge.text}
                    </span>
                )}
            </div>
            <div className="stat-content">
                <p>{value}</p>
                <h3>{title}</h3>
                {subtitle && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.5rem', display: 'block' }}>{subtitle}</span>
                )}
            </div>
        </div>
    );
};

export default StatCard;
