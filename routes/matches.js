// routes/matches.js
import express from 'express';
import db from '../db/connection.js';

const router = express.Router();

// GET matches with optional team_id filter
router.get('/', async (req, res) => {
    try {
        const { team_id } = req.query;
        let query = `
            SELECT m.*, 
                   ht.name as home_team_name, 
                   at.name as away_team_name
            FROM matches m
            JOIN teams ht ON m.home_team_id = ht.id
            JOIN teams at ON m.away_team_id = at.id
        `;
        
        if (team_id) {
            query += ' WHERE m.home_team_id = ? OR m.away_team_id = ?';
            const [matches] = await db.query(query, [team_id, team_id]);
            res.json(matches);
        } else {
            const [matches] = await db.query(query);
            res.json(matches);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST update match scores
router.post('/scores/update', async (req, res) => {
    try {
        const { match_id, home_score, away_score } = req.body;
        const [result] = await db.query(
            'UPDATE matches SET home_score = ?, away_score = ? WHERE id = ?',
            [home_score, away_score, match_id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Match not found' });
        }
        
        res.json({ message: 'Scores updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;