# Sports Management API

A REST API built with Node.js, Express, and MySQL for managing sports teams, players, and matches.

## Features

- Team management (CRUD operations)
- Player management
- Match scheduling and score updates
- RESTful API endpoints

## Tech Stack

- Node.js
- Express.js
- MySQL
- nodemon (development)

## Setup

1. Clone the repository
```bash
git clone <your-repo-url>
cd database_connection
```

2. Install dependencies
```bash
npm install
```

3. Set up the database
- Create a MySQL database
- Import the schema from `models/schema.sql`
- Update database credentials in `db/connection.js`

4. Start the server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

- `GET /api/teams` - Get all teams
- `POST /api/teams` - Create a new team
- `GET /api/matches?team_id=3` - Get matches (optionally filtered by team)
- `POST /api/matches/scores/update` - Update match scores

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request