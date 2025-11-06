// client/src/pages/ParticipantManagement.jsx
import React, { useState } from 'react';
import ParticipantForm from '../components/ParticipantForm.jsx';
import ParticipantList from '../components/ParticipantList.jsx';
// Assuming ParticipantRegistration.jsx is created and imported for a responsive layout
// import ParticipantRegistration from '../components/ParticipantRegistration.jsx';

function ParticipantManagement() {
    const [refreshKey, setRefreshKey] = useState(0); 

    const handleParticipantSave = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div>
            <h2>👤 Participant Roster Management</h2>
            
            {/* Updated to use responsive-flex-container class */}
            <div className="responsive-flex-container" style={{ 
                display: 'flex', 
                gap: 'var(--gap-base)', 
                alignItems: 'flex-start', 
                flexWrap: 'wrap'
            }}>
                
                {/* Participant Form: Takes up a smaller width but ensures min-width for usability */}
                <div style={{ flex: '1 1 30%', minWidth: '300px' }}>
                    <ParticipantForm onSave={handleParticipantSave} />
                </div>

                {/* If ParticipantRegistration was implemented, it would go here, using similar flex styling */}
                {/* <div style={{ flex: '1 1 30%', minWidth: '300px' }}>
                    <ParticipantRegistration onEnrollment={handleParticipantSave} />
                </div> */}
                
                {/* Participant List: Takes up the remaining width, ensuring minimal horizontal scrolling */}
                <div style={{ flex: '2 1 65%', minWidth: '400px' }}>
                    <ParticipantList refreshKey={refreshKey} />
                </div>
            </div>
        </div>
    );
}

export default ParticipantManagement;