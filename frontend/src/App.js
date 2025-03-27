import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [campaignName, setCampaignName] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [profileName, setProfileName] = useState('');

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
    await axios.delete(`http://localhost:5001/campaigns/${id}`);
    setCampaigns(campaigns.filter(campaign => campaign.id !== id));
  };

  const selectCampaign = async (id) => {
    setSelectedCampaign(id);
    const response = await axios.get(`http://localhost:5001/profiles/${id}`);
    setProfiles(response.data);
  };

  const addProfile = async () => {
    const response = await axios.post('http://localhost:5001/profiles', {
      campaign_id: selectedCampaign,
      name: profileName,
      stats: 'Stats here',
      equipment: 'Equipment here',
      skills: 'Skills here'
    });
    setProfiles([...profiles, response.data]);
    setProfileName('');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">Digital Score & Stat Keeper</h1>
      {!selectedCampaign ? (
        <div>
          <input type="text" value={campaignName} onChange={e => setCampaignName(e.target.value)} className="border p-2 rounded" placeholder="Enter Campaign Name" />
          <button onClick={addCampaign} className="ml-2 p-2 bg-blue-500 text-white rounded">Add Campaign</button>

          <ul>
            {campaigns.map(campaign => (
              <li key={campaign.id}>
                <span onClick={() => selectCampaign(campaign.id)} className="cursor-pointer text-blue-600">{campaign.name}</span>
                <button onClick={() => deleteCampaign(campaign.id)} className="ml-2 p-1 bg-red-500 text-white rounded">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>Profiles in Campaign</h2>
          <input type="text" value={profileName} onChange={e => setProfileName(e.target.value)} className="border p-2 rounded" placeholder="Enter Profile Name" />
          <button onClick={addProfile} className="ml-2 p-2 bg-green-500 text-white rounded">Add Profile</button>

          <ul>
            {profiles.map(profile => (
              <li key={profile.id}>{profile.name}</li>
            ))}
          </ul>

          <button onClick={() => setSelectedCampaign(null)} className="mt-4 p-2 bg-gray-500 text-white rounded">Back to Campaigns</button>
        </div>
      )}
    </div>
  );
};

export default App;
