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
app.post('/campaigns', async (req, res) => {
  const { name } = req.body;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');  // Start transaction

    // Create the campaign first
    const campaignResult = await client.query(
      'INSERT INTO campaigns (name) VALUES ($1) RETURNING *',
      [name]
    );
    const campaign = campaignResult.rows[0];  // Get campaign details

    // Insert the GM profile with default values
    const gmProfileResult = await client.query(
      'INSERT INTO gm_profiles (campaign_id, discoveries, battles, notes) VALUES ($1, $2, $3, $4) RETURNING *',
      [campaign.id, '{}', '{}', '{}']  // PostgreSQL array syntax
    );

    const gmProfile = gmProfileResult.rows[0];

    await client.query('COMMIT');  // Commit transaction
    res.json({
      campaign,
      gm_profile: gmProfile  // Send both campaign and GM profile
    });
  } catch (error) {
    await client.query('ROLLBACK');  // Rollback transaction on error
    console.error('Error creating campaign and GM profile:', error);
    res.status(500).json({ message: 'Error creating campaign and GM profile', error: error });
  } finally {
    client.release();
  }
});

// Get all campaigns
app.get('/campaigns', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM campaigns');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching campaigns', error: err });
  }
});

// Delete the campaign and related profiles
app.delete('/campaigns/:id', async (req, res) => {
  const { id } = req.params;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');  // Start transaction

    // Delete related profiles
    await client.query('DELETE FROM profiles WHERE campaign_id = $1', [id]);

    // Then delete the campaign
    await client.query('DELETE FROM campaigns WHERE id = $1', [id]);

    await client.query('COMMIT');  // Commit transaction

    res.sendStatus(204);  // No content, deletion successful
  } catch (error) {
    await client.query('ROLLBACK');  // Rollback transaction on error
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
    const result = await pool.query('UPDATE campaigns SET name = $1 WHERE id = $2 RETURNING *', [name, campaignId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.json(result.rows[0]);  // Return updated campaign data
  } catch (err) {
    res.status(500).json({ message: 'Error updating campaign', error: err });
  }
});

// Get a specific campaign by ID along with profiles and GM profile
app.get('/campaigns/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM campaigns WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    const profilesResult = await pool.query('SELECT * FROM profiles WHERE campaign_id = $1', [id]);
    const gmResult = await pool.query('SELECT * FROM gm_profiles WHERE campaign_id = $1', [id]);

    res.json({
      campaign: result.rows[0],
      profiles: profilesResult.rows,
      gm_profile: gmResult.rows[0] || null,
    });
  } catch (err) {
    console.error('Error fetching campaign and profiles:', err);
    res.status(500).json({ message: 'Error fetching campaign and profiles', error: err });
  }
});

// Disable ETag and set Cache-Control headers globally or for specific routes
app.set('etag', false);  // Disables ETag headers globally

// Function to disable caching headers for specific routes
const disableCacheHeaders = (res) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store',
    'ETag': ''  // Disable ETag
  });
};

// Campaigns Profiles Route
app.get('/campaigns/:id/profiles', async (req, res) => {
  const { id } = req.params;

  try {
    const profilesResult = await pool.query('SELECT * FROM profiles WHERE campaign_id = $1', [id]);

    // Disable caching for this response
    disableCacheHeaders(res);

    res.json(profilesResult.rows);
  } catch (err) {
    console.error('Error fetching profiles:', err);
    res.status(500).json({ message: 'Error fetching profiles', error: err });
  }
});

// Create a new profile for a specific campaign
app.post('/campaigns/:id/profiles', async (req, res) => {
  const { id } = req.params;
  const { name, stats, equipment, skills } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO profiles (campaign_id, name, stats, equipment, skills) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id, name, stats, equipment, skills]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error creating profile', error: err });
  }
});

// Delete a profile
app.delete('/campaigns/:campaignId/profiles/:profileId', async (req, res) => {
  const { campaignId, profileId } = req.params;

  try {
    await pool.query('DELETE FROM profiles WHERE campaign_id = $1 AND id = $2', [campaignId, profileId]);
    res.sendStatus(204);  // No Content
  } catch (err) {
    res.status(500).json({ message: 'Error deleting profile', error: err });
  }
});

// Game Logs Endpoints
// Get a specific profile within a campaign
app.get('/campaigns/:campaignId/profiles/:profileName', async (req, res) => {
  const { campaignId, profileName } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM profiles WHERE campaign_id = $1 AND name = $2',
      [campaignId, profileName]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Error fetching profile', error: err });
  }
});

// Get the GM profile and game log details for a specific campaign
app.get('/campaigns/:id/gamelog', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM gm_profiles WHERE campaign_id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'GM profile not found for this campaign' });
    }

    const gmProfile = result.rows[0];

    // Return the GM profile including discoveries, battles, and notes
    res.json({
      discoveries: gmProfile.discoveries,
      battles: gmProfile.battles,
      notes: gmProfile.notes,
    });
  } catch (err) {
    console.error('Error fetching GM profile game log:', err);
    res.status(500).json({ message: 'Error fetching GM profile game log', error: err });
  }
});

app.patch('/campaigns/:id/gamelog', async (req, res) => {
  const { id } = req.params;
  const { discoveries, battles, notes } = req.body;

  try {
    const result = await pool.query(
      `UPDATE gm_profiles 
       SET discoveries = $1, 
           battles = $2, 
           notes = $3 
       WHERE campaign_id = $4 
       RETURNING *`,
      [discoveries, battles, notes, id]  // No need to convert to string
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'GM profile not found for this campaign' });
    }

    res.json(result.rows[0]);  // Return updated GM profile
  } catch (err) {
    console.error('Error updating game log:', err);
    res.status(500).json({ message: 'Error updating game log', error: err });
  }
});
// Get a specific profile within a campaign from the profiles table
app.get('/campaigns/:campaignId/profiles/:profileId', async (req, res) => {
  const { campaignId, profileId } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM profiles WHERE campaign_id = $1 AND id = $2',
      [campaignId, profileId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(result.rows[0]);  // Return the profile
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Error fetching profile', error: err });
  }
});


app.get('/gamelogs/:profile_id', async (req, res) => {
  const { profile_id } = req.params;
  const result = await pool.query('SELECT * FROM gamelogs WHERE profile_id = $1', [profile_id]);
  res.json(result.rows);
});
app.patch('/campaigns/:campaignId/profiles/:profileId', async (req, res) => {
  const { campaignId, profileId } = req.params;
  const { name, stats, equipment, skills } = req.body;

  try {
    const result = await pool.query(
      `UPDATE profiles 
       SET name = COALESCE($1, name), 
           stats = COALESCE($2, stats), 
           equipment = COALESCE($3, equipment), 
           skills = COALESCE($4, skills) 
       WHERE campaign_id = $5 AND id = $6 
       RETURNING *`,
      [name, stats, equipment, skills, campaignId, profileId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(result.rows[0]);  // Return updated profile
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Error updating profile', error: err });
  }
});


// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
