// client/src/pages/ParticipantManagement.jsx
import React, { useState } from 'react';
import ParticipantForm from '../components/ParticipantForm.jsx';
import ParticipantList from '../components/ParticipantList.jsx';

function ParticipantManagement() {
    const [refreshKey, setRefreshKey] = useState(0); 

    const handleParticipantSave = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div>
            <h2>👤 Participant Roster Management</h2>
            <div style={{ 
                display: 'flex', 
                gap: '30px', 
                alignItems: 'flex-start', 
                flexWrap: 'wrap' // Allows wrapping on small screens
            }}>
                
                <ParticipantForm onSave={handleParticipantSave} />
                
                <ParticipantList refreshKey={refreshKey} />
            </div>
        </div>
    );
}

export default ParticipantManagement;