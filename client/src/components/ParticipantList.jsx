// client/src/components/ParticipantList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { fetchParticipants } from '../services/api';

function ParticipantList({ refreshKey }) {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); 

    const loadParticipants = useCallback(async (currentSearchTerm) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchParticipants(currentSearchTerm);
            setParticipants(data);
        } catch (err) {
            setError('Could not fetch data from API. Is the Node.js server running on port 5000?');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            loadParticipants(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [loadParticipants, searchTerm, refreshKey]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const tableHeaderStyle = { padding: '12px 10px', textAlign: 'left', borderRight: '1px solid rgba(255,255,255,0.2)', fontWeight: '600' };
    const tableCellStyle = { padding: '10px', borderRight: '1px solid #ddd' };

    if (error) return <div style={{ color: 'var(--color-danger)', fontWeight: 'bold', padding: '20px' }}>Error: {error}</div>;

    return (
        <div style={{ 
            backgroundColor: 'var(--color-white)', 
            borderRadius: '8px', 
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
            padding: '20px' 
        }}>
            
            <div style={{ marginBottom: '15px' }}>
                <input
                    type="text"
                    placeholder="Search by Name, Institute (Short_Name), or Hostel..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }}
                    disabled={loading}
                />
            </div>

            <h3 style={{ color: 'var(--color-primary-dark)', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                Registered Participants ({participants.length})
                {loading && <span style={{ marginLeft: '10px', color: 'var(--color-secondary)' }}> (Loading...)</span>}
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
                            <tr key={p.Participant_ID} style={{ borderBottom: '1px solid #e0e0e0', backgroundColor: index % 2 === 0 ? 'var(--color-white)' : '#f5f5f5' }}>
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
                {!loading && participants.length === 0 && (
                    <p style={{ textAlign: 'center', padding: '20px', color: 'var(--color-secondary)' }}>
                        No participants found matching your search criteria.
                    </p>
                )}
            </div>
        </div>
    );
}

export default ParticipantList;