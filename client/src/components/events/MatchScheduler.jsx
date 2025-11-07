// client/src/components/events/MatchScheduler.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { fetchEventLookupData, fetchParticipants, createMatch } from '../../services/api';

function MatchScheduler({ onSchedule }) {
    const [lookupData, setLookupData] = useState({ events: [], teams: [], venues: [], participants: [] });
    const [formData, setFormData] = useState({
        eventId: '',
        venueId: '',
        date: new Date().toISOString().slice(0, 10),
        time: '09:00',
        matchType: 'League',
        competitor1: '', 
        competitor2: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const eventData = await fetchEventLookupData();
                const participantData = await fetchParticipants();
                setLookupData({ ...eventData, participants: participantData });

                // Set initial default values
                const initialEventId = eventData.events[0]?.Event_ID || '';
                const initialVenueId = eventData.venues[0]?.Venue_ID || '';
                
                // Determine initial competitors based on the first event type
                const firstEvent = eventData.events.find(e => e.Event_ID === initialEventId);
                const isTeam = firstEvent?.Sport_Type === 'Team';
                const initialCompetitorList = isTeam ? eventData.teams : participantData;
                const initialCompetitor1 = initialCompetitorList[0]?.Team_ID || initialCompetitorList[0]?.Participant_ID || '';
                const initialCompetitor2 = initialCompetitorList[1]?.Team_ID || initialCompetitorList[1]?.Participant_ID || '';

                setFormData(prev => ({
                    ...prev,
                    eventId: initialEventId,
                    venueId: initialVenueId,
                    competitor1: initialCompetitor1,
                    competitor2: initialCompetitor2,
                }));

            } catch (err) {
                setError('Failed to load dependency data.');
            }
        };
        loadData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Special logic to reset competitor options if eventId changes
        if (name === 'eventId') {
            const newEvent = lookupData.events.find(e => e.Event_ID === parseInt(value));
            const isTeam = newEvent?.Sport_Type === 'Team';
            
            const competitorList = isTeam ? lookupData.teams : lookupData.participants;
            const initialCompetitor1 = competitorList[0]?.Team_ID || competitorList[0]?.Participant_ID || '';
            const initialCompetitor2 = competitorList[1]?.Team_ID || competitorList[1]?.Participant_ID || '';

            setFormData(prev => ({ 
                ...prev, 
                [name]: value,
                competitor1: initialCompetitor1,
                competitor2: initialCompetitor2,
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        setMessage('');
        setError('');
    };

    // Derived State Logic
    const selectedEvent = lookupData.events.find(e => e.Event_ID === parseInt(formData.eventId));
    const isTeamSport = selectedEvent?.Sport_Type === 'Team';

    const competitorList = isTeamSport ? lookupData.teams : lookupData.participants;
    const competitorLabel = isTeamSport ? 'Team' : 'Participant';
    const competitorValueKey = isTeamSport ? 'Team_ID' : 'Participant_ID';
    const competitorNameKey = isTeamSport ? 'Team_Name' : 'Name';
    const competitorContextKey = isTeamSport ? 'Institute' : 'Institute';
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); setError('');
        
        const c1 = parseInt(formData.competitor1);
        const c2 = parseInt(formData.competitor2);

        if (c1 === c2) {
            return setError('Competitors must be different.');
        }

        const dataToSend = {
            eventId: parseInt(formData.eventId),
            venueId: parseInt(formData.venueId),
            matchDate: formData.date,
            startTime: `${formData.date} ${formData.time}:00`,
            matchType: formData.matchType,
            isTeamSport: isTeamSport,
            competitor1Id: c1,
            competitor2Id: c2,
        };
        
        try {
            const result = await createMatch(dataToSend);
            setMessage(`✅ Match scheduled successfully: Match ID ${result.matchId}.`);
            onSchedule();
        } catch (err) {
            setError(err.message || 'Match scheduling failed.');
        }
    };
    
    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* Event Selector */}
            <label style={{ fontWeight: 'bold' }}>Event:</label>
            <select name="eventId" value={formData.eventId} onChange={handleChange} required>
                {lookupData.events.map(e => (
                    <option key={e.Event_ID} value={e.Event_ID}>
                        {e.Event_Name} ({e.Sport_Type})
                    </option>
                ))}
            </select>
            
            <p style={{ color: 'var(--color-secondary)', fontSize: '0.8em', margin: '-10px 0 0 0' }}>
                Competitors will be selected as: **{isTeamSport ? 'Teams' : 'Individuals'}**
            </p>

            {/* Competitor 1 Selector */}
            <label>{competitorLabel} 1:</label>
            <select name="competitor1" value={formData.competitor1} onChange={handleChange} required>
                {competitorList.map(c => (
                    <option key={c[competitorValueKey]} value={c[competitorValueKey]}>
                        {c[competitorNameKey]} ({c[competitorContextKey]})
                    </option>
                ))}
            </select>
            
            {/* Competitor 2 Selector */}
            <label>{competitorLabel} 2:</label>
            <select name="competitor2" value={formData.competitor2} onChange={handleChange} required>
                {competitorList.map(c => (
                    <option key={c[competitorValueKey]} value={c[competitorValueKey]}>
                        {c[competitorNameKey]} ({c[competitorContextKey]})
                    </option>
                ))}
            </select>
            
            <hr style={{ borderTop: '1px solid #eee' }}/>

            {/* Match Details */}
            <label>Venue:</label>
            <select name="venueId" value={formData.venueId} onChange={handleChange} required>
                {lookupData.venues.map(v => (
                    <option key={v.Venue_ID} value={v.Venue_ID}>
                        {v.Name}
                    </option>
                ))}
            </select>

            <label>Date & Time:</label>
            <div style={{ display: 'flex', gap: '10px' }}>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required style={{ flex: 1 }}/>
                <input type="time" name="time" value={formData.time} onChange={handleChange} required style={{ flex: 1 }}/>
            </div>
            
            <label>Match Type:</label>
            <select name="matchType" value={formData.matchType} onChange={handleChange} required>
                <option value="League">League</option>
                <option value="Knockout">Knockout</option>
                <option value="Friendly">Friendly</option>
            </select>

            {message && <p style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>{message}</p>}
            {error && <p style={{ color: 'var(--color-danger)', fontWeight: 'bold' }}>{error}</p>}
            
            <button type="submit" style={{ marginTop: '20px', backgroundColor: 'var(--color-primary)' }}>
                Schedule Match
            </button>
        </form>
    );
}

export default MatchScheduler;