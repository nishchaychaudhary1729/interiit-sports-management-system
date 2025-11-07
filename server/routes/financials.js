// server/routes/financials.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// --- FINANCIAL TRANSACTIONS ROUTES ---

// 1. Fetch All Transactions (READ)
router.get('/transactions', async (req, res) => {
    try {
        const [transactions] = await db.query(`
            SELECT 
                FT.Transaction_ID, FT.Amount, FT.Transaction_Date, FT.Payment_Status, FT.Type,
                P.Name AS Participant_Name, P.Participant_ID,
                E.Name AS Event_Name
            FROM Financial_Transactions FT
            JOIN Participants P ON FT.Participant_ID = P.Participant_ID
            JOIN Events E ON FT.Event_ID = E.Event_ID
            ORDER BY FT.Transaction_Date DESC
        `);
        res.json(transactions);
    } catch (err) {
        console.error('Error fetching financial transactions:', err);
        res.status(500).json({ message: 'Failed to fetch financial transactions.' });
    }
});

// 2. Add New Transaction (Fine/Sponsorship/Registration) (CREATE)
router.post('/transactions', async (req, res) => {
    const { participantId, eventId, amount, transactionDate, paymentStatus, type } = req.body;
    
    if (!participantId || !eventId || !amount || !transactionDate || !paymentStatus || !type) {
        return res.status(400).json({ message: 'Missing required transaction fields.' });
    }

    try {
        const query = `
            INSERT INTO Financial_Transactions 
            (Participant_ID, Event_ID, Amount, Transaction_Date, Payment_Status, Type) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(query, [participantId, eventId, amount, transactionDate, paymentStatus, type]);

        res.status(201).json({ 
            message: `${type} transaction recorded successfully. ID: ${result.insertId}`, 
            id: result.insertId 
        });
    } catch (err) {
        console.error(`Error recording ${type} transaction:`, err.message);
        res.status(500).json({ 
            message: `Failed to record ${type} transaction due to a database error.`,
            error: err.code 
        });
    }
});


// --- INCIDENT REPORTS ROUTES ---

// 3. Fetch All Incident Reports (READ)
router.get('/incidents', async (req, res) => {
    try {
        const [reports] = await db.query(`
            SELECT 
                IR.Report_ID, IR.Time, IR.Description, IR.Action_taken, IR.Severity,
                P.Name AS Participant_Name, P.Participant_ID,
                S.Name AS Staff_Reporter
            FROM Incident_Reports IR
            JOIN Staff S ON IR.Staff_ID = S.Staff_ID
            LEFT JOIN Participants P ON IR.Participant_ID = P.Participant_ID
            ORDER BY IR.Time DESC
        `);
        res.json(reports);
    } catch (err) {
        console.error('Error fetching incident reports:', err);
        res.status(500).json({ message: 'Failed to fetch incident reports.' });
    }
});


// 4. Create New Incident Report (CREATE)
router.post('/incidents', async (req, res) => {
    const { participantId, staffId, description, severity, actionTaken } = req.body;
    
    if (!staffId || !description || !severity) {
        return res.status(400).json({ message: 'Missing required incident fields: Staff, Description, or Severity.' });
    }

    try {
        const query = `
            INSERT INTO Incident_Reports 
            (Participant_ID, Staff_ID, Time, Description, Severity, Action_taken) 
            VALUES (?, ?, NOW(), ?, ?, ?)
        `;
        const [result] = await db.query(query, [participantId || null, staffId, description, severity, actionTaken || null]);

        res.status(201).json({ 
            message: `Incident report ID ${result.insertId} filed successfully.`, 
            id: result.insertId 
        });
    } catch (err) {
        console.error('Error creating incident report:', err.message);
        res.status(500).json({ 
            message: 'Failed to create incident report.',
            error: err.code 
        });
    }
});


module.exports = router;