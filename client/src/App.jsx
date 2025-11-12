// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import ParticipantManagement from './pages/ParticipantManagement.jsx';
import EventManagement from './pages/EventManagement.jsx';
import LogisticsManagement from './pages/LogisticsManagement.jsx';
import FinancialsAndIncidents from './pages/FinancialsAndIncidents.jsx';
import TeamsManagement from './pages/TeamsManagement.jsx'; // NEW

function App() {
    return (
        <Router>
            <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
                {/* Navigation Header */}
                <header style={headerStyle}>
                    <div style={logoStyle}>
                        🏆 Inter-IIT Sports Management System
                    </div>
                    <nav style={navStyle}>
                        <Link to="/" style={linkStyle}>🏠 Dashboard</Link>
                        <Link to="/participants" style={linkStyle}>👥 Participants</Link>
                        <Link to="/events" style={linkStyle}>📅 Events</Link>
                        <Link to="/teams" style={linkStyle}>🤝 Teams</Link> {/* NEW */}
                        <Link to="/logistics" style={linkStyle}>📦 Logistics</Link>
                        <Link to="/financials" style={linkStyle}>💰 Financials</Link>
                    </nav>
                </header>

                {/* Main Content Area: Routes */}
                <main style={mainStyle}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/participants" element={<ParticipantManagement />} />
                        <Route path="/events" element={<EventManagement />} />
                        <Route path="/teams" element={<TeamsManagement />} /> {/* NEW */}
                        <Route path="/logistics" element={<LogisticsManagement />} />
                        <Route path="/financials" element={<FinancialsAndIncidents />} />
                        <Route path="*" element={<div>404 Page Not Found</div>} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

const headerStyle = {
    background: 'var(--color-primary-dark, #1a365d)',
    color: '#fff',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold'
};

const navStyle = {
    display: 'flex',
    gap: '1.5rem'
};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background 0.3s',
    fontSize: '0.95rem',
    fontWeight: '500'
};

const mainStyle = {
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto'
};



export default App;
