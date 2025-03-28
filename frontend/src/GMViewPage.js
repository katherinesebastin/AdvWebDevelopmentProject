import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
//import './GMViewPage.css';  // Assume CSS file for styling

const GMViewPage = () => {
  const { id } = useParams(); // Get campaign ID from URL
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const profilesPerPage = 3; // Adjust as needed based on screen size

  useEffect(() => {
    // Simulate fetching player profiles for the campaign
    const fetchProfiles = async () => {
      const response = await fetch(`/api/campaigns/${id}/profiles`, {
        headers: {
          'Cache-Control': 'no-cache', // Instructs the browser to fetch fresh data
        },
      });
      const data = await response.json();
      setProfiles(data);
    };

    fetchProfiles();
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

  // Handle going back to the main screen
  const handleBackToCampaigns = () => {
    navigate('/'); // Navigate to the main screen
  };

  return (
    <div className="gm-view-container">
      <h1>GM view for campaign ID: {id}</h1>

      {/* Button to go back to the main screen */}
      <button onClick={handleBackToCampaigns} className="back-to-campaigns-button">
        Campaigns
      </button>

      <div className="profile-carousel">
        <button className="nav-button" onClick={handlePrev} disabled={currentIndex === 0}>
          <FaChevronLeft />
        </button>
        <div className="profile-list">
          {profiles.slice(currentIndex, currentIndex + profilesPerPage).map((profile) => (
            <div key={profile.id} className="profile-card">
              <p>{profile.name}</p>
            </div>
          ))}
        </div>
        <button className="nav-button" onClick={handleNext} disabled={currentIndex + profilesPerPage >= profiles.length}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default GMViewPage;
