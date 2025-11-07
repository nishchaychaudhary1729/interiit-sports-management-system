// client/src/components/logistics/TransportScheduler.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { fetchTransportRoutes, fetchTransportVehicles, fetchTransportSchedules, createTransportRoute, createTransportVehicle, createTransportSchedule, fetchStaffRoster } from '../../services/api';

// --- Sub-Component: Route Form ---
function RouteForm({ onCreation, onToggle }) {
    const [formData, setFormData] = useState({ routeId: '', routeName: '', description: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); setError('');
        try {
            const result = await createTransportRoute(formData);
            setMessage(result.message);
            onCreation();
            setFormData({ routeId: '', routeName: '', description: '' });
        } catch (err) {
            setError(err.message || 'Route creation failed.');
        }
    };

    const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

    return (
        <div style={{ padding: '15px', border: '1px solid #28a745', borderRadius: '6px', backgroundColor: '#e9f7ef' }}>
            <h4 style={{ color: 'var(--color-success)', marginTop: 0 }}>Add New Route</h4>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input name="routeId" type="number" placeholder="Route ID (e.g., 21)" value={formData.routeId} onChange={handleChange} required />
                <input name="routeName" type="text" placeholder="Route Name (e.g., Airport Express)" value={formData.routeName} onChange={handleChange} required />
                <textarea name="description" placeholder="Description (Optional)" value={formData.description} onChange={handleChange} rows="2" />
                {message && <p style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>{message}</p>}
                {error && <p style={{ color: 'var(--color-danger)', fontWeight: 'bold' }}>{error}</p>}
                <button type="submit" style={{ backgroundColor: 'var(--color-success)' }}>Create Route</button>
                <button type="button" onClick={onToggle} style={{ backgroundColor: 'var(--color-secondary)' }}>Hide</button>
            </form>
        </div>
    );
}

// --- Sub-Component: Vehicle Form ---
function VehicleForm({ onCreation, routes, onToggle }) {
    const [formData, setFormData] = useState({ vehicleId: '', vehicleName: '', licensePlate: '', capacity: '', defaultRouteId: routes[0]?.Route_ID || '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setFormData(p => ({ ...p, defaultRouteId: routes[0]?.Route_ID || '' }));
    }, [routes]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); setError('');
        try {
            const dataToSend = { ...formData, vehicleId: parseInt(formData.vehicleId), capacity: parseInt(formData.capacity), defaultRouteId: parseInt(formData.defaultRouteId) };
            const result = await createTransportVehicle(dataToSend);
            setMessage(result.message);
            onCreation();
            setFormData(p => ({ ...p, vehicleId: '', vehicleName: '', licensePlate: '', capacity: '' }));
        } catch (err) {
            setError(err.message || 'Vehicle creation failed.');
        }
    };

    const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

    return (
        <div style={{ padding: '15px', border: '1px solid #007bff', borderRadius: '6px', backgroundColor: '#f0f8ff' }}>
            <h4 style={{ color: 'var(--color-primary)', marginTop: 0 }}>Add New Vehicle</h4>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input name="vehicleId" type="number" placeholder="Vehicle ID (e.g., 75)" value={formData.vehicleId} onChange={handleChange} required />
                <input name="vehicleName" type="text" placeholder="Vehicle Name (e.g., Mini Bus 7)" value={formData.vehicleName} onChange={handleChange} required />
                <input name="licensePlate" type="text" placeholder="License Plate (e.g., TN01ZZ9999)" value={formData.licensePlate} onChange={handleChange} required />
                <input name="capacity" type="number" placeholder="Capacity" value={formData.capacity} onChange={handleChange} required min="1" />
                <select name="defaultRouteId" value={formData.defaultRouteId} onChange={handleChange} required>
                    {routes.map(r => <option key={r.Route_ID} value={r.Route_ID}>{r.Route_Name}</option>)}
                </select>
                {message && <p style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>{message}</p>}
                {error && <p style={{ color: 'var(--color-danger)', fontWeight: 'bold' }}>{error}</p>}
                <button type="submit" style={{ backgroundColor: 'var(--color-primary)' }}>Create Vehicle</button>
                <button type="button" onClick={onToggle} style={{ backgroundColor: 'var(--color-secondary)' }}>Hide</button>
            </form>
        </div>
    );
}

// --- Sub-Component: Schedule Form ---
function ScheduleForm({ onCreation, routes, vehicles, staff, onToggle }) {
    const [formData, setFormData] = useState({ staffId: staff[0]?.Staff_ID || '', routeId: routes[0]?.Route_ID || '', vehicleId: vehicles[0]?.Vehicle_ID || '', departureTime: new Date().toISOString().slice(0, 16) });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setFormData(p => ({ 
            ...p, 
            staffId: staff[0]?.Staff_ID || '', 
            routeId: routes[0]?.Route_ID || '', 
            vehicleId: vehicles[0]?.Vehicle_ID || '' 
        }));
    }, [routes, vehicles, staff]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); setError('');
        try {
            const dataToSend = { 
                staffId: parseInt(formData.staffId), 
                routeId: parseInt(formData.routeId), 
                vehicleId: parseInt(formData.vehicleId), 
                departureTime: formData.departureTime.replace('T', ' ') + ':00' // Format YYYY-MM-DD HH:MM:SS
            };
            const result = await createTransportSchedule(dataToSend);
            setMessage(result.message);
            onCreation();
        } catch (err) {
            setError(err.message || 'Schedule creation failed.');
        }
    };

    const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
    
    // Check if data is loaded
    if (routes.length === 0 || vehicles.length === 0 || staff.length === 0) {
        return <p style={{ color: 'var(--color-warning)' }}>Loading dependencies or missing data to create a schedule.</p>;
    }

    return (
        <div style={{ padding: '15px', border: '1px solid var(--color-primary-dark)', borderRadius: '6px', backgroundColor: '#f0f8ff' }}>
            <h4 style={{ color: 'var(--color-primary-dark)', marginTop: 0 }}>Create New Schedule</h4>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                
                <label style={{ fontWeight: 'bold', fontSize: '0.9em' }}>Driver (Staff):</label>
                <select name="staffId" value={formData.staffId} onChange={handleChange} required>
                    {staff.map(s => <option key={s.Staff_ID} value={s.Staff_ID}>{s.Name}</option>)}
                </select>

                <label style={{ fontWeight: 'bold', fontSize: '0.9em' }}>Route:</label>
                <select name="routeId" value={formData.routeId} onChange={handleChange} required>
                    {routes.map(r => <option key={r.Route_ID} value={r.Route_ID}>{r.Route_Name}</option>)}
                </select>

                <label style={{ fontWeight: 'bold', fontSize: '0.9em' }}>Vehicle:</label>
                <select name="vehicleId" value={formData.vehicleId} onChange={handleChange} required>
                    {vehicles.map(v => <option key={v.Vehicle_ID} value={v.Vehicle_ID}>{v.Vehicle_Name} ({v.License_plate})</option>)}
                </select>
                
                <label style={{ fontWeight: 'bold', fontSize: '0.9em' }}>Departure Time:</label>
                <input name="departureTime" type="datetime-local" value={formData.departureTime} onChange={handleChange} required />
                
                {message && <p style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>{message}</p>}
                {error && <p style={{ color: 'var(--color-danger)', fontWeight: 'bold' }}>{error}</p>}
                <button type="submit" style={{ backgroundColor: 'var(--color-primary)' }}>Schedule Trip</button>
                <button type="button" onClick={onToggle} style={{ backgroundColor: 'var(--color-secondary)' }}>Hide</button>
            </form>
        </div>
    );
}

// --- Main Transport Scheduler Component ---
function TransportScheduler({ refreshKey, onScheduleUpdate }) {
    const [routes, setRoutes] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeForm, setActiveForm] = useState(null); // 'route', 'vehicle', 'schedule'

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [routesData, vehiclesData, schedulesData, staffData] = await Promise.all([
                fetchTransportRoutes(),
                fetchTransportVehicles(),
                fetchTransportSchedules(),
                fetchStaffRoster() 
            ]);
            setRoutes(routesData);
            setVehicles(vehiclesData);
            setSchedules(schedulesData);
            setStaff(staffData);
        } catch (err) {
            setError('Could not fetch transport data. Check server connection.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData, refreshKey]);

    const tableHeaderStyle = { padding: '12px 10px', textAlign: 'left', borderRight: '1px solid rgba(255,255,255,0.2)', fontWeight: '600' };
    const tableCellStyle = { padding: '10px', borderRight: '1px solid #ddd' };

    const handleFormToggle = (formName) => {
        setActiveForm(activeForm === formName ? null : formName);
    };

    const handleCreation = () => {
        loadData(); // Reload data after successful creation
        setActiveForm(null);
        onScheduleUpdate();
    };
    
    if (loading) return <p>Loading Transport Data...</p>;
    if (error) return <p style={{ color: 'var(--color-danger)', fontWeight: 'bold' }}>Error: {error}</p>;
    
    const renderRoutes = () => (
        <div style={{ marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '6px' }}>
            <h4 style={{ color: 'var(--color-primary-dark)', borderBottom: '1px dashed #ccc', paddingBottom: '5px' }}>
                Defined Routes ({routes.length}) 
                <button onClick={() => handleFormToggle('route')} style={{ float: 'right', backgroundColor: activeForm === 'route' ? 'var(--color-danger)' : 'var(--color-success)', padding: '5px 10px', fontSize: '0.9em' }}>
                    {activeForm === 'route' ? 'Cancel' : '+ Route'}
                </button>
            </h4>
            {activeForm === 'route' && <RouteForm onCreation={handleCreation} onToggle={() => handleFormToggle('route')} />}
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-white)', position: 'sticky', top: 0 }}>
                            <th style={tableHeaderStyle}>ID</th>
                            <th style={tableHeaderStyle}>Route Name</th>
                            <th style={tableHeaderStyle}>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {routes.map((r, index) => (
                            <tr key={r.Route_ID} style={{ borderBottom: '1px solid #e0e0e0', backgroundColor: index % 2 === 0 ? 'var(--color-white)' : '#f5f5f5' }}>
                                <td style={tableCellStyle}>{r.Route_ID}</td>
                                <td style={tableCellStyle}>{r.Route_Name}</td>
                                <td style={tableCellStyle}>{r.Description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderVehicles = () => (
        <div style={{ marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '6px' }}>
            <h4 style={{ color: 'var(--color-primary-dark)', borderBottom: '1px dashed #ccc', paddingBottom: '5px' }}>
                Vehicle Fleet ({vehicles.length})
                <button onClick={() => handleFormToggle('vehicle')} style={{ float: 'right', backgroundColor: activeForm === 'vehicle' ? 'var(--color-danger)' : 'var(--color-success)', padding: '5px 10px', fontSize: '0.9em' }}>
                    {activeForm === 'vehicle' ? 'Cancel' : '+ Vehicle'}
                </button>
            </h4>
            {activeForm === 'vehicle' && <VehicleForm onCreation={handleCreation} routes={routes} onToggle={() => handleFormToggle('vehicle')} />}
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-white)', position: 'sticky', top: 0 }}>
                            <th style={tableHeaderStyle}>Name / ID</th>
                            <th style={tableHeaderStyle}>Plate</th>
                            <th style={tableHeaderStyle}>Capacity</th>
                            <th style={tableHeaderStyle}>Default Route</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((v, index) => (
                            <tr key={v.Vehicle_ID} style={{ borderBottom: '1px solid #e0e0e0', backgroundColor: index % 2 === 0 ? 'var(--color-white)' : '#f5f5f5' }}>
                                <td style={tableCellStyle}>{v.Vehicle_Name} ({v.Vehicle_ID})</td>
                                <td style={tableCellStyle}>{v.License_plate}</td>
                                <td style={tableCellStyle}>{v.Capacity}</td>
                                <td style={tableCellStyle}>{v.Default_Route_Name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderSchedules = () => (
        <div style={{ marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '6px' }}>
            <h4 style={{ color: 'var(--color-primary-dark)', borderBottom: '1px dashed #ccc', paddingBottom: '5px' }}>
                Current Schedules ({schedules.length})
                <button onClick={() => handleFormToggle('schedule')} style={{ float: 'right', backgroundColor: activeForm === 'schedule' ? 'var(--color-danger)' : 'var(--color-success)', padding: '5px 10px', fontSize: '0.9em' }}>
                    {activeForm === 'schedule' ? 'Cancel' : '+ Schedule'}
                </button>
            </h4>
            {activeForm === 'schedule' && <ScheduleForm onCreation={handleCreation} routes={routes} vehicles={vehicles} staff={staff} onToggle={() => handleFormToggle('schedule')} />}
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-white)', position: 'sticky', top: 0 }}>
                            <th style={tableHeaderStyle}>Schedule ID</th>
                            <th style={tableHeaderStyle}>Route</th>
                            <th style={tableHeaderStyle}>Time</th>
                            <th style={tableHeaderStyle}>Vehicle</th>
                            <th style={tableHeaderStyle}>Driver</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((s, index) => (
                            <tr key={s.Schedule_ID} style={{ borderBottom: '1px solid #e0e0e0', backgroundColor: index % 2 === 0 ? 'var(--color-white)' : '#f5f5f5' }}>
                                <td style={tableCellStyle}>{s.Schedule_ID}</td>
                                <td style={tableCellStyle}>{s.Route_Name}</td>
                                <td style={tableCellStyle}>{new Date(s.Departure_time).toLocaleString()}</td>
                                <td style={tableCellStyle}>{s.Vehicle_Name} ({s.License_plate})</td>
                                <td style={tableCellStyle}>{s.Staff_Driver}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    // --- Main Render ---
    return (
        <div>
            <h3 style={{ color: 'var(--color-primary-dark)', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                Transport Routes & Scheduling Overview
            </h3>
            
            <div className="responsive-flex-container" style={{ display: 'flex', gap: 'var(--gap-base)', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
                    {renderRoutes()}
                </div>
                <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
                    {renderVehicles()}
                </div>
            </div>
            
            {renderSchedules()}
        </div>
    );
}

export default TransportScheduler;