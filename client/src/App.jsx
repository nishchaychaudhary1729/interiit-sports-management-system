// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import ParticipantManagement from './pages/ParticipantManagement.jsx';
import EventManagement from './pages/EventManagement.jsx'; 
// NEW IMPORTS
import LogisticsManagement from './pages/LogisticsManagement.jsx';
import FinancialsAndIncidents from './pages/FinancialsAndIncidents.jsx';


// Placeholder components for unbuilt modules
const FinancialsPlaceholder = () => <div style={comingSoonStyle}>💰 Financial Tracking & Incident Log (Under Development)</div>;


function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Header */}
        <header style={headerStyle}>
          <h1 style={{ margin: 0, fontSize: '1.5em' }}>🏆 Inter-IIT Sports Management System</h1>
          <nav>
            <Link to="/" style={linkStyle}>🏠 Dashboard</Link> 
            <Link to="/participants" style={linkStyle}>👤 Participants</Link>
            <Link to="/events" style={linkStyle}>🗓️ Events</Link>
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
            {/* UPDATED LOGISTICS ROUTE */}
            <Route path="/logistics" element={<LogisticsManagement />} />
            <Route path="/financials" element={<FinancialsPlaceholder />} />
            
            <Route path="*" element={<h2 style={notFoundStyle}>404 Page Not Found</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const headerStyle = {
  background: 'var(--color-primary-dark)',
  color: 'var(--color-white)',
  padding: '15px 40px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)'
};

const linkStyle = {
  color: 'var(--color-white)',
  textDecoration: 'none',
  marginLeft: '25px',
  fontWeight: '600',
  padding: '5px 0'
};

const mainStyle = {
  padding: 'var(--padding-base) 40px',
  maxWidth: '1400px',
  margin: '0 auto'
};

const comingSoonStyle = {
    padding: '30px',
    textAlign: 'center',
    backgroundColor: 'var(--color-warning)',
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