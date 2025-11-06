// server/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a connection pool to manage connections efficiently
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection on startup
pool.getConnection()
    .then(connection => {
        console.log('✅ Successfully connected to the database.');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Failed to connect to the database:', err.message);
        process.exit(1); // Exit if DB connection fails
    });

module.exports = pool;