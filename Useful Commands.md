#Start Backend
npm run dev

# Start Frontend
npm start

# Databases
Log into Postgres: psql -h localhost -U postgres -d digital_score_stat_keeper

## Create Table: Profiles
CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  campaign_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  stats JSONB,
  equipment JSONB,
  skills JSONB,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE
);
