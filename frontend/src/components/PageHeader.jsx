import React from 'react';

const PageHeader = ({ title, description, action, badge }) => {
    return (
        <div className="page-header">
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <h2>{title}</h2>
                    {badge && (
                        <span className={`status-badge status-${badge.color || 'success'}`}>{badge.text}</span>
                    )}
                </div>
                {description && <p>{description}</p>}
            </div>
            {action && (
                <div className="page-header-action">
                    {action}
                </div>
            )}
        </div>
    );
};

export default PageHeader;
