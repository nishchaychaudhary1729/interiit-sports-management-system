// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import ParticipantManagement from './pages/ParticipantManagement.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Header */}
        <header style={headerStyle}>
          <h1 style={{ margin: 0, fontSize: '1.5em' }}>🏆 Inter-IIT Sports Management System</h1>
          <nav>
            <Link to="/" style={linkStyle}><span role="img" aria-label="home">🏠</span> Dashboard</Link> 
            <Link to="/participants" style={linkStyle}><span role="img" aria-label="participants">👤</span> Participants</Link>
            <Link to="/events" style={linkStyle}><span role="img" aria-label="events">🗓️</span> Events</Link>
            <Link to="/logistics" style={linkStyle}><span role="img" aria-label="logistics">📦</span> Logistics</Link>
          </nav>
        </header>

        {/* Main Content Area: Routes */}
        <main style={mainStyle}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/participants" element={<ParticipantManagement />} />
            
            <Route path="/events" element={<div style={comingSoonStyle}>🗓️ Match Scheduling & Results Module (Under Development)</div>} />
            <Route path="/logistics" element={<div style={comingSoonStyle}>📦 Transport & Equipment Management (Under Development)</div>} />
            
            <Route path="*" element={<h2 style={notFoundStyle}>404 Page Not Found</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const headerStyle = {
  background: 'var(--color-dark)',
  color: 'var(--color-white)',
  padding: '15px 40px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
};

const linkStyle = {
  color: 'var(--color-white)',
  textDecoration: 'none',
  marginLeft: '25px',
  fontWeight: '600',
  padding: '5px 0'
};

const mainStyle = {
  padding: '40px',
  maxWidth: '1400px',
  margin: '0 auto'
};

const comingSoonStyle = {
    padding: '30px',
    textAlign: 'center',
    backgroundColor: '#ffc107',
    color: 'var(--color-dark)',
    borderRadius: '8px',
    marginTop: '20px',
    fontWeight: 'bold'
};

const notFoundStyle = {
    color: 'var(--color-danger)',
    textAlign: 'center',
    marginTop: '50px'
}

export default App;