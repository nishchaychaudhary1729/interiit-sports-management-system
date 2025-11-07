// server/routes/events.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// --- LOOKUP ROUTES ---

// 1. Fetch Event List (Individual and Team)
router.get('/data/events-list', async (req, res) => {
    try {
        const [events] = await db.query(`
            SELECT 
                E.Event_ID, E.Name AS Event_Name, E.Gender, E.Registration_Fee, 
                S.Name AS Sport_Name, S.Type AS Sport_Type
            FROM Events E
            JOIN Sports S ON E.Sport_ID = S.Sport_ID
            ORDER BY S.Type DESC, E.Name
        `);
        res.json(events);
    } catch (err) {
        console.error('Error fetching event list:', err);
        res.status(500).json({ message: 'Error fetching event list.' });
    }
});

// 2. Fetch Teams List (for team assignment lookup)
router.get('/data/teams-list', async (req, res) => {
    try {
        const [teams] = await db.query(`
            SELECT 
                T.Team_ID, T.Team_Name, T.Is_Active,
                I.Short_Name AS Institute, 
                E.Name AS Event_Name
            FROM Teams T
            JOIN Institutes I ON T.Institute_ID = I.Institute_ID
            JOIN Events E ON T.Event_ID = E.Event_ID
            WHERE T.Is_Active = 1
            ORDER BY I.Short_Name, E.Name
        `);
        res.json(teams);
    } catch (err) {
        console.error('Error fetching team list:', err);
        res.status(500).json({ message: 'Error fetching team list.' });
    }
});

// 3. Fetch Venues List
router.get('/data/venues-list', async (req, res) => {
    try {
        const [venues] = await db.query('SELECT Venue_ID, Name FROM Venues ORDER BY Name');
        res.json(venues.map(v => ({ Venue_ID: v.Venue_ID, Name: v.Name })));
    } catch (err) {
        console.error('Error fetching venue list:', err);
        res.status(500).json({ message: 'Error fetching venue list.' });
    }
});


// --- MATCH CRUD ROUTES ---

// 4. CREATE Match (POST /matches)
router.post('/matches', async (req, res) => {
    const { eventId, venueId, matchDate, startTime, matchType, isTeamSport, competitor1Id, competitor2Id } = req.body;
    
    if (!eventId || !venueId || !startTime || !competitor1Id || !competitor2Id) {
        return res.status(400).json({ message: 'Missing required match scheduling fields.' });
    }
    
    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        // 1. Insert into Matches table
        const matchQuery = `
            INSERT INTO Matches 
            (Event_ID, Venue_ID, Match_Date, Start_time, Match_Type, Status)
            VALUES (?, ?, ?, ?, ?, 'Scheduled')
        `;
        const [matchResult] = await connection.query(matchQuery, [eventId, venueId, matchDate, startTime, matchType]);
        const matchId = matchResult.insertId;
        
        // 2. Determine next available Match_Competitor_ID
        const [lastCompetitor] = await connection.query('SELECT MAX(Match_Competitor_ID) + 1 as NextID FROM Match_Competitors');
        let nextCompetitorId = lastCompetitor[0].NextID || 3071;

        // 3. Insert Competitors
        const competitorQuery = `
            INSERT INTO Match_Competitors 
            (Match_Competitor_ID, Match_ID, Team_ID, Participant_ID)
            VALUES (?, ?, ?, ?)
        `;
        
        // Competitor 1
        const team1Id = isTeamSport ? competitor1Id : null;
        const participant1Id = isTeamSport ? null : competitor1Id;
        await connection.query(competitorQuery, [nextCompetitorId++, matchId, team1Id, participant1Id]);
        
        // Competitor 2
        const team2Id = isTeamSport ? competitor2Id : null;
        const participant2Id = isTeamSport ? null : competitor2Id;
        await connection.query(competitorQuery, [nextCompetitorId, matchId, team2Id, participant2Id]);

        await connection.commit();
        res.status(201).json({ message: 'Match scheduled successfully.', matchId: matchId });

    } catch (err) {
        if (connection) await connection.rollback();
        console.error('Error scheduling match:', err.message);
        res.status(500).json({ message: 'Match scheduling failed due to a database error.', error: err.code });
    } finally {
        if (connection) connection.release();
    }
});

// 5. READ Matches (GET /matches) - Including competitor details
router.get('/matches', async (req, res) => {
    const { status = 'Scheduled' } = req.query; // Filter by status
    
    try {
        // Query aggregates competitor names and IDs
        const [matches] = await db.query(`
            SELECT 
                M.Match_ID, M.Start_time, M.Match_Type, M.Status, M.Score_Summary AS Final_Score,
                E.Name AS Event_Name, E.Event_ID,
                V.Name AS Venue_Name,
                GROUP_CONCAT(CASE WHEN MC.Team_ID IS NOT NULL THEN T.Team_Name ELSE P.Name END ORDER BY MC.Match_Competitor_ID SEPARATOR ' vs ') AS Competitors,
                GROUP_CONCAT(CASE WHEN MC.Team_ID IS NOT NULL THEN MC.Team_ID ELSE MC.Participant_ID END ORDER BY MC.Match_Competitor_ID) AS CompetitorIDs,
                M.Winner_ID 
            FROM Matches M
            JOIN Events E ON M.Event_ID = E.Event_ID
            JOIN Venues V ON M.Venue_ID = V.Venue_ID
            JOIN Match_Competitors MC ON M.Match_ID = MC.Match_ID
            LEFT JOIN Teams T ON MC.Team_ID = T.Team_ID
            LEFT JOIN Participants P ON MC.Participant_ID = P.Participant_ID
            WHERE M.Status = ?
            GROUP BY M.Match_ID, M.Start_time, E.Name, V.Name
            ORDER BY M.Start_time ASC
        `, [status]);

        // Process results to correctly format Competitor IDs array (for frontend use)
        const processedMatches = matches.map(m => ({
            ...m,
            CompetitorIDs: m.CompetitorIDs ? m.CompetitorIDs.split(',').map(id => parseInt(id)) : [],
            isTeamSport: m.CompetitorIDs.length > 0 && m.Competitors.includes('Team') // Simplistic way to infer team sport
        }));

        res.json(processedMatches);
    } catch (err) {
        console.error('Error fetching matches:', err);
        res.status(500).json({ message: 'Failed to fetch matches data.' });
    }
});


// 6. UPDATE Match Result (PUT /results/:matchId)
router.put('/results/:matchId', async (req, res) => {
    const { matchId } = req.params;
    const { winnerId, finalScore } = req.body; 
    
    if (!winnerId || !finalScore) {
        return res.status(400).json({ message: 'Missing winner ID or final score.' });
    }

    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        // 1. Update Matches table
        const updateMatchQuery = `
            UPDATE Matches SET Status = 'Completed', Winner_ID = ?, Score_Summary = ? WHERE Match_ID = ?
        `;
        await connection.query(updateMatchQuery, [winnerId, finalScore, matchId]);
        
        // 2. Determine winner type for Match_Outcomes table (Team vs Individual)
        const [competitors] = await connection.query('SELECT Team_ID, Participant_ID FROM Match_Competitors WHERE Match_ID = ? AND (Team_ID = ? OR Participant_ID = ?)', [matchId, winnerId, winnerId]);
        
        let winningTeamId = null;
        let winningParticipantId = null;

        if (competitors.length > 0) {
            if (competitors.some(c => c.Team_ID === winnerId)) {
                winningTeamId = winnerId;
            } else if (competitors.some(c => c.Participant_ID === winnerId)) {
                winningParticipantId = winnerId;
            }
        }
        
        // 3. Insert or Update Match_Outcomes
        const insertOutcomeQuery = `
            INSERT INTO Match_Outcomes (Match_ID, Winning_Team_ID, Winning_Participant_ID, Final_Score) 
            VALUES (?, ?, ?, ?)
        `;
        await connection.query(insertOutcomeQuery, [matchId, winningTeamId, winningParticipantId, finalScore]);
        
        await connection.commit();
        res.json({ message: `Match ${matchId} completed and result recorded.` });
        
    } catch (err) {
        if (connection) await connection.rollback();
        console.error('Error updating match result:', err.message);
        res.status(500).json({ message: 'Failed to update match result.', error: err.code });
    } finally {
        if (connection) connection.release();
    }
});


// --- REGISTRATION ROUTES ---

// 7. Register Participant for an Individual Event (Event_Registrations table)
router.post('/register/individual', async (req, res) => {
    const { participantId, eventId } = req.body;
    
    if (!participantId || !eventId) {
        return res.status(400).json({ message: 'Missing participant ID or event ID.' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO Event_Registrations (Participant_ID, Event_ID) VALUES (?, ?)',
            [participantId, eventId]
        );

        res.status(201).json({ 
            message: `Participant ${participantId} registered for Event ${eventId} successfully.`, 
            id: result.insertId 
        });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Participant is already registered for this event.' });
        }
        console.error('Error registering for individual event:', err.message);
        res.status(400).json({ 
            message: 'Individual registration failed. Check foreign keys or unique constraints.',
            error: err.code 
        });
    }
});

// 8. Assign Participant to a Team (Team_Members table)
router.post('/register/team', async (req, res) => {
    const { participantId, teamId, role = 'Player' } = req.body; 
    
    if (!participantId || !teamId) {
        return res.status(400).json({ message: 'Missing participant ID or team ID.' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO Team_Members (Team_ID, Participant_ID, Role) VALUES (?, ?, ?)',
            [teamId, participantId, role]
        );

        res.status(201).json({ 
            message: `Participant ${participantId} assigned to Team ${teamId} as ${role} successfully.`, 
            id: result.insertId 
        });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Participant is already a member of this team.' });
        }
        console.error('Error assigning to team:', err.message);
        res.status(400).json({ 
            message: 'Team assignment failed. Check foreign keys or unique constraints.',
            error: err.code 
        });
    }
});


module.exports = router;