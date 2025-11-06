// client/src/components/ParticipantList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { fetchParticipants } from '../services/api';

function ParticipantList({ refreshKey }) {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadParticipants = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchParticipants();
            setParticipants(data);
        } catch (err) {
            setError('Could not fetch data from API. Is the Node.js server running on port 5000?');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadParticipants();
    }, [loadParticipants, refreshKey]);

    if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}>Loading Participant Roster...</div>;
    if (error) return <div style={{ color: 'var(--color-danger)', fontWeight: 'bold', padding: '20px' }}>Error: {error}</div>;

    return (
        <div>
            <h3 style={{ color: 'var(--color-primary)', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                Registered Participants ({participants.length})
            </h3>
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-white)', position: 'sticky', top: 0 }}>
                            <th style={tableHeaderStyle}>ID</th>
                            <th style={tableHeaderStyle}>Name</th>
                            <th style={tableHeaderStyle}>Institute</th>
                            <th style={tableHeaderStyle}>Hostel</th>
                            <th style={tableHeaderStyle}>Mess</th>
                            <th style={tableHeaderStyle}>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map((p, index) => (
                            <tr key={p.Participant_ID} style={{ borderBottom: '1px solid #ddd', backgroundColor: index % 2 === 0 ? 'var(--color-white)' : '#f1f1f1' }}>
                                <td style={tableCellStyle}>{p.Participant_ID}</td>
                                <td style={tableCellStyle}>{p.Name}</td>
                                <td style={tableCellStyle}>{p.Institute}</td>
                                <td style={tableCellStyle}>{p.Hostel}</td>
                                <td style={tableCellStyle}>{p.Mess}</td>
                                <td style={tableCellStyle}>{p.Email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const tableHeaderStyle = { padding: '12px 10px', textAlign: 'left', borderRight: '1px solid rgba(255,255,255,0.2)' };
const tableCellStyle = { padding: '8px 10px', borderRight: '1px solid #ddd' };

export default ParticipantList;