// client/src/components/financials/TransactionForm.jsx
import React, { useState, useEffect } from 'react';
import { createTransaction, fetchParticipants, fetchEventLookupData } from '../../services/api';

function TransactionForm({ onCreation }) {
    const [formData, setFormData] = useState({ 
        participantId: '', eventId: '', amount: '', transactionDate: new Date().toISOString().slice(0, 10), 
        paymentStatus: 'Paid', type: 'Fine' 
    });
    const [lookup, setLookup] = useState({ participants: [], events: [] });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const loadLookup = async () => {
            try {
                const [participantsData, eventData] = await Promise.all([
                    fetchParticipants(),
                    fetchEventLookupData()
                ]);
                
                setLookup({ participants: participantsData, events: eventData.events });
                
                // Set defaults
                setFormData(prev => ({
                    ...prev,
                    participantId: participantsData[0]?.Participant_ID || '',
                    eventId: eventData.events[0]?.Event_ID || ''
                }));
            } catch (err) {
                setError('Failed to load required lookup data.');
            }
        };
        loadLookup();
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setMessage(''); setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); setError('');

        const dataToSend = {
            ...formData,
            participantId: parseInt(formData.participantId),
            eventId: parseInt(formData.eventId),
            amount: parseFloat(formData.amount),
        };
        
        try {
            const result = await createTransaction(dataToSend);
            setMessage(result.message);
            onCreation();
            setFormData(prev => ({ ...prev, amount: '', paymentStatus: 'Paid' })); // Reset mutable fields
        } catch (err) {
            setError(err.message || 'Transaction recording failed.');
        }
    };

    return (
        <div style={{ padding: '15px', border: '1px solid var(--color-success)', borderRadius: '6px', backgroundColor: '#e9f7ef', marginBottom: '20px' }}>
            <h4 style={{ color: 'var(--color-dark)', marginTop: 0, borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>Record New Transaction</h4>
            {message && <p style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>{message}</p>}
            {error && <p style={{ color: 'var(--color-danger)', fontWeight: 'bold' }}>{error}</p>}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontWeight: 'bold', fontSize: '0.9em' }}>Participant:</label>
                <select name="participantId" value={formData.participantId} onChange={handleChange} required>
                    {lookup.participants.map(p => (
                        <option key={p.Participant_ID} value={p.Participant_ID}>{p.Name} ({p.Institute})</option>
                    ))}
                </select>

                <label style={{ fontWeight: 'bold', fontSize: '0.9em' }}>Associated Event:</label>
                <select name="eventId" value={formData.eventId} onChange={handleChange} required>
                    {lookup.events.map(e => (
                        <option key={e.Event_ID} value={e.Event_ID}>{e.Event_Name} ({e.Event_ID})</option>
                    ))}
                </select>
                
                <label style={{ fontWeight: 'bold', fontSize: '0.9em' }}>Transaction Type:</label>
                <select name="type" value={formData.type} onChange={handleChange} required>
                    <option value="Fine">Fine</option>
                    <option value="Sponsorship">Sponsorship</option>
                    <option value="Registration">Registration</option>
                </select>

                <input name="amount" type="number" placeholder="Amount (e.g., 150.00)" value={formData.amount} onChange={handleChange} required min="0.01" step="0.01"/>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                    <select name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} required style={{ flex: 1 }}>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Refunded">Refunded</option>
                    </select>
                    <input name="transactionDate" type="date" value={formData.transactionDate} onChange={handleChange} required style={{ flex: 1 }}/>
                </div>

                <button type="submit" style={{ marginTop: '10px', backgroundColor: 'var(--color-success)' }}>Record Transaction</button>
            </form>
        </div>
    );
}

// Transaction List (Modified to include the form)
function FinancialTracker({ refreshKey, onUpdate }) {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const loadTransactions = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchTransactions();
            setTransactions(data);
        } catch (err) {
            setError('Could not fetch financial transactions.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadTransactions();
    }, [loadTransactions, refreshKey]);

    const tableHeaderStyle = { padding: '12px 10px', textAlign: 'left', borderRight: '1px solid rgba(255,255,255,0.2)', fontWeight: '600' };
    const tableCellStyle = { padding: '10px', borderRight: '1px solid #ddd' };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Paid': return 'var(--color-success)';
            case 'Pending': return 'var(--color-warning)';
            case 'Refunded': return 'var(--color-primary)';
            default: return 'var(--color-secondary)';
        }
    }

    if (loading) return <p>Loading Financial Transactions...</p>;
    if (error) return <p style={{ color: 'var(--color-danger)', fontWeight: 'bold' }}>Error: {error}</p>;

    return (
        <div>
            <h3 style={{ color: 'var(--color-primary-dark)', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                All Financial Transactions ({transactions.length})
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
                {!showForm && (
                    <button onClick={() => setShowForm(true)} style={{ backgroundColor: 'var(--color-success)' }}>+ Record New Transaction</button>
                )}
                {showForm && <TransactionForm onCreation={onUpdate} onToggle={() => setShowForm(false)} />}
            </div>

            <div style={{ maxHeight: '500px', overflowY: 'auto', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '6px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-white)', position: 'sticky', top: 0 }}>
                            <th style={tableHeaderStyle}>ID</th>
                            <th style={tableHeaderStyle}>Date</th>
                            <th style={tableHeaderStyle}>Participant</th>
                            <th style={tableHeaderStyle}>Type / Event</th>
                            <th style={tableHeaderStyle}>Amount</th>
                            <th style={tableHeaderStyle}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((t, index) => (
                            <tr key={t.Transaction_ID} style={{ borderBottom: '1px solid #e0e0e0', backgroundColor: index % 2 === 0 ? 'var(--color-white)' : '#f5f5f5' }}>
                                <td style={tableCellStyle}>{t.Transaction_ID}</td>
                                <td style={tableCellStyle}>{new Date(t.Transaction_Date).toLocaleDateString()}</td>
                                <td style={tableCellStyle}>{t.Participant_Name} ({t.Participant_ID})</td>
                                <td style={tableCellStyle}>{t.Type} / {t.Event_Name}</td>
                                <td style={tableCellStyle}>₹{t.Amount.toFixed(2)}</td>
                                <td style={{...tableCellStyle, color: getStatusColor(t.Payment_Status), fontWeight: 'bold'}}>
                                    {t.Payment_Status.toUpperCase()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FinancialTracker;