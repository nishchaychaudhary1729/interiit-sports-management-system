// client/src/components/events/MatchResults.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { fetchMatches, updateMatchResult } from '../../services/api';

// --- Match Row Component ---
function MatchRow({ match, index, onUpdate, isTeamSport }) {
    const [finalScore, setFinalScore] = useState('');
    const [winnerId, setWinnerId] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    
    // Competitor names array (e.g., ["IITB Cricket XI", "IITD Cricket XI"])
    const competitorNames = match.Competitors ? match.Competitors.split(' vs ') : ['Competitor 1', 'Competitor 2'];
    // Competitor IDs array (e.g., [1001, 1002])
    const competitorIDs = match.CompetitorIDs;
    
    useEffect(() => {
        setFinalScore(match.Final_Score || '');
        setWinnerId(match.Winner_ID || ''); 
    }, [match]);
    
    const handleSave = () => {
        if (!finalScore || !winnerId) {
            alert('Please enter a final score and select a winner.');
            return;
        }
        onUpdate(match.Match_ID, parseInt(winnerId), finalScore);
        setIsEditing(false);
    };

    const isCompleted = match.Status === 'Completed';

    const renderCompetitorDropdown = () => {
        return (
            <select value={winnerId} onChange={(e) => setWinnerId(e.target.value)} required>
                <option value="">-- Select Winner --</option>
                {competitorIDs.map((id, idx) => (
                    <option key={id} value={id}>
                        {competitorNames[idx]} ({isTeamSport ? 'Team' : 'Player'})
                    </option>
                ))}
            </select>
        );
    };

    return (
        <tr style={{ borderBottom: '1px solid #ddd', backgroundColor: index % 2 === 0 ? 'var(--color-white)' : '#f1f1f1' }}>
            <td style={tableCellStyle}>{match.Match_ID}</td>
            <td style={tableCellStyle}>{match.Event_Name} / {match.Venue_Name}</td>
            <td style={tableCellStyle}>{match.Competitors || 'N/A'}</td>
            <td style={tableCellStyle}>{new Date(match.Start_time).toLocaleDateString()} {new Date(match.Start_time).toLocaleTimeString()}</td>
            <td style={{...tableCellStyle, color: isCompleted ? 'var(--color-success)' : 'var(--color-primary)'}}>
                {isCompleted ? 'COMPLETED' : match.Status.toUpperCase()}
            </td>
            <td style={tableCellStyle}>
                {!isCompleted ? (
                    isEditing ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <input 
                                type="text" 
                                placeholder="Score Summary (e.g., 3-0)" 
                                value={finalScore} 
                                onChange={(e) => setFinalScore(e.target.value)} 
                                required
                            />
                            {renderCompetitorDropdown()}
                            <button onClick={handleSave} style={{ backgroundColor: 'var(--color-success)', padding: '5px', fontSize: '0.8em' }}>Save</button>
                            <button onClick={() => setIsEditing(false)} style={{ backgroundColor: 'var(--color-danger)', padding: '5px', fontSize: '0.8em' }}>Cancel</button>
                        </div>
                    ) : (
                        <button onClick={() => setIsEditing(true)} style={{ padding: '5px', fontSize: '0.8em' }}>Enter Result</button>
                    )
                ) : (
                    <span>{match.Final_Score} (Winner ID: {match.Winner_ID || 'N/A'})</span>
                )}
            </td>
        </tr>
    );
}

const tableHeaderStyle = { padding: '12px 10px', textAlign: 'left', borderRight: '1px solid rgba(255,255,255,0.2)' };
const tableCellStyle = { padding: '8px 10px', borderRight: '1px solid #ddd' };


// --- Main Match Results Component ---
function MatchResults({ refreshKey }) {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('Scheduled');
    const [error, setError] = useState(null);

    const loadMatches = useCallback(async (status) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchMatches(status);
            setMatches(data);
        } catch (err) {
            setError('Failed to fetch matches.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadMatches(filterStatus);
    }, [loadMatches, filterStatus, refreshKey]);

    const handleUpdate = async (matchId, winnerId, finalScore) => {
        setError(null);
        try {
            await updateMatchResult(matchId, { winnerId, finalScore });
            // Refresh the list after successful update
            loadMatches(filterStatus); 
        } catch (err) {
            setError(err.message || 'Failed to update result.');
        }
    };
    
    if (error) return <p style={{ color: 'var(--color-danger)', fontWeight: 'bold' }}>Error: {error}</p>;

    return (
        <div>
            {/* Status Filter */}
            <div style={{ marginBottom: '15px' }}>
                <button 
                    onClick={() => setFilterStatus('Scheduled')} 
                    style={{ backgroundColor: filterStatus === 'Scheduled' ? 'var(--color-primary)' : 'var(--color-secondary)', marginRight: '10px' }}>
                    Scheduled
                </button>
                <button 
                    onClick={() => setFilterStatus('Completed')} 
                    style={{ backgroundColor: filterStatus === 'Completed' ? 'var(--color-success)' : 'var(--color-secondary)' }}>
                    Completed
                </button>
            </div>
            
            {loading ? (
                <p>Loading matches...</p>
            ) : (
                <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
                    {matches.length === 0 ? (
                        <p style={{ textAlign: 'center', color: 'var(--color-secondary)' }}>No {filterStatus} matches found.</p>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
                            <thead>
                                <tr style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-white)', position: 'sticky', top: 0 }}>
                                    <th style={tableHeaderStyle}>ID</th>
                                    <th style={tableHeaderStyle}>Event/Venue</th>
                                    <th style={tableHeaderStyle}>Competitors</th>
                                    <th style={tableHeaderStyle}>Date & Time</th>
                                    <th style={tableHeaderStyle}>Status</th>
                                    <th style={tableHeaderStyle}>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matches.map((m, index) => (
                                    <MatchRow 
                                        key={m.Match_ID} 
                                        match={m} 
                                        index={index}
                                        onUpdate={handleUpdate}
                                        isTeamSport={m.isTeamSport}
                                    />
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
}

export default MatchResults;