import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';  // Add this line to import axios

const ProfilePage = () => {
  const { campaignName } = useParams();  // Get the campaignName from the URL

  const [campaignDetails, setCampaignDetails] = useState(null);

  useEffect(() => {
    // Fetch campaign details based on the campaign name
    axios.get(`http://localhost:5001/campaigns/${campaignName}`).then(response => {
      setCampaignDetails(response.data);
    });
  }, [campaignName]);  // Re-fetch when campaignName changes

  if (!campaignDetails) return <div>Loading...</div>;

  return (
    <div>
      <h1>{campaignDetails.name}</h1>
      <p>{campaignDetails.description}</p>
      {/* Render other campaign details here */}
    </div>
  );
};

export default ProfilePage;
