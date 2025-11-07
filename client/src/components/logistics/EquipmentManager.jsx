// client/src/components/logistics/EquipmentManager.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { fetchEquipmentInventory, fetchEquipmentCheckouts, checkoutEquipment, checkinEquipment, fetchStaffRoster } from '../../services/api';

// --- Checkout/Checkin Form Component ---
function CheckoutForm({ inventory, staff, onAction }) {
    const availableItems = inventory.filter(item => item.Status === 'Available');
    const issuedItems = inventory.filter(item => item.Status === 'Issued');

    const [checkoutData, setCheckoutData] = useState({ staffId: staff[0]?.Staff_ID || '', itemId: availableItems[0]?.Item_ID || '' });
    const [checkinId, setCheckinId] = useState(issuedItems[0]?.Item_ID || '');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [mode, setMode] = useState('checkout'); // 'checkout' or 'checkin'

    useEffect(() => {
        setCheckoutData(prev => ({ ...prev, staffId: staff[0]?.Staff_ID || '', itemId: availableItems[0]?.Item_ID || '' }));
        setCheckinId(issuedItems[0]?.Item_ID || '');
    }, [inventory, staff]);

    const handleCheckout = async (e) => {
        e.preventDefault();
        setMessage(''); setError('');
        if (!checkoutData.staffId || !checkoutData.itemId) return setError('Please select both staff and item.');

        try {
            const result = await checkoutEquipment(parseInt(checkoutData.staffId), parseInt(checkoutData.itemId));
            setMessage(result.message);
            onAction();
        } catch (err) {
            setError(err.message || 'Checkout failed.');
        }
    };

    const handleCheckin = async (e) => {
        e.preventDefault();
        setMessage(''); setError('');
        if (!checkinId) return setError('Please select an item to check in.');

        try {
            const result = await checkinEquipment(parseInt(checkinId));
            setMessage(result.message);
            onAction();
        } catch (err) {
            setError(err.message || 'Checkin failed.');
        }
    };

    return (
        <div style={{ padding: '15px', border: '1px solid var(--color-primary-dark)', borderRadius: '6px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <button style={{ flex: 1, backgroundColor: mode === 'checkout' ? 'var(--color-success)' : 'var(--color-secondary)' }} onClick={() => setMode('checkout')}>Checkout</button>
                <button style={{ flex: 1, backgroundColor: mode === 'checkin' ? 'var(--color-primary)' : 'var(--color-secondary)' }} onClick={() => setMode('checkin')}>Checkin</button>
            </div>
            {message && <p style={{ color: 'var(--color-success)', fontWeight: 'bold', margin: '0 0 10px 0' }}>{message}</p>}
            {error && <p style={{ color: 'var(--color-danger)', fontWeight: 'bold', margin: '0 0 10px 0' }}>{error}</p>}
            
            {mode === 'checkout' ? (
                <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <select value={checkoutData.staffId} onChange={(e) => setCheckoutData(p => ({...p, staffId: e.target.value}))} required>
                        {staff.map(s => <option key={s.Staff_ID} value={s.Staff_ID}>{s.Name}</option>)}
                    </select>
                    <select value={checkoutData.itemId} onChange={(e) => setCheckoutData(p => ({...p, itemId: e.target.value}))} required disabled={availableItems.length === 0}>
                        {availableItems.length > 0 ? availableItems.map(item => <option key={item.Item_ID} value={item.Item_ID}>{item.Item_Code} ({item.Type_Name})</option>) : <option value="">No Items Available</option>}
                    </select>
                    <button type="submit" style={{ backgroundColor: 'var(--color-success)' }} disabled={availableItems.length === 0}>Complete Checkout</button>
                </form>
            ) : (
                <form onSubmit={handleCheckin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <select value={checkinId} onChange={(e) => setCheckinId(e.target.value)} required disabled={issuedItems.length === 0}>
                        {issuedItems.length > 0 ? issuedItems.map(item => <option key={item.Item_ID} value={item.Item_ID}>{item.Item_Code} ({item.Type_Name})</option>) : <option value="">No Items Issued</option>}
                    </select>
                    <button type="submit" style={{ backgroundColor: 'var(--color-primary)' }} disabled={issuedItems.length === 0}>Complete Checkin</button>
                </form>
            )}
        </div>
    );
}

// --- Main Equipment Manager Component ---
function EquipmentManager({ refreshKey, onEquipmentUpdate }) {
    const [inventory, setInventory] = useState([]);
    const [checkouts, setCheckouts] = useState([]); // FIX: Corrected initialization
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [inv, chk, staffList] = await Promise.all([
                fetchEquipmentInventory(),
                fetchEquipmentCheckouts(),
                fetchStaffRoster()
            ]);
            setInventory(inv);
            setCheckouts(chk);
            setStaff(staffList);
        } catch (err) {
            setError('Could not fetch equipment data. Check server connection.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData, refreshKey]);
    
    const tableHeaderStyle = { padding: '12px 10px', textAlign: 'left', borderRight: '1px solid rgba(255,255,255,0.2)', fontWeight: '600' };
    const tableCellStyle = { padding: '10px', borderRight: '1px solid #ddd' };

    if (loading) return <p>Loading Equipment Manager...</p>;
    if (error) return <p style={{ color: 'var(--color-danger)', fontWeight: 'bold' }}>Error: {error}</p>;
    
    const availableCount = inventory.filter(i => i.Status === 'Available').length;
    const issuedCount = inventory.filter(i => i.Status === 'Issued').length;
    const maintenanceCount = inventory.filter(i => i.Status === 'Maintenance').length;

    return (
        <div>
            <h3 style={{ color: 'var(--color-primary-dark)', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                Equipment Inventory & Checkouts
            </h3>

            {/* Checkout Form (Top Section) */}
            <CheckoutForm inventory={inventory} staff={staff} onAction={onEquipmentUpdate} />

            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ padding: '10px', borderLeft: '4px solid var(--color-success)', backgroundColor: '#e9f7ef', flex: 1 }}>Total Available: **{availableCount}**</div>
                <div style={{ padding: '10px', borderLeft: '4px solid var(--color-primary)', backgroundColor: '#f0f8ff', flex: 1 }}>Total Issued: **{issuedCount}**</div>
                <div style={{ padding: '10px', borderLeft: '4px solid var(--color-warning)', backgroundColor: '#fffbe6', flex: 1 }}>Total Maintenance: **{maintenanceCount}**</div>
            </div>

            {/* Inventory List */}
            <h4 style={{ color: 'var(--color-primary-dark)', marginTop: '20px', borderBottom: '1px dashed #ccc', paddingBottom: '5px' }}>Current Inventory Status</h4>
            <div style={{ maxHeight: '400px', overflowY: 'auto', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '6px', marginBottom: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-white)', position: 'sticky', top: 0 }}>
                            <th style={tableHeaderStyle}>ID</th>
                            <th style={tableHeaderStyle}>Item Type</th>
                            <th style={tableHeaderStyle}>Code</th>
                            <th style={tableHeaderStyle}>Status</th>
                            <th style={tableHeaderStyle}>Condition</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map((i, index) => (
                            <tr key={i.Item_ID} style={{ borderBottom: '1px solid #e0e0e0', backgroundColor: index % 2 === 0 ? 'var(--color-white)' : '#f5f5f5' }}>
                                <td style={tableCellStyle}>{i.Item_ID}</td>
                                <td style={tableCellStyle}>{i.Type_Name}</td>
                                <td style={tableCellStyle}>{i.Item_Code}</td>
                                <td style={{...tableCellStyle, color: i.Status === 'Available' ? 'var(--color-success)' : (i.Status === 'Issued' ? 'var(--color-primary)' : 'var(--color-warning)')}}>{i.Status}</td>
                                <td style={tableCellStyle}>{i.Conditions}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Checkout Log */}
            <h4 style={{ color: 'var(--color-primary-dark)', borderBottom: '1px dashed #ccc', paddingBottom: '5px' }}>Recent Checkout Log</h4>
            <div style={{ maxHeight: '300px', overflowY: 'auto', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '6px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-white)', position: 'sticky', top: 0 }}>
                            <th style={tableHeaderStyle}>Checkout ID</th>
                            <th style={tableHeaderStyle}>Item Code</th>
                            <th style={tableHeaderStyle}>Staff</th>
                            <th style={tableHeaderStyle}>Out Time</th>
                            <th style={tableHeaderStyle}>In Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkouts.map((c, index) => (
                            <tr key={c.Checkout_ID} style={{ borderBottom: '1px solid #e0e0e0', backgroundColor: index % 2 === 0 ? 'var(--color-white)' : '#f5f5f5' }}>
                                <td style={tableCellStyle}>{c.Checkout_ID}</td>
                                <td style={tableCellStyle}>{c.Item_Code} ({c.Type_Name})</td>
                                <td style={tableCellStyle}>{c.Staff_Name}</td>
                                <td style={tableCellStyle}>{new Date(c.Checkout_time).toLocaleString()}</td>
                                <td style={{...tableCellStyle, color: c.Checkin_time ? 'var(--color-success)' : 'var(--color-danger)'}}>
                                    {c.Checkin_time ? new Date(c.Checkin_time).toLocaleString() : 'PENDING'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EquipmentManager;