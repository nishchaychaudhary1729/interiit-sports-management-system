// client/src/pages/FinancialsAndIncidents.jsx
import React, { useState } from 'react';
import FinancialTracker from '../components/financials/FinancialTracker.jsx';
import IncidentLog from '../components/financials/IncidentLog.jsx';

function FinancialsAndIncidents() {
  const [activeTab, setActiveTab] = useState('financials');
  const [refreshKey, setRefreshKey] = useState(0); 

  const handleUpdate = () => {
      // Key is incremented to trigger a reload in the active tab component
      setRefreshKey(prev => prev + 1);
  };
    
  const renderContent = () => {
    switch (activeTab) {
      case 'financials':
        return <FinancialTracker refreshKey={refreshKey} onUpdate={handleUpdate} />;
      case 'incidents':
        return <IncidentLog refreshKey={refreshKey} onUpdate={handleUpdate} />;
      default:
        return null;
    }
  };

  const tabButtonStyle = (tabName) => ({
      padding: '10px 20px',
      marginRight: '10px',
      cursor: 'pointer',
      // Highlight the active tab with the primary dark color
      backgroundColor: activeTab === tabName ? 'var(--color-primary-dark)' : 'var(--color-secondary)',
      color: 'var(--color-white)',
      border: 'none',
      borderRadius: '4px',
      fontWeight: 'bold',
      transition: 'background-color 0.2s'
  });

  return (
    <div style={{ padding: '0px' }}>
      <h2>💰 Financial Tracking & Incident Log</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button style={tabButtonStyle('financials')} onClick={() => setActiveTab('financials')}>
          Transaction Tracker
        </button>
        <button style={tabButtonStyle('incidents')} onClick={() => setActiveTab('incidents')}>
          Incident Management
        </button>
      </div>
      
      <div style={{ 
          padding: '20px', 
          backgroundColor: 'var(--color-white)', 
          borderRadius: '8px', 
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
      }}>
        {renderContent()}
      </div>
    </div>
  );
}

export default FinancialsAndIncidents;