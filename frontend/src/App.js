import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import ProfilePage from './ProfilePage';
import GMViewPage from './GMViewPage';  // Import the new GM view page
import PlayerViewPage from './PlayerViewPage';  // Import the new page
import './App.css';


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
    try {
      // Send POST request to add a new campaign
      const response = await axios.post('http://localhost:5001/campaigns', { name: campaignName });

      // Update campaigns list with the newly added campaign using the latest state
      setCampaigns(prevCampaigns => [...prevCampaigns, response.data.campaign]);

      // Reset the campaign name input
      setCampaignName('');
    } catch (error) {
      console.error('Error adding campaign:', error);
    }
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
              {/* Edit Mode Toggle Button */}
              <div className="flex justify-between mb-4">
                <h1 className="text-2xl">Choose a Campaign</h1>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="edit"
                >
                  {editMode ? 'Exit Edit View' : 'Edit'}
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
                  <button onClick={addCampaign} className="add-campaign">
                    Add New Campaign
                  </button>

                  {/* List of Campaigns with Edit/Delete Options */}
                  <ul className="mt-4">
                    {campaigns.map(campaign => (
                      <li
                        key={campaign.id}
                        className={`flex justify-between items-center mb-2 ${editingId === campaign.id ? 'editing' : ''}`}
                      >
                        {editingId === campaign.id ? (
                          <>
                            <input
                              type="text"
                              value={editedName}
                              onChange={(e) => setEditedName(e.target.value)}
                              className="border p-1 rounded mr-2"
                            />
                            <button
                              onClick={() => saveEdit(campaign.id)}
                              className="p-1 bg-green-500 text-white rounded"
                            >
                              Save
                            </button>
                          </>
                        ) : (
                          <span
                            className="cursor-pointer text-blue-600"
                            onClick={() => startEditing(campaign.id, campaign.name)}
                          >
                            {campaign.name}
                          </span>
                        )}
                        <div>
                          {editingId === campaign.id ? null : (
                            <button
                              onClick={() => deleteCampaign(campaign.id)}
                              className="delete"
                            >
                              Delete
                            </button>
                          )}
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
                      <Link
                        to={`/campaigns/${campaign.id}`}
                        key={campaign.id}
                        className="block mb-2 no-underline"
                      >
                        <li className="mb-2">
                          {campaign.name}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          }
        />

        {/* Campaign Detail Page */}
        <Route path="/campaigns/:id" element={<ProfilePage />} />
        <Route path="/gm/:id" element={<GMViewPage />} />  {/* GM view Page */}
        <Route path="/player/:campaignId/:profileId" element={<PlayerViewPage />} />
      </Routes>
    </div>
  );
};

export default App;
