// server/routes/dashboard.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// 1. Fetch Institute Standings (Leaderboard) - FIXED SQL SYNTAX by changing alias
router.get('/standings', async (req, res) => {
    try {
        // Query FIX: Changed alias from IS to INST_STAND to avoid keyword conflict.
        const [standings] = await db.query(`
            SELECT
                I.Short_Name AS Institute,
                INST_STAND.Total_points
            FROM Institute_Standings AS INST_STAND
            JOIN Institutes I ON INST_STAND.Institute_ID = I.Institute_ID
            ORDER BY INST_STAND.Total_points DESC, I.Short_Name
        `);
        res.json(standings);
    } catch (err) {
        console.error('Error fetching dashboard standings:', err);
        res.status(500).json({ message: 'Failed to fetch institute standings.' });
    }
});

// 2. Fetch Recent Match Results (for quick glance)
router.get('/recent-results', async (req, res) => {
    try {
        const [results] = await db.query(`
            SELECT
                M.Match_ID,
                E.Name AS Event_Name,
                M.Score_Summary,
                DATE_FORMAT(M.Match_Date, '%Y-%m-%d') AS Match_Date,
                V.Name AS Venue_Name,
                M.Status
            FROM Matches M
            JOIN Events E ON M.Event_ID = E.Event_ID
            JOIN Venues V ON M.Venue_ID = V.Venue_ID
            WHERE M.Status = 'Completed'
            ORDER BY M.Match_Date DESC, M.Start_time DESC
            LIMIT 5
        `);
        res.json(results);
    } catch (err) {
        console.error('Error fetching recent results:', err);
        res.status(500).json({ message: 'Failed to fetch recent results.' });
    }
});

module.exports = router;