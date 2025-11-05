// routes/teams.js
import express from 'express';
import db from '../db/connection.js';

const router = express.Router();

// GET all teams
router.get('/', async (req, res) => {
    try {
        const [teams] = await db.query('SELECT * FROM teams');
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create new team
router.post('/', async (req, res) => {
    try {
        const { name, location, founded_year } = req.body;
        const [result] = await db.query(
            'INSERT INTO teams (name, location, founded_year) VALUES (?, ?, ?)',
            [name, location, founded_year]
        );
        res.status(201).json({ id: result.insertId, name, location, founded_year });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;