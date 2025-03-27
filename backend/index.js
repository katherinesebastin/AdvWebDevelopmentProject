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
app.post('/campaigns', async (req, res) => {
  const { name } = req.body;
  const result = await pool.query('INSERT INTO campaigns (name) VALUES ($1) RETURNING *', [name]);
  res.json(result.rows[0]);
});

app.get('/campaigns', async (req, res) => {
  const result = await pool.query('SELECT * FROM campaigns');
  res.json(result.rows);
});

app.delete('/campaigns/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM campaigns WHERE id = $1', [id]);
  res.sendStatus(204);
});

// PATCH endpoint to update campaign name
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

// Player Profiles Endpoints
app.post('/profiles', async (req, res) => {
  const { campaign_id, name, stats, equipment, skills } = req.body;
  const result = await pool.query(
    'INSERT INTO profiles (campaign_id, name, stats, equipment, skills) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [campaign_id, name, stats, equipment, skills]
  );
  res.json(result.rows[0]);
});

app.get('/profiles/:campaign_id', async (req, res) => {
  const { campaign_id } = req.params;
  const result = await pool.query('SELECT * FROM profiles WHERE campaign_id = $1', [campaign_id]);
  res.json(result.rows);
});

app.put('/profiles/:id', async (req, res) => {
  const { id } = req.params;
  const { stats, equipment, skills } = req.body;
  const result = await pool.query(
    'UPDATE profiles SET stats = $1, equipment = $2, skills = $3 WHERE id = $4 RETURNING *',
    [stats, equipment, skills, id]
  );
  res.json(result.rows[0]);
});

app.delete('/profiles/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM profiles WHERE id = $1', [id]);
  res.sendStatus(204);
});

// Game Logs Endpoints
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
