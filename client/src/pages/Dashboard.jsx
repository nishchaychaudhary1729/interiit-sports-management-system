// client/src/pages/Dashboard.jsx
import React from 'react';

function Dashboard() {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>🏆 Inter-IIT Sports Championship Dashboard</h2>
      <p>Welcome to the main management system. Use the navigation to view data and manage the event.</p>
      
      <div style={{ marginTop: '20px', padding: '15px', borderLeft: '3px solid #f39c12', backgroundColor: '#fffbe6' }}>
        **Note:** This is where the crucial **Institute Standings (Leaderboard)** will be displayed, using data from the `Institute_Standings` and `Match_Outcomes` tables.
      </div>
      
    </div>
  );
}

export default Dashboard;