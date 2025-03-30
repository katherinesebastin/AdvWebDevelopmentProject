import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import PlayerViewPage from './PlayerViewPage';

const GMViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const profilesPerPage = 3;
  const [gameLog, setGameLog] = useState({ discoveries: [], battles: [], notes: [] });
  const [expandedSections, setExpandedSections] = useState({ discoveries: false, battles: false, notes: false });
  const [isEditing, setIsEditing] = useState(false);
  const [newEntries, setNewEntries] = useState({ discoveries: "", battles: "", notes: "" });

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

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleAddItem = (section) => {
    if (newEntries[section].trim()) {
      setGameLog((prevGameLog) => ({
        ...prevGameLog,
        [section]: [...prevGameLog[section], newEntries[section].trim()],
      }));
      setNewEntries((prev) => ({ ...prev, [section]: "" }));
    }
  };

  const handleDeleteItem = (section, index) => {
    const updatedItems = gameLog[section].filter((_, i) => i !== index);
    setGameLog((prevGameLog) => ({
      ...prevGameLog,
      [section]: updatedItems,
    }));
  };

  return (
    <div className="gm-view-container">
      {selectedProfile ? (
        <>
          <PlayerViewPage profile={selectedProfile} />
          <button onClick={() => setSelectedProfile(null)} className="return-gm-view-button">
            Return to GM View
          </button>
        </>
      ) : (
        <>
          <div className="profile-carousel">
            <button className="nav-button" onClick={handlePrev} disabled={currentIndex === 0}>
              <FaChevronLeft />
            </button>
            <div className="profile-list">
              {profiles.slice(currentIndex, currentIndex + profilesPerPage).map((profile) => (
                <div key={profile.id} className="profile-card" onClick={() => setSelectedProfile(profile)}>
                  <p>{profile.name}</p>
                </div>
              ))}
            </div>
            <button className="nav-button" onClick={handleNext} disabled={currentIndex + profilesPerPage >= profiles.length}>
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
                            <textarea
                              value={item}
                              onChange={(e) => {
                                const updatedItems = gameLog[section].map((existingItem, i) =>
                                  i === index ? e.target.value : existingItem
                                );
                                setGameLog((prevGameLog) => ({ ...prevGameLog, [section]: updatedItems }));
                              }}
                              rows="4"
                              cols="50"
                            />
                          ) : (
                            <p>{item}</p>
                          )}
                          {isEditing && (
                            <button onClick={() => handleDeleteItem(section, index)}>
                              <FaTrash /> Delete
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                    <textarea
                      value={newEntries[section]}
                      onChange={(e) => setNewEntries((prev) => ({ ...prev, [section]: e.target.value }))}
                      rows="4"
                      cols="50"
                      placeholder={`Enter new ${section.slice(0, -1)}`}
                    />
                    <button onClick={() => handleAddItem(section)}>Add {section.slice(0, -1)}</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GMViewPage;
