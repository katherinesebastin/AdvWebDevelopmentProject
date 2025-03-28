import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const { id } = useParams();  // Get campaign ID from URL
  const navigate = useNavigate();  // Initialize navigate function

  const [campaign, setCampaign] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [gmProfile, setGMProfile] = useState(null);  // State for GM Profile
  const [editMode, setEditMode] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');

  useEffect(() => {
    // Fetch campaign and profiles including the GM profile
    axios.get(`http://localhost:5001/campaigns/${id}`)
      .then(response => {
        const { campaign, profiles, gm_profile } = response.data;
        console.log('Campaign:', campaign);
        console.log('Profiles:', profiles);  // Should be an empty array if no profiles
        console.log('GM Profile:', gm_profile);  // Will be null if no GM profile found

        // Set the state
        setCampaign(campaign);  // Set the campaign
        setProfiles(profiles);  // Set the profiles
        setGMProfile(gm_profile);  // Set the GM profile
      })
      .catch(error => {
        console.error('Error fetching campaign and profiles:', error);
      });
  }, [id]);

  // Function to navigate back to the campaigns page
  const goToCampaigns = () => {
    navigate('/');  // Go to the homepage (main page)
  };

  // Function to toggle between default and edit view
  const toggleEditView = () => {
    setEditMode(!editMode);
  };

  // Function to add a new profile
  const addProfile = async () => {
    try {
      console.log('Adding profile:', newProfileName); // Log the profile name
      const response = await axios.post(`http://localhost:5001/campaigns/${id}/profiles`, { name: newProfileName });
      console.log('Response:', response.data);  // Log the response data
      setProfiles([...profiles, response.data]);
      setNewProfileName('');  // Reset the input field after adding the profile
    } catch (error) {
      console.error('Error adding profile:', error);
    }
  };

  // Function to delete a profile (ensure GM profile is not deleted)
  const deleteProfile = async (profileId) => {
    const profileToDelete = profiles.find(profile => profile.id === profileId);
    if (profileToDelete.name === 'GM') {
      // Prevent deletion of GM profile
      return;
    }

    try {
      await axios.delete(`http://localhost:5001/campaigns/${id}/profiles/${profileId}`);
      setProfiles(profiles.filter(profile => profile.id !== profileId));
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <div>
      <h1>Campaign: {campaign ? campaign.name : 'Loading...'}</h1>

      <button
        onClick={goToCampaigns}
        className="p-2 bg-blue-500 text-white rounded fixed bottom-4 left-4"
      >
        Campaigns
      </button>

      {/* Toggle button between Edit and Default view */}
      <button
        onClick={toggleEditView}
        className="p-2 bg-blue-500 text-white rounded mb-4"
      >
        {editMode ? 'Exit Edit View' : 'Edit'}
      </button>

      {/* Default View - GM Profile and Profiles */}
      {!editMode ? (
        <div>
          {/* GM Profile */}
          {gmProfile ? (
            <div className="mb-4">
              <h3>GM Profile</h3>
              <p>{gmProfile.name} (GM)</p>
            </div>
          ) : (
            <div className="mb-4">
              <p>No GM Profile found.</p>
            </div>
          )}

          {/* Profiles */}
          <h2 className="text-2xl mb-4">Profiles</h2>
          <ul>
            {profiles.length === 0 ? (
              <p>No profiles created yet.</p>
            ) : (
              profiles.map(profile => (
                <li key={profile.id} className="mb-2">
                  {profile.name === 'GM' ? (
                    <span>{profile.name} (GM)</span> // Display GM profile without delete button
                  ) : (
                    <div className="flex justify-between">
                      <span>{profile.name}</span>
                    </div>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      ) : (
        // Edit View - Add New Profile and Edit/Delete Options
        <div>
          <h2 className="text-2xl mb-4">Edit Profiles</h2>

          {/* Add New Profile */}
          <input
            type="text"
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
            placeholder="Enter new profile name"
            className="border p-2 rounded mb-4"
          />
          <button
            onClick={addProfile}
            className="p-2 bg-green-500 text-white rounded"
          >
            Add New Profile
          </button>

          <ul className="mt-4">
            {profiles.length === 0 ? (
              <p>No profiles created yet.</p>
            ) : (
              profiles.map(profile => (
                <li key={profile.id} className="flex justify-between mb-2">
                  {profile.name === 'GM' ? (
                    <span>{profile.name} (GM)</span> // GM profile remains non-deletable
                  ) : (
                    <div className="flex justify-between">
                      <span>{profile.name}</span>
                      <button
                        onClick={() => deleteProfile(profile.id)}
                        className="ml-2 p-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

// Export ProfilePage at the bottom of the file
export default ProfilePage;
