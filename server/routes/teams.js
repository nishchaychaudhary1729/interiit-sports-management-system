// server/routes/teams.js
const express = require('express');
const db = require('../db');

const router = express.Router();

// GET all institutes for dropdown
router.get('/institutes', async (req, res) => {
    try {
        const query = `
            SELECT 
                Institute_ID as id,
                Name as name,
                Short_Name as shortName
            FROM institutes
            ORDER BY Name
        `;
        const [results] = await db.query(query);
        res.json(results);
    } catch (error) {
        console.error('Error fetching institutes:', error);
        res.status(500).json({ error: error.message });
    }
});

// GET team sports/events for dropdown
router.get('/team-events', async (req, res) => {
    try {
        const query = `
            SELECT 
                e.Event_ID as id,
                e.Name as name,
                s.Name as sportName,
                e.Gender as gender
            FROM events e
            JOIN sports s ON e.Sport_ID = s.Sport_ID
            WHERE s.Type = 'Team'
            ORDER BY s.Name, e.Name
        `;
        const [results] = await db.query(query);
        res.json(results);
    } catch (error) {
        console.error('Error fetching team events:', error);
        res.status(500).json({ error: error.message });
    }
});

// GET participants by institute and gender for team member selection
router.get('/participants/:instituteId/:gender', async (req, res) => {
    try {
        const { instituteId, gender } = req.params;
        
        console.log('Fetching participants for:', { instituteId, gender });
        
        // Convert event gender to participant gender format
        let dbGender = gender;
        if (gender === 'Male') dbGender = 'M';
        else if (gender === 'Female') dbGender = 'F';
        
        let query = `
            SELECT 
                p.Participant_ID as id,
                p.Name as name,
                p.Gender as gender,
                p.Email as email,
                i.Name as instituteName
            FROM participants p
            JOIN institutes i ON p.Institute_ID = i.Institute_ID
            WHERE p.Institute_ID = ?
        `;
        
        const params = [instituteId];
        
        // Only filter by gender if it's not "Mixed"
        if (dbGender && dbGender !== 'Mixed') {
            query += ` AND p.Gender = ?`;
            params.push(dbGender);
        }
        
        query += ` ORDER BY p.Name`;
        
        console.log('Query:', query);
        console.log('Params:', params);
        
        const [results] = await db.query(query, params);
        console.log('Results count:', results.length);
        
        res.json(results);
    } catch (error) {
        console.error('Error fetching participants:', error);
        res.status(500).json({ error: error.message });
    }
});

// ✅ NEW: GET check if team exists for institute + event
router.get('/teams/check/:instituteId/:eventId', async (req, res) => {
    try {
        const { instituteId, eventId } = req.params;
        
        const query = `
            SELECT 
                t.Team_ID as id,
                t.Team_Name as teamName,
                t.Is_Active as isActive,
                t.Institute_ID as instituteId,
                t.Event_ID as eventId
            FROM teams t
            WHERE t.Institute_ID = ? AND t.Event_ID = ? AND t.Is_Active = 1
            LIMIT 1
        `;
        
        const [results] = await db.query(query, [instituteId, eventId]);
        
        if (results.length > 0) {
            res.json({ exists: true, team: results[0] });
        } else {
            res.json({ exists: false, team: null });
        }
    } catch (error) {
        console.error('Error checking team:', error);
        res.status(500).json({ error: error.message });
    }
});

// GET all teams with filters
router.get('/teams', async (req, res) => {
    try {
        const { instituteId, eventId } = req.query;
        
        let query = `
            SELECT 
                t.Team_ID as id,
                t.Team_Name as teamName,
                t.Creation_Date as creationDate,
                t.Is_Active as isActive,
                i.Name as instituteName,
                i.Short_Name as instituteShortName,
                e.Name as eventName,
                s.Name as sportName,
                COUNT(tm.Participant_ID) as memberCount,
                (SELECT p.Name 
                 FROM team_members tm2 
                 JOIN participants p ON tm2.Participant_ID = p.Participant_ID
                 WHERE tm2.Team_ID = t.Team_ID AND tm2.Role = 'Captain'
                 LIMIT 1) as captainName
            FROM teams t
            JOIN institutes i ON t.Institute_ID = i.Institute_ID
            JOIN events e ON t.Event_ID = e.Event_ID
            JOIN sports s ON e.Sport_ID = s.Sport_ID
            LEFT JOIN team_members tm ON t.Team_ID = tm.Team_ID
            WHERE 1=1
        `;
        
        const params = [];
        
        if (instituteId) {
            query += ` AND t.Institute_ID = ?`;
            params.push(instituteId);
        }
        
        if (eventId) {
            query += ` AND t.Event_ID = ?`;
            params.push(eventId);
        }
        
        query += ` GROUP BY t.Team_ID ORDER BY t.Creation_Date DESC`;
        
        const [results] = await db.query(query, params);
        res.json(results);
    } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({ error: error.message });
    }
});

// GET team details with members
router.get('/teams/:teamId', async (req, res) => {
    try {
        const { teamId } = req.params;
        
        const teamQuery = `
            SELECT 
                t.Team_ID as id,
                t.Team_Name as teamName,
                t.Creation_Date as creationDate,
                t.Is_Active as isActive,
                t.Institute_ID as instituteId,
                t.Event_ID as eventId,
                i.Name as instituteName,
                i.Short_Name as instituteShortName,
                e.Name as eventName,
                e.Gender as eventGender,
                s.Name as sportName
            FROM teams t
            JOIN institutes i ON t.Institute_ID = i.Institute_ID
            JOIN events e ON t.Event_ID = e.Event_ID
            JOIN sports s ON e.Sport_ID = s.Sport_ID
            WHERE t.Team_ID = ?
        `;
        
        const membersQuery = `
            SELECT 
                p.Participant_ID as id,
                p.Name as name,
                p.Gender as gender,
                p.Email as email,
                tm.Role as role
            FROM team_members tm
            JOIN participants p ON tm.Participant_ID = p.Participant_ID
            WHERE tm.Team_ID = ?
            ORDER BY 
                CASE WHEN tm.Role = 'Captain' THEN 0 ELSE 1 END,
                p.Name
        `;
        
        const [teamResult] = await db.query(teamQuery, [teamId]);
        const [membersResult] = await db.query(membersQuery, [teamId]);
        
        if (teamResult.length === 0) {
            return res.status(404).json({ error: 'Team not found' });
        }
        
        res.json({
            team: teamResult[0],
            members: membersResult
        });
    } catch (error) {
        console.error('Error fetching team details:', error);
        res.status(500).json({ error: error.message });
    }
});

// POST create new team
router.post('/teams', async (req, res) => {
    try {
        const { instituteId, eventId, teamName, captainId, memberIds } = req.body;
        
        if (!instituteId || !eventId || !teamName || !captainId || !memberIds || memberIds.length === 0) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        if (!memberIds.includes(captainId)) {
            return res.status(400).json({ error: 'Captain must be included in team members' });
        }
        
        // ✅ NEW: Check if team already exists for this institute + event
        const [existingTeam] = await db.query(
            'SELECT Team_ID, Team_Name FROM teams WHERE Institute_ID = ? AND Event_ID = ? AND Is_Active = 1',
            [instituteId, eventId]
        );
        
        if (existingTeam.length > 0) {
            return res.status(400).json({ 
                error: `A team "${existingTeam[0].Team_Name}" already exists for this institute and event. Please edit the existing team instead.`,
                existingTeamId: existingTeam[0].Team_ID
            });
        }
        
        // Get next Team_ID manually
        const [maxIdResult] = await db.query('SELECT IFNULL(MAX(Team_ID), 0) + 1 as nextId FROM teams');
        const nextTeamId = maxIdResult[0].nextId;
        
        const insertTeamQuery = `
            INSERT INTO teams (Team_ID, Institute_ID, Event_ID, Team_Name, Creation_Date, Is_Active)
            VALUES (?, ?, ?, ?, NOW(), 1)
        `;
        
        await db.query(insertTeamQuery, [nextTeamId, instituteId, eventId, teamName]);
        
        const insertMemberQuery = `
            INSERT INTO team_members (Team_ID, Participant_ID, Role)
            VALUES (?, ?, ?)
        `;
        
        for (const memberId of memberIds) {
            const role = memberId === captainId ? 'Captain' : 'Player';
            await db.query(insertMemberQuery, [nextTeamId, memberId, role]);
        }
        
        res.status(201).json({
            message: 'Team created successfully',
            teamId: nextTeamId
        });
    } catch (error) {
        console.error('Error creating team:', error);
        res.status(500).json({ error: error.message });
    }
});

// ✅ NEW: PUT update team members
router.put('/teams/:teamId/members', async (req, res) => {
    try {
        const { teamId } = req.params;
        const { captainId, memberIds } = req.body;
        
        if (!captainId || !memberIds || memberIds.length === 0) {
            return res.status(400).json({ error: 'Captain and members are required' });
        }
        
        if (!memberIds.includes(captainId)) {
            return res.status(400).json({ error: 'Captain must be included in team members' });
        }
        
        // Delete existing members
        await db.query('DELETE FROM team_members WHERE Team_ID = ?', [teamId]);
        
        // Add new members
        const insertMemberQuery = `
            INSERT INTO team_members (Team_ID, Participant_ID, Role)
            VALUES (?, ?, ?)
        `;
        
        for (const memberId of memberIds) {
            const role = memberId === captainId ? 'Captain' : 'Player';
            await db.query(insertMemberQuery, [teamId, memberId, role]);
        }
        
        res.json({ message: 'Team members updated successfully' });
    } catch (error) {
        console.error('Error updating team members:', error);
        res.status(500).json({ error: error.message });
    }
});

// PUT update team status
router.put('/teams/:teamId/status', async (req, res) => {
    try {
        const { teamId } = req.params;
        const { isActive } = req.body;
        
        const query = `
            UPDATE teams
            SET Is_Active = ?
            WHERE Team_ID = ?
        `;
        
        await db.query(query, [isActive ? 1 : 0, teamId]);
        
        res.json({
            message: `Team ${isActive ? 'activated' : 'deactivated'} successfully`
        });
    } catch (error) {
        console.error('Error updating team status:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
