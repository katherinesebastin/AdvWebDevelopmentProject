import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronUp, FaChevronDown, FaEdit, FaTimes } from 'react-icons/fa';

const PlayerViewPage = () => {
  const { id } = useParams(); // Player's profile ID or campaign ID
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [gameLog, setGameLog] = useState({ discoveries: [], battles: [], notes: [] });
  const [expandedSections, setExpandedSections] = useState({ discoveries: false, battles: false, notes: false });
  const [isEditing, setIsEditing] = useState(false);

  // State for new entries
  const [newNote, setNewNote] = useState('');
  const [newBattle, setNewBattle] = useState('');
  const [newDiscovery, setNewDiscovery] = useState('');

  // Fetch player profile and game log
  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const profileResponse = await fetch(`http://localhost:5001/profiles/${id}`);
        const profileData = await profileResponse.json();
        setProfile(profileData);

        const { discoveries, battles, notes } = profileData; // Assuming these fields exist in the profile
        setGameLog({ discoveries, battles, notes });
      } catch (error) {
        console.error('Error fetching player profile or game log:', error);
      }
    };

    fetchPlayerData();
  }, [id]);

  // Toggle section visibility
  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Add item to a specific section of the game log
  const handleAddItem = (section, newItem) => {
    if (newItem) {
      setGameLog(prevGameLog => ({
        ...prevGameLog,
        [section]: [...prevGameLog[section], newItem]
      }));
    }

    // Clear the input field after adding the item
    if (section === 'notes') {
      setNewNote('');
    } else if (section === 'battles') {
      setNewBattle('');
    } else if (section === 'discoveries') {
      setNewDiscovery('');
    }
  };

  // Delete item from a specific section of the game log
  const handleDeleteItem = (section, index) => {
    const updatedItems = gameLog[section].filter((_, i) => i !== index);
    setGameLog(prevGameLog => ({
      ...prevGameLog,
      [section]: updatedItems
    }));
  };

  // Update item in a specific section of the game log
  const handleUpdateItem = (section, index, updatedItem) => {
    const updatedItems = gameLog[section].map((item, i) =>
      i === index ? updatedItem : item
    );
    setGameLog(prevGameLog => ({
      ...prevGameLog,
      [section]: updatedItems
    }));
  };

  // Handle exit to campaigns or dashboard
  const handleBackToCampaigns = () => {
    navigate('/');
  };

  return (
    <div className="player-view-container">
      <h1>{profile ? `Showing Player View for ${profile.name}` : 'Loading...'}'s Game Log</h1>

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
                      value={
                        section === 'notes' ? newNote : section === 'battles' ? newBattle : newDiscovery
                      }
                      onChange={(e) =>
                        section === 'notes'
                          ? setNewNote(e.target.value)
                          : section === 'battles'
                          ? setNewBattle(e.target.value)
                          : setNewDiscovery(e.target.value)
                      }
                      rows="4"
                      cols="50"
                      placeholder={`Enter ${section.slice(0, -1)}`}
                    />
                    <button onClick={() => handleAddItem(section, section === 'notes' ? newNote : section === 'battles' ? newBattle : newDiscovery)}>
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
          <div>
            <button onClick={toggleEditMode} className="exit-edit-button">
              <FaTimes /> Exit Edit Mode
            </button>
          </div>
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
