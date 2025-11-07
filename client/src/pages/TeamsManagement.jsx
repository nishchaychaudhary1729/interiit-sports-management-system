// client/src/pages/TeamsManagement.jsx
import React, { useState, useEffect } from 'react';
import {
    fetchInstitutes,
    fetchTeamEvents,
    fetchParticipantsByInstitute,
    fetchTeams,
    fetchTeamDetails,
    checkTeamExists,
    createTeam,
    updateTeamMembers,
    updateTeamStatus
} from '../services/api.jsx';

const TeamsManagement = () => {
    const [activeTab, setActiveTab] = useState('register');
    
    const [institutes, setInstitutes] = useState([]);
    const [events, setEvents] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [formData, setFormData] = useState({
        instituteId: '',
        eventId: '',
        teamName: '',
        captainId: '',
        memberIds: []
    });
    const [formMessage, setFormMessage] = useState('');
    const [formError, setFormError] = useState('');
    
    const [existingTeam, setExistingTeam] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    
    const [teams, setTeams] = useState([]);
    const [filters, setFilters] = useState({
        instituteId: '',
        eventId: ''
    });
    const [loading, setLoading] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [teamMembers, setTeamMembers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            const [institutesData, eventsData] = await Promise.all([
                fetchInstitutes(),
                fetchTeamEvents()
            ]);
            setInstitutes(institutesData);
            setEvents(eventsData);
            
            // Start with empty selections
            setFormData(prev => ({ 
                ...prev, 
                instituteId: '',
                eventId: ''
            }));
            setFilters(prev => ({ 
                ...prev, 
                instituteId: '',
                eventId: ''
            }));
        } catch (error) {
            console.error('Error loading initial data:', error);
        }
    };

    // Reset form to initial state
    const resetForm = () => {
        setFormData({
            instituteId: '',
            eventId: '',
            teamName: '',
            captainId: '',
            memberIds: []
        });
        setParticipants([]);
        setExistingTeam(null);
        setIsEditMode(false);
        setFormError('');
    };

    const checkExistingTeam = async (instituteId, eventId) => {
        try {
            const result = await checkTeamExists(instituteId, eventId);
            if (result.exists) {
                setExistingTeam(result.team);
                setIsEditMode(false);
                
                const details = await fetchTeamDetails(result.team.id);
                setFormData(prev => ({
                    ...prev,
                    teamName: details.team.teamName,
                    captainId: details.members.find(m => m.role === 'Captain')?.id || '',
                    memberIds: details.members.map(m => m.id)
                }));
            } else {
                setExistingTeam(null);
                setIsEditMode(false);
                setFormData(prev => ({
                    ...prev,
                    teamName: '',
                    captainId: participants[0]?.id || '',
                    memberIds: []
                }));
            }
        } catch (error) {
            console.error('Error checking existing team:', error);
            setExistingTeam(null);
        }
    };

    const loadParticipants = async (instituteId, eventGender) => {
        try {
            if (!instituteId) return;
            
            const gender = eventGender || 'Mixed';
            const data = await fetchParticipantsByInstitute(instituteId, gender);
            setParticipants(data);
            
            if (data.length > 0 && !existingTeam) {
                setFormData(prev => ({ 
                    ...prev, 
                    captainId: data[0].id,
                    memberIds: []
                }));
            } else if (data.length === 0) {
                setFormData(prev => ({ 
                    ...prev, 
                    captainId: '',
                    memberIds: []
                }));
            }
        } catch (error) {
            console.error('Error loading participants:', error);
            setParticipants([]);
        }
    };

    const loadTeams = async () => {
        try {
            setLoading(true);
            const teamsData = await fetchTeams(filters);
            setTeams(teamsData);
        } catch (error) {
            console.error('Error loading teams:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'view') {
            loadTeams();
        }
    }, [activeTab, filters]);

    const handleInstituteChange = async (e) => {
        const instituteId = e.target.value;
        
        if (!instituteId) {
            setFormData(prev => ({ ...prev, instituteId: '', memberIds: [], captainId: '' }));
            setParticipants([]);
            setExistingTeam(null);
            return;
        }
        
        const selectedEvent = events.find(ev => ev.id === parseInt(formData.eventId));
        const eventGender = selectedEvent ? selectedEvent.gender : 'Mixed';
        
        setFormData(prev => ({ ...prev, instituteId, memberIds: [], captainId: '' }));
        
        if (formData.eventId) {
            loadParticipants(instituteId, eventGender);
            await checkExistingTeam(instituteId, formData.eventId);
        }
    };

    const handleEventChange = async (e) => {
        const eventId = e.target.value;
        
        if (!eventId) {
            setFormData(prev => ({ ...prev, eventId: '', memberIds: [], captainId: '' }));
            setParticipants([]);
            setExistingTeam(null);
            return;
        }
        
        const selectedEvent = events.find(ev => ev.id === parseInt(eventId));
        const eventGender = selectedEvent ? selectedEvent.gender : 'Mixed';
        
        setFormData(prev => ({ 
            ...prev, 
            eventId: parseInt(eventId),
            memberIds: [],
            captainId: ''
        }));
        
        if (formData.instituteId) {
            loadParticipants(formData.instituteId, eventGender);
            await checkExistingTeam(formData.instituteId, parseInt(eventId));
        }
    };

    const handleMemberToggle = (participantId) => {
        setFormData(prev => {
            const newMemberIds = prev.memberIds.includes(participantId)
                ? prev.memberIds.filter(id => id !== participantId)
                : [...prev.memberIds, participantId];
            return { ...prev, memberIds: newMemberIds };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormMessage('');
        setFormError('');

        if (!existingTeam && !formData.teamName.trim()) {
            setFormError('Team name is required');
            return;
        }

        if (formData.memberIds.length === 0) {
            setFormError('Please select at least one team member');
            return;
        }

        if (!formData.captainId) {
            setFormError('Please select a captain');
            return;
        }

        try {
            if (existingTeam) {
                await updateTeamMembers(existingTeam.id, {
                    captainId: formData.captainId,
                    memberIds: formData.memberIds
                });
                setFormMessage('✅ Team updated successfully!');
                setFormError('');
                
                setTimeout(() => {
                    setFormMessage('');
                    resetForm();
                }, 2000);
            } else {
                await createTeam(formData);
                setFormMessage('✅ Team registered successfully!');
                setFormError('');
                
                setTimeout(() => {
                    setFormMessage('');
                    resetForm();
                }, 2000);
            }
        } catch (error) {
            setFormError(error.error || 'Failed to save team');
            setFormMessage('');
        }
    };

    const toggleTeamStatus = async (teamId, currentStatus) => {
        try {
            await updateTeamStatus(teamId, !currentStatus);
            loadTeams();
        } catch (error) {
            console.error('Error toggling team status:', error);
        }
    };

    const viewTeamDetails = async (team) => {
        try {
            const details = await fetchTeamDetails(team.id);
            setSelectedTeam(details.team);
            setTeamMembers(details.members);
            setShowModal(true);
        } catch (error) {
            console.error('Error loading team details:', error);
        }
    };

    const handleEditMode = () => {
        setIsEditMode(true);
        setFormMessage('');
        setFormError('');
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
        setFormMessage('');
        setFormError('');
        resetForm();
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>🏆 Teams Management</h1>

            <div style={styles.tabContainer}>
                <button
                    style={activeTab === 'register' ? styles.tabActive : styles.tab}
                    onClick={() => setActiveTab('register')}
                >
                    📝 Register Team
                </button>
                <button
                    style={activeTab === 'view' ? styles.tabActive : styles.tab}
                    onClick={() => setActiveTab('view')}
                >
                    👥 View Teams
                </button>
            </div>

            {activeTab === 'register' && (
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>
                        {existingTeam && !isEditMode ? 'Existing Team Found' : existingTeam ? 'Edit Team' : 'Register New Team'}
                    </h2>
                    
                    {existingTeam && !isEditMode && (
                        <div style={styles.existingTeamBox}>
                            <div style={styles.existingTeamHeader}>
                                <h3 style={styles.existingTeamTitle}>📌 {existingTeam.teamName}</h3>
                                <button 
                                    style={styles.editButton}
                                    onClick={handleEditMode}
                                >
                                    ✏️ Edit Team
                                </button>
                            </div>
                            <p style={styles.existingTeamText}>
                                A team already exists for this institute and event. Click "Edit Team" to modify the team members or captain.
                            </p>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Institute</label>
                            <select
                                value={formData.instituteId}
                                onChange={handleInstituteChange}
                                style={styles.select}
                                disabled={existingTeam && !isEditMode}
                                required
                            >
                                <option value="">Select Institute</option>
                                {institutes.map(inst => (
                                    <option key={inst.id} value={inst.id}>
                                        {inst.name} ({inst.shortName})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Sport / Event</label>
                            <select
                                value={formData.eventId}
                                onChange={handleEventChange}
                                style={styles.select}
                                disabled={existingTeam && !isEditMode}
                                required
                            >
                                <option value="">Select Event</option>
                                {events.map(event => (
                                    <option key={event.id} value={event.id}>
                                        {event.sportName} - {event.name} ({event.gender})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {(!existingTeam || isEditMode) && (
                            <>
                                {!existingTeam && (
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Team Name</label>
                                        <input
                                            type="text"
                                            value={formData.teamName}
                                            onChange={(e) => setFormData(prev => ({ ...prev, teamName: e.target.value }))}
                                            style={styles.input}
                                            placeholder="Enter team name"
                                            required
                                        />
                                    </div>
                                )}

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Team Captain</label>
                                    <select
                                        value={formData.captainId}
                                        onChange={(e) => {
                                            const captainId = parseInt(e.target.value);
                                            setFormData(prev => ({
                                                ...prev,
                                                captainId,
                                                memberIds: prev.memberIds.includes(captainId) 
                                                    ? prev.memberIds 
                                                    : [...prev.memberIds, captainId]
                                            }));
                                        }}
                                        style={styles.select}
                                        required
                                    >
                                        <option value="">Select Captain</option>
                                        {participants.map(p => (
                                            <option key={p.id} value={p.id}>
                                                {p.name} ({p.gender})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Select Team Members (click to add/remove)</label>
                                    {participants.length === 0 ? (
                                        <div style={styles.noParticipants}>
                                            No participants available for this combination. Please check Institute and Event selection.
                                        </div>
                                    ) : (
                                        <>
                                            <div style={styles.membersGrid}>
                                                {participants.map(participant => (
                                                    <div
                                                        key={participant.id}
                                                        onClick={() => handleMemberToggle(participant.id)}
                                                        style={{
                                                            ...styles.memberCard,
                                                            ...(formData.memberIds.includes(participant.id) ? styles.memberCardSelected : {})
                                                        }}
                                                    >
                                                        <div style={styles.avatar}>
                                                            {getInitials(participant.name)}
                                                        </div>
                                                        <div style={styles.memberInfo}>
                                                            <div style={styles.memberName}>{participant.name}</div>
                                                            <div style={styles.memberGender}>{participant.gender}</div>
                                                        </div>
                                                        {formData.captainId === participant.id && (
                                                            <div style={styles.captainBadge}>★ Captain</div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            <div style={styles.selectedCount}>
                                                Selected: {formData.memberIds.length} members
                                            </div>
                                        </>
                                    )}
                                </div>

                                {formMessage && <div style={styles.successMessage}>{formMessage}</div>}
                                {formError && <div style={styles.errorMessage}>{formError}</div>}

                                <div style={styles.buttonGroup}>
                                    <button type="submit" style={styles.submitButton}>
                                        {existingTeam ? 'Update Team' : 'Create Team'}
                                    </button>
                                    {existingTeam && isEditMode && (
                                        <button 
                                            type="button" 
                                            style={styles.cancelButton}
                                            onClick={handleCancelEdit}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </form>
                </div>
            )}

            {activeTab === 'view' && (
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>All Teams</h2>

                    <div style={styles.filtersContainer}>
                        <div style={styles.filterGroup}>
                            <label style={styles.label}>Filter by Institute:</label>
                            <select
                                value={filters.instituteId}
                                onChange={(e) => setFilters(prev => ({ ...prev, instituteId: e.target.value }))}
                                style={styles.select}
                            >
                                <option value="">All Institutes</option>
                                {institutes.map(inst => (
                                    <option key={inst.id} value={inst.id}>
                                        {inst.shortName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={styles.filterGroup}>
                            <label style={styles.label}>Filter by Sport/Event:</label>
                            <select
                                value={filters.eventId}
                                onChange={(e) => setFilters(prev => ({ ...prev, eventId: e.target.value }))}
                                style={styles.select}
                            >
                                <option value="">All Sports</option>
                                {events.map(event => (
                                    <option key={event.id} value={event.id}>
                                        {event.sportName} - {event.name} ({event.gender})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div style={styles.loading}>Loading teams...</div>
                    ) : teams.length === 0 ? (
                        <div style={styles.noTeams}>No teams found. Create a new team to get started!</div>
                    ) : (
                        <div style={styles.teamsGrid}>
                            {teams.map(team => (
                                <div key={team.id} style={styles.teamCard}>
                                    <div style={styles.teamHeader}>
                                        <h3 
                                            style={{...styles.teamName, cursor: 'pointer'}}
                                            onClick={() => viewTeamDetails(team)}
                                        >
                                            {team.teamName} 👁️
                                        </h3>
                                        <span style={{
                                            ...styles.statusBadge,
                                            ...(team.isActive ? styles.statusActive : styles.statusInactive)
                                        }}>
                                            {team.isActive ? '✓ Active' : '✗ Inactive'}
                                        </span>
                                    </div>
                                    
                                    <div style={styles.teamInfo}>
                                        <div><strong>Institute:</strong> {team.instituteShortName}</div>
                                        <div><strong>Sport:</strong> {team.sportName}</div>
                                        <div><strong>Event:</strong> {team.eventName}</div>
                                        <div><strong>Members:</strong> {team.memberCount}</div>
                                        {team.captainName && (
                                            <div><strong>Captain:</strong> {team.captainName}</div>
                                        )}
                                        <div style={styles.creationDate}>
                                            Created: {new Date(team.creationDate).toLocaleDateString()}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => toggleTeamStatus(team.id, team.isActive)}
                                        style={{
                                            ...styles.actionButton,
                                            ...(team.isActive ? styles.deactivateButton : styles.activateButton)
                                        }}
                                    >
                                        {team.isActive ? 'Deactivate' : 'Activate'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {showModal && selectedTeam && (
                <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2 style={styles.modalTitle}>{selectedTeam.teamName}</h2>
                            <button style={styles.closeButton} onClick={() => setShowModal(false)}>✕</button>
                        </div>
                        
                        <div style={styles.modalBody}>
                            <div style={styles.teamDetailsSection}>
                                <div><strong>Institute:</strong> {selectedTeam.instituteName}</div>
                                <div><strong>Sport:</strong> {selectedTeam.sportName}</div>
                                <div><strong>Event:</strong> {selectedTeam.eventName}</div>
                            </div>

                            <h3 style={styles.membersTitle}>Team Members ({teamMembers.length})</h3>
                            
                            <div style={styles.membersList}>
                                {teamMembers.map(member => (
                                    <div key={member.id} style={styles.memberRow}>
                                        <div style={styles.memberAvatar}>
                                            {getInitials(member.name)}
                                        </div>
                                        <div style={styles.memberDetails}>
                                            <div style={styles.memberNameLarge}>{member.name}</div>
                                            <div style={styles.memberEmail}>{member.email}</div>
                                        </div>
                                        <div style={styles.memberRole}>
                                            {member.role === 'Captain' ? '👑 Captain' : 'Player'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '1400px',
        margin: '0 auto',
        fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    title: {
        color: 'var(--color-primary-dark, #1a365d)',
        marginBottom: '20px',
        fontSize: '28px'
    },
    tabContainer: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        borderBottom: '2px solid #e2e8f0'
    },
    tab: {
        padding: '12px 24px',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontSize: '16px',
        color: '#64748b',
        borderBottom: '3px solid transparent',
        transition: 'all 0.3s'
    },
    tabActive: {
        padding: '12px 24px',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontSize: '16px',
        color: '#1a365d',
        borderBottom: '3px solid #1a365d',
        fontWeight: 'bold'
    },
    section: {
        background: '#ffffff',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    sectionTitle: {
        color: '#1a365d',
        marginBottom: '20px',
        fontSize: '22px'
    },
    existingTeamBox: {
        background: '#eff6ff',
        border: '2px solid #3b82f6',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '20px'
    },
    existingTeamHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
    },
    existingTeamTitle: {
        margin: 0,
        color: '#1e40af',
        fontSize: '18px'
    },
    existingTeamText: {
        margin: 0,
        color: '#1e40af',
        fontSize: '14px'
    },
    editButton: {
        padding: '8px 16px',
        background: '#3b82f6',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    label: {
        fontWeight: '600',
        color: '#334155',
        fontSize: '14px'
    },
    select: {
        padding: '10px',
        border: '1px solid #cbd5e1',
        borderRadius: '6px',
        fontSize: '14px',
        background: '#ffffff'
    },
    input: {
        padding: '10px',
        border: '1px solid #cbd5e1',
        borderRadius: '6px',
        fontSize: '14px'
    },
    membersGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '12px',
        marginTop: '10px'
    },
    memberCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        border: '2px solid #e2e8f0',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        background: '#ffffff'
    },
    memberCardSelected: {
        borderColor: '#1a365d',
        background: '#f0f9ff'
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '14px',
        flexShrink: 0
    },
    memberInfo: {
        flex: 1
    },
    memberName: {
        fontWeight: '600',
        fontSize: '14px',
        color: '#1e293b'
    },
    memberGender: {
        fontSize: '12px',
        color: '#64748b'
    },
    captainBadge: {
        background: '#fbbf24',
        color: '#78350f',
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: 'bold'
    },
    selectedCount: {
        marginTop: '10px',
        padding: '8px',
        background: '#f0f9ff',
        border: '1px solid #bfdbfe',
        borderRadius: '6px',
        textAlign: 'center',
        fontWeight: '600',
        color: '#1e40af'
    },
    noParticipants: {
        padding: '20px',
        background: '#fef3c7',
        border: '1px solid #fbbf24',
        borderRadius: '6px',
        color: '#92400e',
        textAlign: 'center'
    },
    buttonGroup: {
        display: 'flex',
        gap: '12px'
    },
    submitButton: {
        flex: 1,
        padding: '14px 28px',
        background: '#1a365d',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    cancelButton: {
        flex: 1,
        padding: '14px 28px',
        background: '#e2e8f0',
        color: '#475569',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    successMessage: {
        padding: '12px',
        background: '#d1fae5',
        border: '1px solid #6ee7b7',
        borderRadius: '6px',
        color: '#065f46'
    },
    errorMessage: {
        padding: '12px',
        background: '#fee2e2',
        border: '1px solid #fca5a5',
        borderRadius: '6px',
        color: '#991b1b'
    },
    filtersContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
    },
    filterGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#64748b',
        fontSize: '16px'
    },
    noTeams: {
        textAlign: 'center',
        padding: '40px',
        color: '#64748b',
        fontSize: '16px',
        background: '#f8fafc',
        borderRadius: '8px'
    },
    teamsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
    },
    teamCard: {
        padding: '20px',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        background: '#ffffff',
        transition: 'all 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    },
    teamHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        marginBottom: '16px'
    },
    teamName: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#1e293b',
        margin: 0
    },
    statusBadge: {
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600'
    },
    statusActive: {
        background: '#d1fae5',
        color: '#065f46'
    },
    statusInactive: {
        background: '#fee2e2',
        color: '#991b1b'
    },
    teamInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        fontSize: '14px',
        color: '#475569',
        marginBottom: '16px'
    },
    creationDate: {
        fontSize: '12px',
        color: '#94a3b8',
        marginTop: '4px'
    },
    actionButton: {
        width: '100%',
        padding: '10px',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    deactivateButton: {
        background: '#fee2e2',
        color: '#991b1b'
    },
    activateButton: {
        background: '#d1fae5',
        color: '#065f46'
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    },
    modalContent: {
        background: '#ffffff',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflow: 'hidden',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #e2e8f0'
    },
    modalTitle: {
        margin: 0,
        fontSize: '24px',
        color: '#1a365d'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#64748b',
        padding: '0',
        width: '30px',
        height: '30px'
    },
    modalBody: {
        padding: '20px',
        overflowY: 'auto',
        maxHeight: 'calc(80vh - 80px)'
    },
    teamDetailsSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '24px',
        padding: '16px',
        background: '#f8fafc',
        borderRadius: '8px',
        fontSize: '14px'
    },
    membersTitle: {
        color: '#1a365d',
        marginBottom: '16px',
        fontSize: '18px'
    },
    membersList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    memberRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        transition: 'all 0.2s'
    },
    memberAvatar: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '18px',
        flexShrink: 0
    },
    memberDetails: {
        flex: 1
    },
    memberNameLarge: {
        fontWeight: '600',
        fontSize: '16px',
        color: '#1e293b',
        marginBottom: '4px'
    },
    memberEmail: {
        fontSize: '13px',
        color: '#64748b'
    },
    memberRole: {
        padding: '6px 12px',
        background: '#f0f9ff',
        color: '#1e40af',
        borderRadius: '12px',
        fontSize: '13px',
        fontWeight: '600'
    }
};

export default TeamsManagement;
