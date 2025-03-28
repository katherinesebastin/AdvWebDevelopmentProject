/*import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';  // Add this line to import axios

const ProfilePage = () => {
  const { id } = useParams();  // Uses id (CORRECT)


  const [campaignDetails, setCampaignDetails] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5001/campaigns/${id}`).then(response => {
      setCampaignDetails(response.data);
    });
  }, [id]);  // ✅ Corrected


  if (!campaignDetails) return <div>Loading...</div>;

  return (
    <div>
      <h1>{campaignDetails.name}</h1>
      <p>{campaignDetails.description}</p>
      {/* Render other campaign details here *//*}
    </div>
  );
};

export default ProfilePage*/
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { id } = useParams();  // Get campaign ID from URL
  const navigate = useNavigate();  // Initialize navigate function

  // Function to navigate back to the main page
  const goToCampaigns = () => {
    navigate('/');  // Navigate to the homepage (main page)
  };

  return (
    <div>
      <h1>Page for Campaign: {id}</h1>

      {/* Button to go back to the Campaigns page */}
      <button
        onClick={goToCampaigns}
        className="p-2 bg-blue-500 text-white rounded fixed bottom-4 left-4"
      >
        Campaigns
      </button>
    </div>
  );
};

export default ProfilePage;


