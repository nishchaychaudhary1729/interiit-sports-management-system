// server/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware Setup
app.use(cors({
    origin: 'http://localhost:5173' // This must match your Vite app's port
}));
app.use(express.json());

// Route Imports
const participantRoutes = require('./routes/participants');
const dashboardRoutes = require('./routes/dashboard'); 
const eventRoutes = require('./routes/events');
// NEW LOGISTICS IMPORT
const logisticsRoutes = require('./routes/logistics');

// Mount Routes
app.use('/api/participants', participantRoutes);
app.use('/api/dashboard', dashboardRoutes); 
app.use('/api/events', eventRoutes);
// NEW LOGISTICS MOUNT
app.use('/api/logistics', logisticsRoutes); 

app.get('/', (req, res) => {
    res.send('Sports Management API is Running!');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});