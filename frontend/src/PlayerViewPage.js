import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronUp, FaChevronDown, FaEdit, FaTimes } from 'react-icons/fa';

const PlayerViewPage = ({ campaignId: propCampaignId, profileId: propProfileId }) => {
    const navigate = useNavigate();

    // Use props if available, otherwise fallback to useParams
    const params = useParams();
    const campaignId = propCampaignId || params.campaignId;
    const profileId = propProfileId || params.profileId;

    const [profile, setProfile] = useState(null);
    const [gameLog, setGameLog] = useState({ discoveries: [], battles: [], notes: [] });
    const [expandedSections, setExpandedSections] = useState({ discoveries: false, battles: false, notes: false });
    const [isEditing, setIsEditing] = useState(false);

    const [newNote, setNewNote] = useState('');
    const [newBattle, setNewBattle] = useState('');
    const [newDiscovery, setNewDiscovery] = useState('');

    useEffect(() => {
        const fetchPlayerData = async () => {
            try {
                const profileResponse = await fetch(`http://localhost:5001/campaigns/${campaignId}/profiles/${profileId}`);
                if (!profileResponse.ok) throw new Error('Failed to fetch profile');
                const profileData = await profileResponse.json();

                setProfile(profileData);
                setGameLog({
                    discoveries: profileData.discoveries || [],
                    battles: profileData.battles || [],
                    notes: profileData.notes || [],
                });
            } catch (error) {
                console.error('Error fetching player profile or game log:', error);
            }
        };

        if (campaignId && profileId) {  // Ensure valid IDs before fetching
            fetchPlayerData();
        } else {
            console.error("Campaign ID or Profile ID is missing");
        }
    }, [campaignId, profileId]); // Update dependencies



    const toggleSection = (section) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const handleAddItem = async (section, newItem) => {
        if (!newItem.trim()) return;

        const updatedGameLog = {
            ...gameLog,
            [section]: [...gameLog[section], newItem],
        };

        setGameLog(updatedGameLog);
        await saveGameLog(updatedGameLog);

        if (section === 'notes') setNewNote('');
        else if (section === 'battles') setNewBattle('');
        else if (section === 'discoveries') setNewDiscovery('');
    };

    const handleDeleteItem = async (section, index) => {
        const updatedItems = gameLog[section].filter((_, i) => i !== index);
        const updatedGameLog = { ...gameLog, [section]: updatedItems };

        setGameLog(updatedGameLog);
        await saveGameLog(updatedGameLog);
    };

    const handleUpdateItem = async (section, index, updatedItem) => {
        const updatedItems = gameLog[section].map((item, i) => (i === index ? updatedItem : item));
        const updatedGameLog = { ...gameLog, [section]: updatedItems };

        setGameLog(updatedGameLog);
    };

    const saveGameLog = async (updatedGameLog) => {
        try {
            await fetch(`http://localhost:5001/campaigns/${campaignId}/profiles/${profileId}/gamelog`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedGameLog),
            });
        } catch (error) {
            console.error('Error saving game log:', error);
        }
    };


    const handleBackToCampaigns = () => {
        navigate('/');
    };

    return (
        <div className="player-view-container">
            <h1>{profile ? `Showing Player View for ${profile.player_name}` : 'Loading...'}'s Game Log</h1>

            {/* New section to display character information */}
            {profile && (
                <div className="player-info">
                    <p><strong>Class:</strong> {profile.class}</p>
                    <p><strong>Race:</strong> {profile.race}</p>
                    <p><strong>Level:</strong> {profile.level}</p>
                    <p><strong>Strength:</strong> {profile.strength}</p>
                    <p><strong>Dexterity:</strong> {profile.dexterity}</p>
                    <p><strong>Constitution:</strong> {profile.constitution}</p>
                    <p><strong>Intelligence:</strong> {profile.intelligence}</p>
                    <p><strong>Wisdom:</strong> {profile.wisdom}</p>
                    <p><strong>Charisma:</strong> {profile.charisma}</p>
                    <p><strong>Armor Class:</strong> {profile.ac}</p>
                    <p><strong>Initiative Modifier:</strong> {profile.initiative_modifier}</p>
                    <p><strong>HP:</strong> {profile.current_hp}/{profile.max_hp}</p>
                </div>
            )}
            <div className="game-log">
                <h2>Game Log</h2>
                {['discoveries', 'battles', 'notes'].map((section) => (
                    <div key={section} className="game-log-section">
                        <h3 onClick={() => toggleSection(section)} style={{ cursor: 'pointer' }}>
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                            {expandedSections[section] ? <FaChevronUp /> : <FaChevronDown />}
                        </h3>
                        {expandedSections[section] && (
                            <div>
                                <ul>
                                    {gameLog[section].map((item, index) => (
                                        <li key={index}>
                                            {isEditing ? (
                                                <div>
                                                    <textarea
                                                        value={item}
                                                        onChange={(e) => handleUpdateItem(section, index, e.target.value)}
                                                        rows="4"
                                                        cols="50"
                                                    />
                                                    <button onClick={() => handleDeleteItem(section, index)}>Delete</button>
                                                </div>
                                            ) : (
                                                <div>{item.split('\n').map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                {isEditing && (
                                    <div>
                                        <textarea
                                            value={section === 'notes' ? newNote : section === 'battles' ? newBattle : newDiscovery}
                                            onChange={(e) => {
                                                if (section === 'notes') setNewNote(e.target.value);
                                                else if (section === 'battles') setNewBattle(e.target.value);
                                                else setNewDiscovery(e.target.value);
                                            }}
                                            rows="4"
                                            cols="50"
                                            placeholder={`Enter ${section.slice(0, -1)}`}
                                        />
                                        <button onClick={() => handleAddItem(section, section === 'notes' ? newNote : section === 'battles' ? newBattle : newDiscovery)} disabled={!newNote.trim() && !newBattle.trim() && !newDiscovery.trim()}>
                                            Add {section.slice(0, -1)}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="buttons">
                {isEditing ? (
                    <button onClick={toggleEditMode} className="exit-edit-button">
                        <FaTimes /> Exit Edit Mode
                    </button>
                ) : (
                    <button onClick={toggleEditMode} className="edit-button">
                        <FaEdit /> Edit Game Log
                    </button>
                )}
            </div>
            <button onClick={handleBackToCampaigns} className="back-to-campaigns-button bottom-left">
                Back to Campaigns
            </button>
        </div>
    );
};

export default PlayerViewPage;
