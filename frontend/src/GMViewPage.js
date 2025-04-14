import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import PlayerViewPage from './PlayerViewPage';
import './GMViewPage.css';

const GMViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profilesPerPage, setProfilesPerPage] = useState(5);
  const [gameLog, setGameLog] = useState({ discoveries: [], battles: [], notes: [] });
  const [expandedSections, setExpandedSections] = useState({ discoveries: false, battles: false, notes: false });
  const [isEditing, setIsEditing] = useState(false);
  const [newEntries, setNewEntries] = useState({ discoveries: "", battles: "", notes: "" });
  const [editingItem, setEditingItem] = useState({ section: null, index: null });
  const [editedValue, setEditedValue] = useState("");  // Track the edited value

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const url = `http://localhost:5001/campaigns/${id}/profiles`;
        const response = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
        const data = await response.json();
        setProfiles(data.profiles);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    const fetchGameLog = async () => {
      try {
        const url = `http://localhost:5001/campaigns/${id}/gamelog`;
        const response = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
        const data = await response.json();
        setGameLog(data);
      } catch (error) {
        console.error('Error fetching game log:', error);
      }
    };

    fetchProfiles();
    fetchGameLog();

    const updateProfilesPerPage = () => {
      const cardWidth = 180 + 20;
      const availableWidth = window.innerWidth - 120;
      const count = Math.floor(availableWidth / cardWidth);
      setProfilesPerPage(Math.max(1, count) - 1);
    };

    updateProfilesPerPage();
    window.addEventListener('resize', updateProfilesPerPage);

    return () => window.removeEventListener('resize', updateProfilesPerPage);

  }, [id]);

  const handleProfileClick = (profileId) => {
    setSelectedProfileId(profileId);
  };

  const handleNext = () => {
    if (currentIndex + profilesPerPage < profiles.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleBackToCampaigns = () => {
    navigate('/');
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleExitEditMode = () => {
    setIsEditing(false);
    setEditingItem({ section: null, index: null }); // Reset the selected item for editing
    setEditedValue(""); // Reset the edited value
  };

  const toggleEditMode = () => {
    if (isEditing) {
      // If we are in edit mode and the user wants to exit, reset the edit state
      handleExitEditMode();
    } else {
      setIsEditing(true);
    }
  };

  const handleAddItem = async (section) => {
    if (newEntries[section].trim()) {
      const updatedGameLog = {
        ...gameLog,
        [section]: [...gameLog[section], newEntries[section].trim()],
      };

      setGameLog(updatedGameLog);

      try {
        await fetch(`http://localhost:5001/campaigns/${id}/gamelog`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedGameLog),
        });
      } catch (error) {
        console.error('Error updating game log:', error);
      }

      setNewEntries((prev) => ({ ...prev, [section]: "" }));
    }
  };

  const handleEditItem = async (section, index, item) => {
    if (editingItem.section === section && editingItem.index === index) {
      const updatedItems = gameLog[section].map((currentItem, i) =>
        i === index ? editedValue : currentItem
      );
      const updatedGameLog = { ...gameLog, [section]: updatedItems };

      setGameLog(updatedGameLog);
      setEditingItem({ section: null, index: null });

      // Send updated game log to backend asynchronously
      try {
        await fetch(`http://localhost:5001/campaigns/${id}/gamelog`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedGameLog),
        });
      } catch (error) {
        console.error('Error updating game log:', error);
      }
    } else {
      // If not in edit mode, set the item to be edited
      setEditingItem({ section, index });
      setEditedValue(item);  // Set the value of the entry to be edited
    }
  };

  const handleDeleteItem = async (section, index) => {
    const updatedItems = gameLog[section].filter((_, i) => i !== index);
    const updatedGameLog = { ...gameLog, [section]: updatedItems };

    setGameLog(updatedGameLog);

    try {
      await fetch(`http://localhost:5001/campaigns/${id}/gamelog`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGameLog),
      });
    } catch (error) {
      console.error('Error updating game log:', error);
    }
  };

  return (
    <div className="gm-view-page">
      <div className="gm-view-container">
        {/* Profile Carousel */}
        {!selectedProfileId && (
          <div className="profile-carousel">
            <button className="arrow" onClick={handlePrev} disabled={currentIndex === 0}>
              <FaChevronLeft />
            </button>
            <div className="profile-list">
              {profiles.slice(currentIndex, currentIndex + profilesPerPage).map((profile) => (
                <div key={profile.id} className="profile-card" onClick={() => handleProfileClick(profile.id)}>
                  <p>{profile.name}</p>
                </div>
              ))}
            </div>
            <button
              className="arrow"
              onClick={handleNext}
              disabled={currentIndex + profilesPerPage >= profiles.length}
            >
              <FaChevronRight />
            </button>
          </div>
        )}

        {/* Player View */}
        {selectedProfileId && (
          <div>
            <PlayerViewPage campaignId={id} profileId={selectedProfileId} />
            <button onClick={() => setSelectedProfileId(null)} className="return-to-gm-button">
              Return to GM View
            </button>
          </div>
        )}

        {/* Game Log */}
        <div className="game-log">
          <h2>Game Log</h2>
          {['discoveries', 'battles', 'notes'].map((section) => (
            <div key={section} className="game-log-section">
              <div className="game-log-section-header">
                <h3 onClick={() => toggleSection(section)} style={{ cursor: 'pointer' }}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                  {expandedSections[section] ? <FaChevronUp /> : <FaChevronDown />}
                </h3>
              </div>

              {expandedSections[section] && (
                <div className="game-log-items">
                  <ul>
                    {gameLog[section].map((item, index) => (
                      <li key={index} style={{ position: 'relative' }}>
                        {editingItem.section === section && editingItem.index === index ? (
                          // Editing the specific entry: Show Save button and textarea
                          <div>
                            <textarea
                              value={editedValue}
                              onChange={(e) => setEditedValue(e.target.value)}
                              rows="4"
                              cols="50"
                            />
                            <div className="button-group">
                              <button
                                className="save-button"
                                onClick={() => handleEditItem(section, index, item)} // Save changes
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          // Not editing the specific entry: Show Delete button and entry content
                          <div
                            onClick={() => {
                              if (isEditing) handleEditItem(section, index, item); // Only allow editing in edit mode
                            }}
                            style={{ cursor: isEditing ? 'pointer' : 'default' }}
                          >
                            {/* Display the item content */}
                            {item.split('\n').map((paragraph, i) => (
                              <p key={i}>{paragraph}</p>
                            ))}

                            {/* Show the delete button only if not editing this entry */}
                            {isEditing && editingItem.section !== section && editingItem.index !== index && (
                              <button
                                className="delete"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent triggering edit when clicking delete
                                  handleDeleteItem(section, index); // Delete item on click
                                }}
                              >
                                <FaTrash /> Delete
                              </button>
                            )}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>

                  {/* Add New Entry */}
                  {isEditing && (
                    <>
                      <textarea
                        value={newEntries[section]}
                        onChange={(e) =>
                          setNewEntries((prev) => ({ ...prev, [section]: e.target.value }))
                        }
                        rows="4"
                        cols="50"
                        placeholder={`Enter new ${section.slice(0, -1)}`}
                      />
                      <button onClick={() => handleAddItem(section)}>
                        Add {section === 'discoveries' ? 'Discovery' : section.slice(0, -1)}
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Buttons */}
          <div className="buttons" style={{ position: 'relative', height: '80px' }}>
            {isEditing ? (
              <button onClick={handleExitEditMode} className="exit-edit-button">
                <FaTimes /> Exit Edit Mode
              </button>
            ) : (
              <button onClick={toggleEditMode} className="edit-view">
                <FaEdit /> Edit Game Log
              </button>
            )}
            <button
              onClick={handleBackToCampaigns}
              className="back-to-campaigns-button"
              style={{ position: 'relative', height: '50px' }}
            >
              Back to Campaigns
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GMViewPage;
