// client/src/components/ParticipantForm.jsx (UPDATED with Conditional Filtering)
import React, { useState, useEffect } from 'react';
import { createParticipant, fetchParticipantLookupData } from '../services/api';

function ParticipantForm({ onSave }) {
    const [formData, setFormData] = useState({ 
        name: '', dob: '', gender: 'M', email: '', 
        hostelId: '', instituteId: '', messId: '' 
    });
    const [lookupData, setLookupData] = useState({ institutes: [], hostels: [], messes: [] });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Load initial data for dropdowns
        fetchParticipantLookupData().then(data => {
            setLookupData(data);
            
            const initialInstituteId = data.institutes[0]?.Institute_ID || '';
            const initialHostelId = data.hostels[0]?.Hostel_ID || '';
            
            const defaultHostel = data.hostels.find(h => h.Hostel_ID === initialHostelId);
            const defaultHostInstituteId = defaultHostel ? defaultHostel.Institute_ID : null;

            const initialFilteredMesses = data.messes.filter(m => m.Institute_ID === defaultHostInstituteId);
            const initialMessId = initialFilteredMesses[0]?.Mess_ID || '';

            setFormData(prev => ({
                ...prev,
                instituteId: initialInstituteId,
                hostelId: initialHostelId,
                messId: initialMessId
            }));
        }).catch(() => setError('Failed to load dependency data.'));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const currentHostelId = formData.hostelId;
    const selectedHostel = lookupData.hostels.find(h => h.Hostel_ID === parseInt(currentHostelId));
    const hostingInstituteId = selectedHostel ? selectedHostel.Institute_ID : null;
    const filteredMesses = lookupData.messes.filter(m => m.Institute_ID === hostingInstituteId);

    const handleHostelChange = (e) => {
        const newHostelId = e.target.value;
        const newSelectedHostel = lookupData.hostels.find(h => h.Hostel_ID === parseInt(newHostelId));
        const newHostingInstituteId = newSelectedHostel ? newSelectedHostel.Institute_ID : null;

        const newFilteredMesses = lookupData.messes.filter(m => m.Institute_ID === newHostingInstituteId);
        const newMessId = newFilteredMesses[0]?.Mess_ID || '';

        setFormData(prev => ({ 
            ...prev, 
            hostelId: newHostelId, 
            messId: newMessId
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!formData.messId) {
             return setError('No valid Mess available for the selected Hostel/Institute.');
        }
        
        try {
            const dataToSend = {
                ...formData,
                instituteId: parseInt(formData.instituteId),
                hostelId: parseInt(formData.hostelId),
                messId: parseInt(formData.messId)
            };

            const result = await createParticipant(dataToSend);
            setMessage(result.message);
            onSave();
        } catch (err) {
            setError(err.message || 'An unknown error occurred.');
        }
    };

    return (
        <div style={{ 
            padding: '20px', 
            backgroundColor: 'var(--color-white)', 
            borderRadius: '8px', 
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
        }}>
            <h3 style={{ color: 'var(--color-primary-dark)', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>👤 Register Athlete</h3>
            {message && <p style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>{message}</p>}
            {error && <p style={{ color: 'var(--color-danger)', fontWeight: 'bold' }}>{error}</p>}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {/* Athlete Details */}
                <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email (Unique)" value={formData.email} onChange={handleChange} required />
                <label style={{ fontSize: '0.8em', color: 'var(--color-secondary)', marginTop: '-10px' }}>Date of Birth</label>
                <input name="dob" type="date" value={formData.dob} onChange={handleChange} required style={{ marginTop: '-10px' }}/>
                
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                </select>

                {/* Home Institute */}
                <label style={{ fontWeight: 'bold', marginTop: '10px', color: 'var(--color-dark)' }}>Home Institute:</label>
                <select name="instituteId" value={formData.instituteId} onChange={handleChange} required>
                    {lookupData.institutes.map(inst => (
                        <option key={inst.Institute_ID} value={inst.Institute_ID}>{inst.Short_Name} - {inst.Name}</option>
                    ))}
                </select>
                
                {/* Accommodation - HOSTEL */}
                <label style={{ fontWeight: 'bold', marginTop: '10px', color: 'var(--color-dark)' }}>Assigned Hostel (Hosting Inst):</label>
                <select name="hostelId" value={formData.hostelId} onChange={handleHostelChange} required>
                    {lookupData.hostels.map(hostel => (
                        <option key={hostel.Hostel_ID} value={hostel.Hostel_ID}>
                            {hostel.Hostel_Name} (Inst: {hostel.Institute_ID})
                        </option>
                    ))}
                </select>

                {/* Accommodation - MESS (Filtered) */}
                <label style={{ fontWeight: 'bold', color: 'var(--color-dark)' }}>Assigned Mess (Filtered):</label>
                <select name="messId" value={formData.messId} onChange={handleChange} required disabled={filteredMesses.length === 0}>
                    {filteredMesses.length > 0 ? (
                        filteredMesses.map(mess => (
                            <option key={mess.Mess_ID} value={mess.Mess_ID}>
                                {mess.Mess_Name} (Inst: {mess.Institute_ID})
                            </option>
                        ))
                    ) : (
                        <option value="">-- No Messes for this Hostel's Institute --</option>
                    )}
                </select>

                <button type="submit" style={{ marginTop: '20px' }} disabled={filteredMesses.length === 0}>
                    Submit Registration
                </button>
            </form>
        </div>
    );
}

export default ParticipantForm;