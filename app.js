// app.js
import express from 'express';
import teamsRouter from './routes/teams.js';
import matchesRouter from './routes/matches.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/teams', teamsRouter);
app.use('/api/matches', matchesRouter);

// Basic error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});