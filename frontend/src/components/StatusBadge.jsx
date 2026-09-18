import React from 'react';

const StatusBadge = ({ status }) => {
    const statusColors = {
        approved: 'status-success',
        pending: 'status-warning',
        'pending triage': 'status-warning',
        critical: 'status-danger',
        urgent: 'status-danger',
        resolved: 'status-info',
        monitoring: 'status-info',
        dispatched: 'status-info',
        reported: 'status-warning',
        rejected: 'status-danger',
        completed: 'status-success',
        active: 'status-success',
        available: 'status-success',
        default: 'status-pending'
    };

    const badgeClass = statusColors[status.toLowerCase()] || statusColors.default;

    return (
        <span className={`status-badge ${badgeClass}`}>
            {status}
        </span>
    );
};

export default StatusBadge;
