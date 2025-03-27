# Start Backend
npm run dev

# Start Frontend
npm start

# Databases
## Log into Postgres (Password: 1234)
psql -h localhost -U postgres -d digital_score_stat_keeper
## List databses
\l
## List Tables in database
\dt
## show table structure
\d table_name
## exit terminal
\q

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
