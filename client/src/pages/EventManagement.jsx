// client/src/pages/EventManagement.jsx
import React, { useState } from 'react';
import MatchScheduler from '../components/events/MatchScheduler.jsx';
import MatchResults from '../components/events/MatchResults.jsx';

function EventManagement() {
    const [refreshKey, setRefreshKey] = useState(0); 

    const handleMatchUpdate = () => {
        // Increment key to trigger refresh in MatchResults component
        setRefreshKey(prev => prev + 1);
    };
    
    // Style applied to both the scheduler and results container
    const cardStyle = {
        padding: '20px', 
        backgroundColor: 'var(--color-white)', 
        borderRadius: '8px', 
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        marginBottom: 'var(--gap-base)', // Added gap between the two stacked cards
        width: '100%', // Ensure both cards take full width
        boxSizing: 'border-box'
    };
    
    return (
        <div>
            <h2>🗓️ Match Scheduling & Results Management</h2>
            
            {/* 1. Match Scheduling Section (TOP) */}
            <div style={cardStyle}>
                <h3 style={{ color: 'var(--color-primary-dark)', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                    Create New Match Schedule
                </h3>
                <MatchScheduler onSchedule={handleMatchUpdate} />
            </div>
            
            {/* 2. Match Results/Viewer Section (BOTTOM) */}
            <div style={cardStyle}>
                <h3 style={{ color: 'var(--color-primary-dark)', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                    View & Update Match Results
                </h3>
                <MatchResults refreshKey={refreshKey} />
            </div>
            
        </div>
    );
}

export default EventManagement;