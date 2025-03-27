import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';  // Removed BrowserRouter here
import axios from 'axios';
import ProfilePage from './ProfilePage';  // Import ProfilePage component

const App = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [campaignName, setCampaignName] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5001/campaigns').then(response => {
      setCampaigns(response.data);
    });
  }, []);

  const addCampaign = async () => {
    const response = await axios.post('http://localhost:5001/campaigns', { name: campaignName });
    setCampaigns([...campaigns, response.data]);
    setCampaignName('');
  };

  const deleteCampaign = async (id) => {
    if (isNaN(id)) {
      console.error('Invalid campaign ID');
      return;
    }

    try {
      // Send the DELETE request with the correct ID
      await axios.delete(`http://localhost:5001/campaigns/${id}`);

      // Remove the campaign from the state after successful deletion
      setCampaigns(campaigns.filter(campaign => campaign.id !== id)); // Ensure 'id' is the correct property name here
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };



  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">Digital Score & Stat Keeper</h1>

      {/* Edit Mode Toggle Button */}
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl">Campaigns</h2>
        <button
          onClick={() => setEditMode(!editMode)}
          className="p-2 bg-blue-500 text-white rounded"
        >
          {editMode ? 'Exit' : 'Edit'}
        </button>
      </div>

      {editMode ? (
        <div>
          {/* Add Campaign */}
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            className="border p-2 rounded mb-4"
            placeholder="Enter Campaign Name"
          />
          <button onClick={addCampaign} className="p-2 bg-green-500 text-white rounded">
            Add New Campaign
          </button>

          {/* List of Campaigns with Delete Option */}
          <ul className="mt-4">
            {campaigns.map(campaign => (
              <li key={campaign.id} className="flex justify-between items-center mb-2">
                <span
                  className="cursor-pointer text-blue-600"
                >
                  <Link to={`/campaigns/${campaign.name}`}>
                    {campaign.name}
                  </Link>
                </span>
                <button
                  onClick={() => deleteCampaign(campaign.id)}
                  className="ml-2 p-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          {/* Default View - List Campaigns */}
          <ul>
            {campaigns.map(campaign => (
              <li key={campaign.id} className="mb-2">
                <Link
                  to={`/campaigns/${campaign.name}`}
                  className="cursor-pointer text-blue-600"
                >
                  {campaign.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Routes for different pages */}
      <Routes>
        {/* Pass the campaignName as a parameter to ProfilePage */}
        <Route path="/campaigns/:campaignName" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default App;
