// client/src/pages/LogisticsManagement.jsx
import React, { useState } from 'react';
import StaffRoster from '../components/logistics/StaffRoster.jsx';
import EquipmentManager from '../components/logistics/EquipmentManager.jsx';
import TransportScheduler from '../components/logistics/TransportScheduler.jsx';

function LogisticsManagement() {
  const [activeTab, setActiveTab] = useState('staff');
  const [refreshKey, setRefreshKey] = useState(0); 

  const handleUpdate = () => {
      setRefreshKey(prev => prev + 1);
  };
    
  const renderContent = () => {
    switch (activeTab) {
      case 'staff':
        return <StaffRoster refreshKey={refreshKey} onStaffUpdate={handleUpdate} />;
      case 'equipment':
        return <EquipmentManager refreshKey={refreshKey} onEquipmentUpdate={handleUpdate} />;
      case 'transport':
        return <TransportScheduler refreshKey={refreshKey} onScheduleUpdate={handleUpdate} />;
      default:
        return null;
    }
  };

  const tabButtonStyle = (tabName) => ({
      padding: '10px 20px',
      marginRight: '10px',
      cursor: 'pointer',
      backgroundColor: activeTab === tabName ? 'var(--color-primary-dark)' : 'var(--color-secondary)',
      color: 'var(--color-white)',
      border: 'none',
      borderRadius: '4px',
      fontWeight: 'bold'
  });

  return (
    <div style={{ padding: '0px' }}>
      <h2>📦 Logistics & Inventory Management</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button style={tabButtonStyle('staff')} onClick={() => setActiveTab('staff')}>
          Staff Roster
        </button>
        <button style={tabButtonStyle('equipment')} onClick={() => setActiveTab('equipment')}>
          Equipment Manager
        </button>
        <button style={tabButtonStyle('transport')} onClick={() => setActiveTab('transport')}>
          Transport Scheduler
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

export default LogisticsManagement;