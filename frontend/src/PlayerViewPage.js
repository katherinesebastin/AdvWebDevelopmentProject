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

    const [editingEntry, setEditingEntry] = useState({ section: null, index: null });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [newSkill, setNewSkill] = useState('');
    const [newProficiency, setNewProficiency] = useState('');
    const [newEquipment, setNewEquipment] = useState('');
    const [newMagicItem, setNewMagicItem] = useState('');
    const [newMoney, setNewMoney] = useState('');
    const [newSpellcasting, setNewSpellcasting] = useState('');
    const [newAttackRoll, setNewAttackRoll] = useState('');



    useEffect(() => {
        const fetchPlayerData = async () => {
            try {
                const profileResponse = await fetch(`http://localhost:5001/campaigns/${campaignId}/profiles/${profileId}`);
                if (!profileResponse.ok) throw new Error('Failed to fetch profile');
                const profileData = await profileResponse.json();

                // Make sure to initialize skills as an empty array if it's undefined
                setProfile(profileData);
                setEditedProfile({
                    ...profileData,
                });
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
        setEditingEntry({ section: null, index: null });
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
                        {["STR", "DEX", "CON", "INT", "WIS", "CHA"].map(attr => {
                            const fullAttr = {
                                STR: 'strength',
                                DEX: 'dexterity',
                                CON: 'constitution',
                                INT: 'intelligence',
                                WIS: 'wisdom',
                                CHA: 'charisma'
                            }[attr];

                            return (
                                <div key={attr} className="attribute-item">
                                    <label><strong>{attr}:</strong></label>
                                    {isEditingProfile ? (
                                        <input
                                            type="number"
                                            value={editedProfile[fullAttr]}
                                            onChange={(e) => setEditedProfile({
                                                ...editedProfile,
                                                [fullAttr]: parseInt(e.target.value) || 0
                                            })}
                                        />
                                    ) : (
                                        <span>{profile[fullAttr]}</span>
                                    )}
                                </div>
                            );
                        })}
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
                            {["STR", "DEX", "CON", "INT", "WIS", "CHA"].map(attr => {
                                const fullAttr = {
                                    STR: 'strength_modifier',
                                    DEX: 'dexterity_modifier',
                                    CON: 'constitution_modifier',
                                    INT: 'intelligence_modifier',
                                    WIS: 'wisdom_modifier',
                                    CHA: 'charisma_modifier'
                                }[attr];

                                return (
                                    <div key={attr} className="modifier-item">
                                        <label><strong>{attr} Mod:</strong></label>
                                        {isEditingProfile ? (
                                            <input
                                                type="number"
                                                value={editedProfile[fullAttr]}  // Use fullAttr to map correctly
                                                onChange={(e) => setEditedProfile({
                                                    ...editedProfile,
                                                    [fullAttr]: parseInt(e.target.value) || 0  // Save correctly on edit
                                                })}
                                            />
                                        ) : (
                                            <span>{profile[fullAttr]}</span>  // Display the correct modifier
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <h3>Skills</h3>
                        <ul>
                            {editedProfile.skills?.length > 0 ? (
                                editedProfile.skills.map((skill, index) => (
                                    <li key={index}>
                                        {isEditingProfile ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={skill}
                                                    onChange={(e) => {
                                                        const updated = [...editedProfile.skills];
                                                        updated[index] = e.target.value;
                                                        setEditedProfile({ ...editedProfile, skills: updated });
                                                    }}
                                                />
                                                <button onClick={() => {
                                                    const updated = [...editedProfile.skills];
                                                    updated.splice(index, 1);
                                                    setEditedProfile({ ...editedProfile, skills: updated });
                                                }}>🗑️</button>
                                            </>
                                        ) : (
                                            skill
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li>No skills listed.</li>
                            )}
                        </ul>

                        {/* Add the input field and button to allow adding new skills */}
                        {isEditingProfile && (
                            <div className="add-skill-container">
                                <input
                                    type="text"
                                    value={newSkill}  // Bind the value of the input to the `newSkill` state
                                    onChange={(e) => setNewSkill(e.target.value)}  // Update the state on input change
                                    placeholder="Enter new skill"
                                />
                                <button onClick={() => {
                                    if (newSkill.trim()) {
                                        // Add the new skill to the skills list
                                        setEditedProfile({
                                            ...editedProfile,
                                            skills: [...editedProfile.skills, newSkill.trim()],
                                        });
                                        setNewSkill(''); // Clear the input after adding the skill
                                    }
                                }}>
                                    Add Skill
                                </button>
                            </div>
                        )}

                        <h3>Proficiencies</h3>
                        <ul>
                            {editedProfile.proficiencies?.length > 0 ? (
                                editedProfile.proficiencies.map((prof, index) => (
                                    <li key={index}>
                                        {isEditingProfile ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editedProfile.proficiencies[index]}
                                                    onChange={(e) => {
                                                        const updated = [...editedProfile.proficiencies];
                                                        updated[index] = e.target.value;
                                                        setEditedProfile({ ...editedProfile, proficiencies: updated });
                                                    }}
                                                />
                                                <button onClick={() => {
                                                    const updated = [...editedProfile.proficiencies];
                                                    updated.splice(index, 1);
                                                    setEditedProfile({ ...editedProfile, proficiencies: updated });
                                                }}>🗑️</button>
                                            </>
                                        ) : (
                                            prof
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li>No proficiencies listed.</li>
                            )}
                        </ul>

                        {/* Add the input field and button to allow adding new proficiencies */}
                        {isEditingProfile && (
                            <div className="add-proficiency-container">
                                <input
                                    type="text"
                                    value={newProficiency}  // Bind the value of the input to the `newProficiency` state
                                    onChange={(e) => setNewProficiency(e.target.value)}  // Update the state on input change
                                    placeholder="Enter new proficiency"
                                />
                                <button onClick={() => {
                                    if (newProficiency.trim()) {
                                        // Add the new proficiency to the proficiencies list
                                        setEditedProfile({
                                            ...editedProfile,
                                            proficiencies: [...editedProfile.proficiencies, newProficiency.trim()],
                                        });
                                        setNewProficiency(''); // Clear the input after adding the proficiency
                                    }
                                }}>
                                    Add Proficiency
                                </button>
                            </div>
                        )}

                        <h3>Equipment</h3>
                        <ul>
                            {editedProfile.equipment?.length > 0 ? (
                                editedProfile.equipment.map((item, index) => (
                                    <li key={index}>
                                        {isEditingProfile ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editedProfile.equipment[index]}
                                                    onChange={(e) => {
                                                        const updated = [...editedProfile.equipment];
                                                        updated[index] = e.target.value;
                                                        setEditedProfile({ ...editedProfile, equipment: updated });
                                                    }}
                                                />
                                                <button onClick={() => {
                                                    const updated = [...editedProfile.equipment];
                                                    updated.splice(index, 1);
                                                    setEditedProfile({ ...editedProfile, equipment: updated });
                                                }}>🗑️</button>
                                            </>
                                        ) : (
                                            item
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li>No equipment listed.</li>
                            )}
                        </ul>

                        {/* Add the input field and button to allow adding new equipment */}
                        {isEditingProfile && (
                            <div className="add-equipment-container">
                                <input
                                    type="text"
                                    value={newEquipment}  // Bind the value of the input to the `newEquipment` state
                                    onChange={(e) => setNewEquipment(e.target.value)}  // Update the state on input change
                                    placeholder="Enter new equipment"
                                />
                                <button onClick={() => {
                                    if (newEquipment.trim()) {
                                        // Add the new equipment to the equipment list
                                        setEditedProfile({
                                            ...editedProfile,
                                            equipment: [...editedProfile.equipment, newEquipment.trim()],
                                        });
                                        setNewEquipment(''); // Clear the input after adding the equipment
                                    }
                                }}>
                                    Add Equipment
                                </button>
                            </div>
                        )}

                        <h3>Magic Items</h3>
                        <ul>
                            {editedProfile.magic_items?.length > 0 ? (
                                editedProfile.magic_items.map((item, index) => (
                                    <li key={index}>
                                        {isEditingProfile ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editedProfile.magic_items[index]}
                                                    onChange={(e) => {
                                                        const updated = [...editedProfile.magic_items];
                                                        updated[index] = e.target.value;
                                                        setEditedProfile({ ...editedProfile, magic_items: updated });
                                                    }}
                                                />
                                                <button onClick={() => {
                                                    const updated = [...editedProfile.magic_items];
                                                    updated.splice(index, 1);
                                                    setEditedProfile({ ...editedProfile, magic_items: updated });
                                                }}>🗑️</button>
                                            </>
                                        ) : (
                                            item
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li>No magic items listed.</li>
                            )}
                        </ul>

                        {/* Add the input field and button to allow adding new magic items */}
                        {isEditingProfile && (
                            <div className="add-magic-item-container">
                                <input
                                    type="text"
                                    value={newMagicItem}  // Bound to the newMagicItem state
                                    onChange={(e) => setNewMagicItem(e.target.value)}  // Update on input change
                                    placeholder="Enter new magic item"
                                />
                                <button onClick={() => {
                                    if (newMagicItem.trim()) {
                                        setEditedProfile({
                                            ...editedProfile,
                                            magic_items: [...editedProfile.magic_items, newMagicItem.trim()],
                                        });
                                        setNewMagicItem(''); // Clear input after adding
                                    }
                                }}>
                                    Add Magic Item
                                </button>
                            </div>
                        )}

                        <h3>Money</h3>
                        <ul>
                            {editedProfile.money?.length > 0 ? (
                                editedProfile.money.map((entry, index) => (
                                    <li key={index}>
                                        {isEditingProfile ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editedProfile.money[index]}
                                                    onChange={(e) => {
                                                        const updated = [...editedProfile.money];
                                                        updated[index] = e.target.value;
                                                        setEditedProfile({ ...editedProfile, money: updated });
                                                    }}
                                                />
                                                <button onClick={() => {
                                                    const updated = [...editedProfile.money];
                                                    updated.splice(index, 1);
                                                    setEditedProfile({ ...editedProfile, money: updated });
                                                }}>🗑️</button>
                                            </>
                                        ) : (
                                            entry
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li>No money listed.</li>
                            )}
                        </ul>

                        {/* Add the input field and button to allow adding new money entries */}
                        {isEditingProfile && (
                            <div className="add-money-container">
                                <input
                                    type="text"
                                    value={newMoney}  // Bound to the newMoney state
                                    onChange={(e) => setNewMoney(e.target.value)}  // Update on input change
                                    placeholder="Enter new money entry"
                                />
                                <button onClick={() => {
                                    if (newMoney.trim()) {
                                        setEditedProfile({
                                            ...editedProfile,
                                            money: [...editedProfile.money, newMoney.trim()],
                                        });
                                        setNewMoney(''); // Clear input after adding
                                    }
                                }}>
                                    Add Money
                                </button>
                            </div>
                        )}

                        <h3>Spellcasting</h3>
                        <ul>
                            {editedProfile.spellcasting?.length > 0 ? (
                                editedProfile.spellcasting.map((entry, index) => (
                                    <li key={index}>
                                        {isEditingProfile ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editedProfile.spellcasting[index]}
                                                    onChange={(e) => {
                                                        const updated = [...editedProfile.spellcasting];
                                                        updated[index] = e.target.value;
                                                        setEditedProfile({ ...editedProfile, spellcasting: updated });
                                                    }}
                                                />
                                                <button onClick={() => {
                                                    const updated = [...editedProfile.spellcasting];
                                                    updated.splice(index, 1);
                                                    setEditedProfile({ ...editedProfile, spellcasting: updated });
                                                }}>🗑️</button>
                                            </>
                                        ) : (
                                            entry
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li>No spellcasting data.</li>
                            )}
                        </ul>

                        {/* Add the input field and button to allow adding new spellcasting entries */}
                        {isEditingProfile && (
                            <div className="add-spellcasting-container">
                                <input
                                    type="text"
                                    value={newSpellcasting}  // Bound to newSpellcasting state
                                    onChange={(e) => setNewSpellcasting(e.target.value)}  // Update on input change
                                    placeholder="Enter new spellcasting entry"
                                />
                                <button onClick={() => {
                                    if (newSpellcasting.trim()) {
                                        setEditedProfile({
                                            ...editedProfile,
                                            spellcasting: [...editedProfile.spellcasting, newSpellcasting.trim()],
                                        });
                                        setNewSpellcasting(''); // Clear input after adding
                                    }
                                }}>
                                    Add Spellcasting
                                </button>
                            </div>
                        )}

                        <h3>Attack Rolls</h3>
                        <ul>
                            {editedProfile.attack_rolls?.length > 0 ? (
                                editedProfile.attack_rolls.map((roll, index) => (
                                    <li key={index}>
                                        {isEditingProfile ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editedProfile.attack_rolls[index]}
                                                    onChange={(e) => {
                                                        const updated = [...editedProfile.attack_rolls];
                                                        updated[index] = e.target.value;
                                                        setEditedProfile({ ...editedProfile, attack_rolls: updated });
                                                    }}
                                                />
                                                <button onClick={() => {
                                                    const updated = [...editedProfile.attack_rolls];
                                                    updated.splice(index, 1);
                                                    setEditedProfile({ ...editedProfile, attack_rolls: updated });
                                                }}>🗑️</button>
                                            </>
                                        ) : (
                                            roll
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li>No attack rolls listed.</li>
                            )}
                        </ul>

                        {/* Add the input field and button to allow adding new attack rolls */}
                        {isEditingProfile && (
                            <div className="add-attack-roll-container">
                                <input
                                    type="text"
                                    value={newAttackRoll}  // Bound to newAttackRoll state
                                    onChange={(e) => setNewAttackRoll(e.target.value)}  // Update on input change
                                    placeholder="Enter new attack roll"
                                />
                                <button onClick={() => {
                                    if (newAttackRoll.trim()) {
                                        setEditedProfile({
                                            ...editedProfile,
                                            attack_rolls: [...editedProfile.attack_rolls, newAttackRoll.trim()],
                                        });
                                        setNewAttackRoll(''); // Clear input after adding
                                    }
                                }}>
                                    Add Attack Roll
                                </button>
                            </div>
                        )}


                    </div>

                    <button
                        onClick={async () => {
                            if (isEditingProfile) {
                                try {
                                    const transformedProfile = {
                                        ...editedProfile
                                    };

                                    console.log(transformedProfile);

                                    const res = await fetch(`http://localhost:5001/campaigns/${campaignId}/profiles/${profileId}/update`, {
                                        method: 'PATCH',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify(transformedProfile),
                                    });

                                    if (!res.ok) throw new Error("Failed to save profile changes");

                                    setProfile(editedProfile); // Commit changes
                                } catch (error) {
                                    console.error("Error updating profile:", error);
                                }
                            } else {
                                setEditedProfile({ ...profile }); // Prepare editable copy
                            }

                            setIsEditingProfile(!isEditingProfile); // Toggle mode
                        }}
                        className="modify-stats-button"
                    >
                        {isEditingProfile ? <>💾 Save Changes</> : <><FaEdit /> Modify Stats</>}
                    </button>
                </div>
            )}


            <div className="game-log">
                <h2>Game Log</h2>

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
                {['discoveries', 'battles', 'notes'].map((section) => (
                    <div key={section} className="game-log-section">
                        <h3 onClick={() => toggleSection(section)} style={{ cursor: 'pointer' }}>
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                            {expandedSections[section] ? <FaChevronUp /> : <FaChevronDown />}
                        </h3>
                        {expandedSections[section] && (
                            <div>
                                <ul>
                                    {gameLog[section].map((item, index) => {
                                        const isBeingEdited = editingEntry.section === section && editingEntry.index === index;
                                        return (
                                            <li key={index}>
                                                {isBeingEdited ? (
                                                    <div>
                                                        <textarea
                                                            value={item}
                                                            onChange={(e) => {
                                                                const updatedItems = [...gameLog[section]];
                                                                updatedItems[index] = e.target.value;
                                                                setGameLog(prev => ({ ...prev, [section]: updatedItems }));
                                                            }}
                                                            rows="4"
                                                            cols="50"
                                                        />
                                                        <button
                                                            className="save-button"
                                                            onClick={() => {
                                                                handleUpdateItem(section, index, gameLog[section][index]);
                                                                setEditingEntry({ section: null, index: null });
                                                            }}
                                                        >
                                                            Save
                                                        </button>
                                                    </div>

                                                ) : (
                                                    <div
                                                        style={{ cursor: isEditing ? 'pointer' : 'default' }}
                                                        onClick={() => {
                                                            if (isEditing) setEditingEntry({ section, index });
                                                        }}
                                                    >
                                                        {item.split('\n').map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                                                        {isEditing && (
                                                            <button
                                                                className="delete-button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation(); // prevent triggering edit mode
                                                                    handleDeleteItem(section, index);
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </li>
                                        );
                                    })}

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
                <button onClick={handleBackToCampaigns} className="campaigns-button">
                    Back to Campaigns
                </button>
            </div>
        </div>
    );
};

export default PlayerViewPage;
