// server/routes/participants.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// --- Helper Routes (for frontend dropdowns) ---
// Fetches Institutes, Hostels, and Messes for use in the creation form
router.get('/data/lookup', async (req, res) => {
    try {
        const [institutes] = await db.query('SELECT Institute_ID, Name, Short_Name FROM Institutes');
        const [hostels] = await db.query('SELECT Hostel_ID, Hostel_Name, Institute_ID FROM Hostels');
        const [messes] = await db.query('SELECT Mess_ID, Mess_Name, Institute_ID FROM Messes');
        res.json({ institutes, hostels, messes });
    } catch (err) {
        console.error('Error fetching lookup data:', err);
        res.status(500).json({ message: 'Error fetching lookup data.' });
    }
});


// --- CRUD Operations for Participants ---

// 1. READ ALL Participants (Including joined data for display)
router.get('/', async (req, res) => {
    try {
        const [results] = await db.query(`
            SELECT 
                P.Participant_ID, P.Name, P.DOB, P.Gender, P.Email,
                I.Short_Name AS Institute, 
                H.Hostel_Name AS Hostel, 
                M.Mess_Name AS Mess
            FROM Participants P
            JOIN Institutes I ON P.Institute_ID = I.Institute_ID
            JOIN Hostels H ON P.Hostel_ID = H.Hostel_ID
            JOIN Messes M ON P.Mess_ID = M.Mess_ID
            ORDER BY P.Institute_ID, P.Name
        `);
        res.json(results);
    } catch (err) {
        console.error('Database Error in GET /api/participants:', err);
        res.status(500).json({ message: 'Failed to fetch participants data.' });
    }
});

// 2. CREATE New Participant (POST)
router.post('/', async (req, res) => {
    const { name, dob, gender, email, hostelId, instituteId, messId } = req.body;
    
    // Simple validation (Add more robust validation in a real app)
    if (!name || !email || !instituteId) {
        return res.status(400).json({ message: 'Missing required participant fields.' });
    }

    try {
        const query = `
            INSERT INTO Participants 
            (Name, DOB, Gender, Email, Hostel_ID, Institute_ID, Mess_ID)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(query, [name, dob, gender, email, hostelId, instituteId, messId]);

        res.status(201).json({ 
            message: 'Participant registered successfully.', 
            id: result.insertId 
        });
    } catch (err) {
        // Handle database errors (e.g., foreign key violations, duplicate emails)
        console.error('Error registering participant:', err.message);
        res.status(400).json({ 
            message: 'Registration failed. Check if email is unique or if IDs (Hostel, Institute, Mess) exist.',
            error: err.code 
        });
    }
});


// 3. UPDATE Participant (PUT) - Placeholder
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, hostelId, messId } = req.body;
    
    try {
        const query = `
            UPDATE Participants 
            SET Name = ?, Email = ?, Hostel_ID = ?, Mess_ID = ?
            WHERE Participant_ID = ?
        `;
        const [result] = await db.query(query, [name, email, hostelId, messId, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Participant not found.' });
        }

        res.json({ message: `Participant ${id} updated successfully.` });
    } catch (err) {
        console.error('Error updating participant:', err.message);
        res.status(400).json({ message: 'Update failed.' });
    }
});

// 4. DELETE Participant (DELETE) - Placeholder
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const [result] = await db.query('DELETE FROM Participants WHERE Participant_ID = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Participant not found.' });
        }
        // Note: Delete might fail due to FK constraints (e.g., still in a team)
        res.json({ message: `Participant ${id} deleted successfully.` });
    } catch (err) {
        console.error('Error deleting participant:', err.message);
        res.status(400).json({ 
            message: 'Deletion failed due to existing records (e.g., in Teams, Registrations). Remove those first.', 
            error: err.code 
        });
    }
});


module.exports = router;