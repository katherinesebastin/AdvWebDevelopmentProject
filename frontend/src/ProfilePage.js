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
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { id } = useParams();  // Get campaign ID from URL

  return (
    <div>
      <h1>Page for Campaign: {id}</h1>
    </div>
  );
};

export default ProfilePage;

