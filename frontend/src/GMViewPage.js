import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';

const GMViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const profilesPerPage = 3;
  const [gameLog, setGameLog] = useState({ discoveries: [], battles: [], notes: [] });
  const [expandedSections, setExpandedSections] = useState({ discoveries: false, battles: false, notes: false });
  const [isEditing, setIsEditing] = useState(false); // Manage whether in edit mode

  // Fetch profiles and game log from API
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const url = `http://localhost:5001/campaigns/${id}/profiles`;
        const response = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
        const data = await response.json();
        setProfiles(data);
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

  // Toggle the visibility of the sections (discoveries, battles, notes)
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleAddItem = (section) => {
    const newItem = prompt(`Enter a new ${section} item:`);
    if (newItem) {
      setGameLog((prevGameLog) => ({
        ...prevGameLog,
        [section]: [...prevGameLog[section], newItem],
      }));
    }
  };

  const handleDeleteItem = (section, index) => {
    const updatedItems = gameLog[section].filter((_, i) => i !== index);
    setGameLog((prevGameLog) => ({
      ...prevGameLog,
      [section]: updatedItems,
    }));
  };

  const handleUpdateItem = (section, index) => {
    const updatedItem = prompt(`Edit the ${section} item:`, gameLog[section][index]);
    if (updatedItem) {
      const updatedItems = gameLog[section].map((item, i) =>
        i === index ? updatedItem : item
      );
      setGameLog((prevGameLog) => ({
        ...prevGameLog,
        [section]: updatedItems,
      }));
    }
  };

  return (
    <div className="gm-view-container">
      <div className="profile-carousel">
        <button
          className="nav-button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <FaChevronLeft />
        </button>
        <div className="profile-list">
          {profiles.slice(currentIndex, currentIndex + profilesPerPage).map((profile) => (
            <div key={profile.id} className="profile-card">
              <p>{profile.name}</p>
            </div>
          ))}
        </div>
        <button
          className="nav-button"
          onClick={handleNext}
          disabled={currentIndex + profilesPerPage >= profiles.length}
        >
          <FaChevronRight />
        </button>
      </div>

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
                            onChange={(e) => {
                              const updatedItem = e.target.value;
                              const updatedItems = gameLog[section].map((existingItem, i) =>
                                i === index ? updatedItem : existingItem
                              );
                              setGameLog((prevGameLog) => ({
                                ...prevGameLog,
                                [section]: updatedItems,
                              }));
                            }}
                            rows="4"
                            cols="50"
                          />
                          <button onClick={() => handleDeleteItem(section, index)}>
                            <FaTrash /> Delete
                          </button>
                        </div>
                      ) : (
                        <div>
                          {item.split('\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                {isEditing && (
                  <button onClick={() => handleAddItem(section)}>
                    Add {section.slice(0, -1)}
                  </button>
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
