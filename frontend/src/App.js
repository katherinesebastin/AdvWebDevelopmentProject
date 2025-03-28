import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';  // Removed BrowserRouter here
import axios from 'axios';
import ProfilePage from './ProfilePage';  // Import ProfilePage component

const App = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [campaignName, setCampaignName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');

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
      await axios.delete(`http://localhost:5001/campaigns/${id}`);
      setCampaigns(campaigns.filter(campaign => campaign.id !== id));
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  const startEditing = (id, name) => {
    setEditingId(id);
    setEditedName(name);
  };

  const saveEdit = async (id) => {
    try {
      // Change this to a PATCH request instead of PUT
      const response = await axios.patch(`http://localhost:5001/campaigns/${id}`, { name: editedName });
      setCampaigns(campaigns.map(camp => (camp.id === id ? { ...camp, name: editedName } : camp)));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating campaign:', error);
    }
  };

  return (
    <div className="p-8">
      <Routes>
        {/* Campaign List Page (Homepage) */}
        <Route
          path="/"
          element={
            <div>
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

                  {/* List of Campaigns with Edit/Delete Options */}
                  <ul className="mt-4">
                    {campaigns.map(campaign => (
                      <li key={campaign.id} className="flex justify-between items-center mb-2">
                        {editingId === campaign.id ? (
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="border p-1 rounded"
                          />
                        ) : (
                          <span
                            className="cursor-pointer text-blue-600"
                            onClick={() => startEditing(campaign.id, campaign.name)}
                          >
                            {campaign.name}
                          </span>
                        )}
                        <div>
                          {editingId === campaign.id ? (
                            <button
                              onClick={() => saveEdit(campaign.id)}
                              className="ml-2 p-1 bg-green-500 text-white rounded"
                            >
                              Save
                            </button>
                          ) : null}
                          <button
                            onClick={() => deleteCampaign(campaign.id)}
                            className="ml-2 p-1 bg-red-500 text-white rounded"
                          >
                            Delete
                          </button>
                        </div>
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
                        <Link to={`/campaigns/${campaign.id}`} className="cursor-pointer text-blue-600">
                          {campaign.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          }
        />

        {/* Campaign Detail Page */}
        <Route path="/campaigns/:id" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default App;
