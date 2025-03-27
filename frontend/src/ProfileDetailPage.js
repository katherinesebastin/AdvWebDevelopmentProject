import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfileDetailPage = () => {
  const { campaignName, profileName } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5001/profiles/${campaignName}/${profileName}`).then(response => {
      setProfile(response.data);
    });
  }, [campaignName, profileName]);

  const updateProfile = async () => {
    const response = await axios.put(
      `http://localhost:5001/campaigns/${campaignName}/profiles/${profileName}`,
      { stats: profile.stats, equipment: profile.equipment, skills: profile.skills }
    );
    setProfile(response.data);
  };
  

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">{profile.name} - Profile Details</h1>

      {editName ? (
        <div>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border p-2 rounded mb-4"
            placeholder="Enter new name"
          />
          <button onClick={updateProfileName} className="p-2 bg-green-500 text-white rounded">
            Save Name
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl">Profile Information</h2>
          <p><strong>Stats:</strong> {profile.stats}</p>
          <p><strong>Equipment:</strong> {profile.equipment}</p>
          <p><strong>Skills:</strong> {profile.skills}</p>

          <button
            onClick={() => setEditName(true)}
            className="p-2 bg-blue-500 text-white rounded mt-4"
          >
            Edit Profile Name
          </button>
        </div>
      )}

      <button
        onClick={() => navigate(`/campaigns/${campaignName}`)}
        className="mt-4 p-2 bg-gray-500 text-white rounded"
      >
        Back to Campaign Profiles
      </button>
    </div>
  );
};

export default ProfileDetailPage;
