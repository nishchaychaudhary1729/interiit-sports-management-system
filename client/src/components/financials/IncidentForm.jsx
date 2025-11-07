// client/src/components/financials/IncidentForm.jsx
import React, { useState, useEffect } from 'react';
import { createIncident, fetchParticipants, fetchStaffRoster } from '../../services/api';

function IncidentForm({ onCreation }) {
    const [formData, setFormData] = useState({ 
        participantId: '', staffId: '', description: '', severity: 'Medium', actionTaken: '' 
    });
    const [lookup, setLookup] = useState({ participants: [], staff: [] });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const loadLookup = async () => {
            try {
                const [participantsData, staffData] = await Promise.all([
                    fetchParticipants(),
                    fetchStaffRoster()
                ]);
                
                setLookup({ participants: participantsData, staff: staffData });
                
                // Set defaults
                setFormData(prev => ({
                    ...prev,
                    participantId: participantsData[0]?.Participant_ID || '',
                    staffId: staffData[0]?.Staff_ID || ''
                }));
            } catch (err) {
                setError('Failed to load required lookup data for Participants/Staff.');
            }
        };
        loadLookup();
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setMessage(''); setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); setError('');

        const dataToSend = {
            ...formData,
            participantId: formData.participantId ? parseInt(formData.participantId) : null,
            staffId: parseInt(formData.staffId),
        };
        
        try {
            const result = await createIncident(dataToSend);
            setMessage(result.message);
            onCreation();
            setFormData(prev => ({ ...prev, description: '', actionTaken: '', severity: 'Medium' })); // Reset mutable fields
        } catch (err) {
            setError(err.message || 'Incident filing failed.');
        }
    };

    return (
        <div style={{ padding: '15px', border: '1px solid var(--color-danger)', borderRadius: '6px', backgroundColor: '#fff6f7', marginBottom: '20px' }}>
            <h4 style={{ color: 'var(--color-dark)', marginTop: 0, borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>File New Incident Report</h4>
            {message && <p style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>{message}</p>}
            {error && <p style={{ color: 'var(--color-danger)', fontWeight: 'bold' }}>{error}</p>}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontWeight: 'bold', fontSize: '0.9em' }}>Reporting Staff:</label>
                <select name="staffId" value={formData.staffId} onChange={handleChange} required>
                    {lookup.staff.map(s => (
                        <option key={s.Staff_ID} value={s.Staff_ID}>{s.Name} ({s.Role_Name})</option>
                    ))}
                </select>

                <label style={{ fontWeight: 'bold', fontSize: '0.9em' }}>Affected Participant (Optional):</label>
                <select name="participantId" value={formData.participantId} onChange={handleChange}>
                    <option value="">-- N/A (General Incident) --</option>
                    {lookup.participants.map(p => (
                        <option key={p.Participant_ID} value={p.Participant_ID}>{p.Name} ({p.Institute})</option>
                    ))}
                </select>
                
                <textarea name="description" placeholder="Detailed Description of Incident (e.g., fight, injury, equipment damage)" value={formData.description} onChange={handleChange} required rows="3"/>
                
                <label style={{ fontWeight: 'bold', fontSize: '0.9em' }}>Severity:</label>
                <select name="severity" value={formData.severity} onChange={handleChange} required>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                
                <input name="actionTaken" type="text" placeholder="Action Taken (e.g., Verbal Warning, Fine Issued) - Optional" value={formData.actionTaken} onChange={handleChange} />

                <button type="submit" style={{ marginTop: '10px', backgroundColor: 'var(--color-danger)' }}>File Report</button>
            </form>
        </div>
    );
}

// Incident List (Modified to include the form)
function IncidentLog({ refreshKey, onUpdate }) {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const loadIncidents = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchIncidents();
            setIncidents(data);
        } catch (err) {
            setError('Could not fetch incident reports.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadIncidents();
    }, [loadIncidents, refreshKey]);

    const tableHeaderStyle = { padding: '12px 10px', textAlign: 'left', borderRight: '1px solid rgba(255,255,255,0.2)', fontWeight: '600' };
    const tableCellStyle = { padding: '10px', borderRight: '1px solid #ddd' };

    const getSeverityColor = (severity) => {
        switch(severity) {
            case 'High': return 'var(--color-danger)';
            case 'Medium': return 'var(--color-warning)';
            case 'Low': return 'var(--color-success)';
            default: return 'var(--color-secondary)';
        }
    }

    if (loading) return <p>Loading Incident Reports...</p>;
    if (error) return <p style={{ color: 'var(--color-danger)', fontWeight: 'bold' }}>Error: {error}</p>;

    return (
        <div>
            <h3 style={{ color: 'var(--color-primary-dark)', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                Reported Incidents ({incidents.length})
            </h3>

            <div style={{ marginBottom: '20px' }}>
                {!showForm && (
                    <button onClick={() => setShowForm(true)} style={{ backgroundColor: 'var(--color-danger)' }}>+ File New Incident</button>
                )}
                {showForm && <IncidentForm onCreation={onUpdate} onToggle={() => setShowForm(false)} />}
            </div>
            
            <div style={{ maxHeight: '500px', overflowY: 'auto', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '6px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-white)', position: 'sticky', top: 0 }}>
                            <th style={tableHeaderStyle}>ID</th>
                            <th style={tableHeaderStyle}>Time</th>
                            <th style={tableHeaderStyle}>Severity</th>
                            <th style={tableHeaderStyle}>Reporter</th>
                            <th style={tableHeaderStyle}>Participant</th>
                            <th style={tableHeaderStyle}>Description</th>
                            <th style={tableHeaderStyle}>Action Taken</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incidents.map((i, index) => (
                            <tr key={i.Report_ID} style={{ borderBottom: '1px solid #e0e0e0', backgroundColor: index % 2 === 0 ? 'var(--color-white)' : '#f5f5f5' }}>
                                <td style={tableCellStyle}>{i.Report_ID}</td>
                                <td style={tableCellStyle}>{new Date(i.Time).toLocaleString()}</td>
                                <td style={{...tableCellStyle, color: getSeverityColor(i.Severity), fontWeight: 'bold'}}>{i.Severity}</td>
                                <td style={tableCellStyle}>{i.Staff_Reporter}</td>
                                <td style={tableCellStyle}>{i.Participant_Name || 'N/A'}</td>
                                <td style={{...tableCellStyle, maxWidth: '200px', whiteSpace: 'normal'}}>{i.Description}</td>
                                <td style={tableCellStyle}>{i.Action_taken || 'PENDING'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default IncidentLog;