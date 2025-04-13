import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronUp, FaChevronDown, FaEdit, FaTimes } from 'react-icons/fa';
import "./PlayerViewPage.css";

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
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [editedProfile, setEditedProfile] = useState(null);

    const [newNote, setNewNote] = useState('');
    const [newBattle, setNewBattle] = useState('');
    const [newDiscovery, setNewDiscovery] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        if (campaignId && profileId) {
            fetchPlayerData();
        } else {
            setError("Campaign ID or Profile ID is missing");
            setLoading(false);
        }
    }, [campaignId, profileId]);


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

        // Save changes to the backend
        await saveGameLog(updatedGameLog);
    };

    const saveGameLog = async (updatedGameLog) => {
        try {
            const response = await fetch(`http://localhost:5001/campaigns/${campaignId}/profiles/${profileId}/gamelog`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedGameLog),
            });
            if (!response.ok) throw new Error("Failed to save game log");
        } catch (error) {
            console.error('Error saving game log:', error);
        }
    };


    const handleBackToCampaigns = () => {
        navigate('/');
    };

    return (
        <div className="player-view">

            {/* New section to display character information */}
            {profile && (
                <div className="profile-section">
                    <h2>Character Details</h2>
                    <div className="modify-stats-container">
                        <button
                            onClick={() => {
                                setIsEditingProfile(!isEditingProfile);
                                if (!isEditingProfile) setEditedProfile({ ...profile });
                            }}
                            className="modify-stats-button"
                        >
                            {isEditingProfile ? <FaTimes /> : <FaEdit />} {isEditingProfile ? "Exit Edit Mode" : "Modify Stats"}
                        </button>
                    </div>

                    <div className='Profile-Info-Grid'>
                        <div className='profile-field'>
                            <strong>Name:</strong> {isEditingProfile ? (
                                <input type="text" value={editedProfile.name} onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })} />
                            ) : profile.name}
                        </div>

                        <div className='profile-field'>
                            <strong>Class:</strong> {isEditingProfile ? (
                                <input type="text" value={editedProfile.class} onChange={(e) => setEditedProfile({ ...editedProfile, class: e.target.value })} />
                            ) : profile.class}
                        </div>

                        <div className='profile-field'>
                            <strong>Race:</strong> {isEditingProfile ? (
                                <input type="text" value={editedProfile.race} onChange={(e) => setEditedProfile({ ...editedProfile, race: e.target.value })} />
                            ) : profile.race}
                        </div>

                        <div className='profile-field'>
                            <strong>Level:</strong> {isEditingProfile ? (
                                <input type="number" value={editedProfile.level} onChange={(e) => setEditedProfile({ ...editedProfile, level: parseInt(e.target.value) || 0 })} />
                            ) : profile.level}
                        </div>
                    </div>

                    <h3>Attributes</h3>
                    <div className="attribute-grid">
                        {["STR", "DEX", "CON", "INT", "WIS", "CHA"].map(attr => (
                            <div key={attr} className="attribute-item">
                                <label><strong>{attr}:</strong></label>
                                {isEditingProfile ? (
                                    <input
                                        type="number"
                                        value={editedProfile[attr]}
                                        onChange={(e) => setEditedProfile({ ...editedProfile, [attr]: parseInt(e.target.value) || 0 })}
                                    />
                                ) : (
                                    <span>{profile[attr]}</span>
                                )}
                            </div>
                        ))}
                    </div>


                    <h3>Combat Stats</h3>
                    <div className="combat-stats">
                        <p><strong>AC:</strong> {isEditingProfile ? (
                            <input type="number" value={editedProfile.ac} onChange={(e) => setEditedProfile({ ...editedProfile, ac: parseInt(e.target.value) || 0 })} />
                        ) : profile.ac}</p>

                        <p><strong>Init Mod:</strong> {isEditingProfile ? (
                            <input type="number" value={editedProfile.initiative_modifier} onChange={(e) => setEditedProfile({ ...editedProfile, initiative_modifier: parseInt(e.target.value) || 0 })} />
                        ) : profile.initiative_modifier}</p>

                        <p><strong>HP:</strong> {isEditingProfile ? (
                            <>
                                <input type="number" value={editedProfile.current_hp} onChange={(e) => setEditedProfile({ ...editedProfile, current_hp: parseInt(e.target.value) || 0 })} /> /
                                <input type="number" value={editedProfile.max_hp} onChange={(e) => setEditedProfile({ ...editedProfile, max_hp: parseInt(e.target.value) || 0 })} />
                            </>
                        ) : `${profile.current_hp}/${profile.max_hp}`}</p>
                    </div>

                    <div className="extended-stats">
                        <h3>Modifiers</h3>
                        <div className="attributes-modifiers">
                            {["STR_Mod", "DEX_Mod", "CON_Mod", "INT_Mod", "WIS_Mod", "CHA_Mod"].map(attr => (
                                <div key={attr} className="modifier-item">
                                    <label><strong>{attr.replace('_', '').replace('Mod', '')} Mod:</strong></label>
                                    <span>{profile[attr]}</span>
                                </div>
                            ))}
                        </div>

                        <h3>HP & Dice</h3>
                        <p><strong>Temp HP:</strong> {profile.temporary_hp}</p>
                        <p><strong>Hit Dice:</strong> {profile.hit_dice}</p>

                        <h3>Skills</h3>
                        <ul>
                            {profile.skills && Object.entries(profile.skills).length > 0 ? (
                                Object.entries(profile.skills).map(([skill, value]) => (
                                    <li key={skill}><strong>{skill}:</strong> {value}</li>
                                ))
                            ) : <li>No skills listed.</li>}
                        </ul>

                        <h3>Proficiencies</h3>
                        <ul>
                            {profile.proficiencies && Object.entries(profile.proficiencies).length > 0 ? (
                                Object.entries(profile.proficiencies).map(([prof, value]) => (
                                    <li key={prof}><strong>{prof}:</strong> {value.toString()}</li>
                                ))
                            ) : <li>No proficiencies listed.</li>}
                        </ul>

                        <h3>Languages</h3>
                        <ul>
                            {profile.languages && profile.languages.length > 0 ? (
                                profile.languages.map((lang, idx) => <li key={idx}>{lang}</li>)
                            ) : <li>No languages listed.</li>}
                        </ul>

                        <h3>Equipment</h3>
                        <ul>
                            {profile.equipment && Object.entries(profile.equipment).length > 0 ? (
                                Object.entries(profile.equipment).map(([item, value]) => (
                                    <li key={item}><strong>{item}:</strong> {value.toString()}</li>
                                ))
                            ) : <li>No equipment listed.</li>}
                        </ul>

                        <h3>Weapons</h3>
                        <ul>
                            {profile.weapons && Object.entries(profile.weapons).length > 0 ? (
                                Object.entries(profile.weapons).map(([weapon, value]) => (
                                    <li key={weapon}><strong>{weapon}:</strong> {value.toString()}</li>
                                ))
                            ) : <li>No weapons listed.</li>}
                        </ul>

                        <h3>Armor</h3>
                        <p>{profile.armor || "No armor listed."}</p>

                        <h3>Adventuring Gear</h3>
                        <ul>
                            {profile.adventuring_gear && Object.entries(profile.adventuring_gear).length > 0 ? (
                                Object.entries(profile.adventuring_gear).map(([item, value]) => (
                                    <li key={item}><strong>{item}:</strong> {value.toString()}</li>
                                ))
                            ) : <li>No adventuring gear listed.</li>}
                        </ul>

                        <h3>Magic Items</h3>
                        <ul>
                            {profile.magic_items && Object.entries(profile.magic_items).length > 0 ? (
                                Object.entries(profile.magic_items).map(([item, value]) => (
                                    <li key={item}><strong>{item}:</strong> {value.toString()}</li>
                                ))
                            ) : <li>No magic items listed.</li>}
                        </ul>

                        <h3>Money</h3>
                        <ul>
                            {profile.money && Object.entries(profile.money).length > 0 ? (
                                Object.entries(profile.money).map(([currency, amount]) => (
                                    <li key={currency}><strong>{currency}:</strong> {amount}</li>
                                ))
                            ) : <li>No money listed.</li>}
                        </ul>

                        <h3>Spellcasting</h3>
                        <pre style={{ whiteSpace: "pre-wrap", background: "#f5f5f5", padding: "1em", borderRadius: "6px" }}>
                            {JSON.stringify(profile.spellcasting, null, 2)}
                        </pre>

                        <h3>Attack Rolls</h3>
                        <pre style={{ whiteSpace: "pre-wrap", background: "#f5f5f5", padding: "1em", borderRadius: "6px" }}>
                            {JSON.stringify(profile.attack_rolls, null, 2)}
                        </pre>

                    </div>

                    <button onClick={async () => {
                        if (isEditingProfile) {
                            try {
                                await fetch(`http://localhost:5001/campaigns/${campaignId}/profiles/${profileId}/update`, {
                                    method: 'PATCH',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(editedProfile),
                                });
                                setProfile(editedProfile);
                            } catch (error) {
                                console.error("Error updating profile:", error);
                            }
                        }
                        setIsEditingProfile(false);
                    }} className="save-profile-button">
                        {isEditingProfile ? "Save Changes" : ""}
                    </button>
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
                                            placeholder={`Enter ${section === 'discoveries' ? 'discovery' : section.slice(0, -1)}`}
                                        />
                                        <button
                                            onClick={() => handleAddItem(section, section === 'notes' ? newNote : section === 'battles' ? newBattle : newDiscovery)}
                                            disabled={!newNote.trim() && !newBattle.trim() && !newDiscovery.trim()}
                                        >
                                            Add {section === 'notes' ? 'Note' : section === 'battles' ? 'Battle' : 'Discovery'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                ))}
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
                <button onClick={handleBackToCampaigns} className="campaigns-button">
                    Back to Campaigns
                </button>
            </div>

        </div>
    );
};

export default PlayerViewPage;
