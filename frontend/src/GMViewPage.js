import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import PlayerViewPage from './PlayerViewPage';


const GMViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const profilesPerPage = 3;
  const [gameLog, setGameLog] = useState({ discoveries: [], battles: [], notes: [] });
  const [expandedSections, setExpandedSections] = useState({ discoveries: false, battles: false, notes: false });
  const [isEditing, setIsEditing] = useState(false);
  const [newEntries, setNewEntries] = useState({ discoveries: "", battles: "", notes: "" });

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const url = `http://localhost:5001/campaigns/${id}/profiles`;  // Ensure this is correct
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
  }, [id]);

  const handleProfileClick = (profileId) => {
    setSelectedProfileId(profileId); // Set the selected profile ID when a profile name is clicked
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

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleAddItem = async (section) => {
    if (newEntries[section].trim()) {
      const updatedGameLog = {
        ...gameLog,
        [section]: [...gameLog[section], newEntries[section].trim()],
      };

      setGameLog(updatedGameLog); // Update UI

      // Send updated data to backend
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

  const handleDeleteItem = async (section, index) => {
    const updatedItems = gameLog[section].filter((_, i) => i !== index);
    const updatedGameLog = { ...gameLog, [section]: updatedItems };

    setGameLog(updatedGameLog); // Update UI

    // Send updated data to backend
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

  const handleEditItem = async (section, index, newValue) => {
    const updatedItems = gameLog[section].map((item, i) => (i === index ? newValue : item));
    const updatedGameLog = { ...gameLog, [section]: updatedItems };

    setGameLog(updatedGameLog); // Update UI

    // Send updated data to backend
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
    <div className="gm-view-container">
      {/* Only show the profile carousel if no profile is selected */}
      {!selectedProfileId && (
        <div className="profile-carousel">
          <button className="nav-button" onClick={handlePrev} disabled={currentIndex === 0}>
            <FaChevronLeft />
          </button>
          <div className="profile-list">
            {profiles.slice(currentIndex, currentIndex + profilesPerPage).map((profile) => (
              <div key={profile.id} className="profile-card" onClick={() => handleProfileClick(profile.id)}>
                <p>{profile.name}</p>
              </div>
            ))}
          </div>
          <button className="nav-button" onClick={handleNext} disabled={currentIndex + profilesPerPage >= profiles.length}>
            <FaChevronRight />
          </button>
        </div>
      )}

      {/* Render PlayerViewPage when a profile is selected */}
      {selectedProfileId && (
        <div>
          <div>
            <PlayerViewPage campaignId={id} profileId={selectedProfileId} />
            <button onClick={() => setSelectedProfileId(null)} className="return-to-gm-button">
              Return to GM View
            </button>
          </div>
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
                        <textarea
                          value={item}
                          onChange={(e) => handleEditItem(section, index, e.target.value)}
                          rows="4"
                          cols="50"
                        />
                      ) : (
                        <div>
                          {item.split('\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                          ))}
                        </div>
                      )}
                      {isEditing && (
                        <button onClick={() => handleDeleteItem(section, index)}>
                          <FaTrash /> Delete
                        </button>
                      )}
                    </li>
                  ))}
                </ul>

                {isEditing && (
                  <>
                    <textarea
                      value={newEntries[section]}
                      onChange={(e) => setNewEntries((prev) => ({ ...prev, [section]: e.target.value }))}
                      rows="4"
                      cols="50"
                      placeholder={`Enter new ${section.slice(0, -1)}`}
                    />
                    <button onClick={() => handleAddItem(section)}>Add {section.slice(0, -1)}</button>
                  </>
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

export default GMViewPage;






