const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const port = 5001;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'digital_score_stat_keeper',
  password: '1234',
  port: 5432,
});

app.use(cors());
app.use(express.json());

// Campaigns Endpoints
// Create a new campaign
/*app.post('/campaigns', async (req, res) => {
  const { name } = req.body;
  const result = await pool.query('INSERT INTO campaigns (name) VALUES ($1) RETURNING *', [name]);
  res.json(result.rows[0]);
});*/
app.post('/campaigns', async (req, res) => {
  const { name } = req.body;  // Get the campaign name from the request body
  const client = await pool.connect();

  try {
    await client.query('BEGIN');  // Start a transaction

    // Create the campaign first
    const campaignResult = await client.query(
      'INSERT INTO campaigns (name) VALUES ($1) RETURNING *',
      [name]
    );
    const campaign = campaignResult.rows[0];  // Get the campaign details

    console.log('Created campaign:', campaign);

    // Insert the GM profile with default values
    const gmProfileResult = await client.query(
      'INSERT INTO gm_profiles (campaign_id, discoveries, battles, notes) VALUES ($1, $2, $3, $4) RETURNING *',
      [campaign.id, [], [], []]  // Empty arrays for discoveries, battles, and notes
    );

    const gmProfile = gmProfileResult.rows[0];
    console.log('Created GM profile:', gmProfile);  // Log GM profile creation

    await client.query('COMMIT');  // Commit the transaction
    res.json(campaign);  // Send the created campaign as response
  } catch (error) {
    await client.query('ROLLBACK');  // Rollback transaction if any error occurs
    console.error('Error creating campaign and GM profile:', error);
    res.status(500).json({ message: 'Error creating campaign and GM profile', error: error });
  } finally {
    client.release();  // Release the database client
  }
});


// Get all campaigns
app.get('/campaigns', async (req, res) => {
  const result = await pool.query('SELECT * FROM campaigns');
  res.json(result.rows);
});

// Delete a campaign
// Delete the campaign and related profiles
app.delete('/campaigns/:id', async (req, res) => {
  const { id } = req.params;
  const client = await pool.connect();

  try {
    // Start a transaction to ensure atomicity
    await client.query('BEGIN');

    // Delete the related profiles first
    await client.query('DELETE FROM profiles WHERE campaign_id = $1', [id]);

    // Then delete the campaign
    await client.query('DELETE FROM campaigns WHERE id = $1', [id]);

    // Commit the transaction
    await client.query('COMMIT');

    res.sendStatus(204);
  } catch (error) {
    // If anything fails, rollback the transaction
    await client.query('ROLLBACK');
    console.error('Error deleting campaign and profiles:', error);
    res.status(500).json({ message: 'Error deleting campaign and profiles', error: error });
  } finally {
    client.release();
  }
});


// Update campaign name
app.patch('/campaigns/:id', async (req, res) => {
  const campaignId = req.params.id;
  const { name } = req.body;

  try {
    await pool.query('UPDATE campaigns SET name = $1 WHERE id = $2', [name, campaignId]);
    res.status(200).json({ message: 'Campaign updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating campaign', error: err });
  }
});

app.get('/campaigns/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the campaign by id
    const result = await pool.query('SELECT * FROM campaigns WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Fetch profiles from the profiles table
    const profilesResult = await pool.query('SELECT * FROM profiles WHERE campaign_id = $1', [id]);

    // Fetch the GM profile from the gm_profiles table
    const gmResult = await pool.query('SELECT * FROM gm_profiles WHERE campaign_id = $1', [id]);

    res.json({
      campaign: result.rows[0],
      profiles: profilesResult.rows,
      gm_profile: gmResult.rows[0] || null,  // Return GM profile if exists, otherwise null
    });
  } catch (err) {
    console.error('Error fetching campaign and profiles:', err);
    res.status(500).json({ message: 'Error fetching campaign and profiles', error: err });
  }
});



app.get('/gm_profiles/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM gm_profiles WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'GM profile not found' });
    }

    res.json(result.rows[0]);  // Return the GM profile data
  } catch (error) {
    console.error('Error fetching GM profile:', error);
    res.status(500).json({ message: 'Error fetching GM profile', error: error });
  }
});


// Player Profiles Endpoints
// Create a new profile for a specific campaign
app.post('/campaigns/:campaignName/profiles', async (req, res) => {
  const { campaignName } = req.params;
  const { name, stats, equipment, skills } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO profiles (campaign_name, name, stats, equipment, skills) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [campaignName, name, stats, equipment, skills]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error creating profile', error: err });
  }
});

// Get a specific profile within a campaign
app.get('/campaigns/:campaignName/profiles/:profileName', async (req, res) => {
  const { campaignName, profileName } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM profiles WHERE campaign_name = $1 AND name = $2',
      [campaignName, profileName]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err });
  }
});

// Update a profile
app.put('/campaigns/:campaignName/profiles/:profileName', async (req, res) => {
  const { campaignName, profileName } = req.params;
  const { stats, equipment, skills } = req.body;

  try {
    const result = await pool.query(
      'UPDATE profiles SET stats = $1, equipment = $2, skills = $3 WHERE campaign_name = $4 AND name = $5 RETURNING *',
      [stats, equipment, skills, campaignName, profileName]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', error: err });
  }
});

// Delete a profile
app.delete('/campaigns/:campaignName/profiles/:profileName', async (req, res) => {
  const { campaignName, profileName } = req.params;
  try {
    await pool.query('DELETE FROM profiles WHERE campaign_name = $1 AND name = $2', [campaignName, profileName]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: 'Error deleting profile', error: err });
  }
});

// Game Logs Endpoints (unchanged from before, assuming these are required)
app.post('/gamelogs', async (req, res) => {
  const { profile_id, entry } = req.body;
  const result = await pool.query(
    'INSERT INTO gamelogs (profile_id, entry) VALUES ($1, $2) RETURNING *',
    [profile_id, entry]
  );
  res.json(result.rows[0]);
});

app.get('/gamelogs/:profile_id', async (req, res) => {
  const { profile_id } = req.params;
  const result = await pool.query('SELECT * FROM gamelogs WHERE profile_id = $1', [profile_id]);
  res.json(result.rows);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
