# Github
git status // show status  
git checkout branchname // change branch  
## Pull from Github
git pull origin Code  
## Push to Github
git add .  
git commit -m "commit message"  
git push origin Code  

## Delete command when pulling from Github
git checkout -- frontend/node_modules/.cache/  

## Run Code
## Start Backend
npm run dev  
## Start Frontend
npm start  

# Database
## Log into Postgres (Password: 1234)
psql -h localhost -U postgres -d digital_score_stat_keeper  
## List databases
\l  
## List tables in database
\dt  
## Show table structure
\d table_name  
## Exit terminal
\q  

## Create table: profiles
CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  campaign_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  stats JSONB,
  equipment JSONB,
  skills JSONB,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE
);  

### Add new columns
ALTER TABLE profiles
ADD COLUMN discoveries TEXT[] DEFAULT '{}',
ADD COLUMN battles TEXT[] DEFAULT '{}',
ADD COLUMN notes TEXT[] DEFAULT '{}';  

### Remove the old columns that are no longer needed
ALTER TABLE profiles
DROP COLUMN name,
DROP COLUMN stats,
DROP COLUMN equipment,
DROP COLUMN skills;  

ALTER TABLE profiles
ADD COLUMN player_name VARCHAR(255),  -- Add player name
ADD COLUMN class VARCHAR(255),  -- Add class
ADD COLUMN race VARCHAR(255),  -- Add race
ADD COLUMN level INTEGER,  -- Add level
ADD COLUMN strength INTEGER,  -- Add Strength score
ADD COLUMN dexterity INTEGER,  -- Add Dexterity score
ADD COLUMN constitution INTEGER,  -- Add Constitution score
ADD COLUMN intelligence INTEGER,  -- Add Intelligence score
ADD COLUMN wisdom INTEGER,  -- Add Wisdom score
ADD COLUMN charisma INTEGER,  -- Add Charisma score
ADD COLUMN strength_modifier INTEGER,  -- Add Strength modifier
ADD COLUMN dexterity_modifier INTEGER,  -- Add Dexterity modifier
ADD COLUMN constitution_modifier INTEGER,  -- Add Constitution modifier
ADD COLUMN intelligence_modifier INTEGER,  -- Add Intelligence modifier
ADD COLUMN wisdom_modifier INTEGER,  -- Add Wisdom modifier
ADD COLUMN charisma_modifier INTEGER,  -- Add Charisma modifier
ADD COLUMN ac INTEGER,  -- Add Armor Class
ADD COLUMN initiative_modifier INTEGER,  -- Add Initiative Modifier
ADD COLUMN max_hp INTEGER,  -- Add Maximum HP
ADD COLUMN current_hp INTEGER,  -- Add Current HP
ADD COLUMN temporary_hp INTEGER,  -- Add Temporary HP
ADD COLUMN hit_dice VARCHAR(255),  -- Add Hit Dice
ADD COLUMN attack_rolls JSONB,  -- Add Attack Rolls as JSONB to store list of weapons/spells and attack modifiers
ADD COLUMN spellcasting JSONB,  -- Add Spellcasting Information as JSONB
ADD COLUMN proficiencies JSONB,  -- Add Proficiency Information as JSONB (tools, weapons, etc.)
ADD COLUMN languages TEXT[],  -- Add Languages as a list
ADD COLUMN equipment JSONB,  -- Equipment (can store as JSONB for flexibility)
ADD COLUMN weapons JSONB,  -- Weapons (similar to equipment)
ADD COLUMN armor VARCHAR(255),  -- Armor (store as text or JSONB)
ADD COLUMN adventuring_gear JSONB,  -- Adventuring gear (can be a JSONB array of items)
ADD COLUMN money JSONB,  -- Money (can store currency breakdown like {"gold": 10, "silver": 20})
ADD COLUMN magic_items JSONB,  -- Magic items (store details of magic items in JSONB)
ADD COLUMN skills JSONB,  -- Add Skills as JSONB to store details of skills with modifiers
ADD COLUMN background TEXT,  -- Background/Character backstory (optional, can store as text)
ADD COLUMN feats JSONB,  -- Feats or talents (can store as JSONB)
ADD COLUMN conditions JSONB,  -- Conditions (status effects like poisoned, stunned, etc.)
ADD COLUMN xp INTEGER;  -- Experience Points  

ALTER TABLE profiles
DROP COLUMN background,
DROP COLUMN feats,
DROP COLUMN conditions,
DROP COLUMN xp;  

ALTER TABLE profiles
RENAME COLUMN "player_name" TO "name";  


ALTER TABLE profiles
  ALTER COLUMN class SET DEFAULT '',
  ALTER COLUMN race SET DEFAULT '',
  ALTER COLUMN level SET DEFAULT 1,
  ALTER COLUMN strength SET DEFAULT 0,
  ALTER COLUMN dexterity SET DEFAULT 0,
  ALTER COLUMN constitution SET DEFAULT 0,
  ALTER COLUMN intelligence SET DEFAULT 0,
  ALTER COLUMN wisdom SET DEFAULT 0,
  ALTER COLUMN charisma SET DEFAULT 0,
  ALTER COLUMN strength_modifier SET DEFAULT 0,
  ALTER COLUMN dexterity_modifier SET DEFAULT 0,
  ALTER COLUMN constitution_modifier SET DEFAULT 0,
  ALTER COLUMN intelligence_modifier SET DEFAULT 0,
  ALTER COLUMN wisdom_modifier SET DEFAULT 0,
  ALTER COLUMN charisma_modifier SET DEFAULT 0,
  ALTER COLUMN ac SET DEFAULT 10,
  ALTER COLUMN initiative_modifier SET DEFAULT 0,
  ALTER COLUMN max_hp SET DEFAULT 10,
  ALTER COLUMN current_hp SET DEFAULT 10,
  ALTER COLUMN temporary_hp SET DEFAULT 0,
  ALTER COLUMN hit_dice SET DEFAULT '',
  ALTER COLUMN attack_rolls SET DEFAULT '{}'::jsonb,
  ALTER COLUMN spellcasting SET DEFAULT '{}'::jsonb,
  ALTER COLUMN proficiencies SET DEFAULT '{}'::jsonb,
  ALTER COLUMN languages SET DEFAULT '{}'::text[],
  ALTER COLUMN equipment SET DEFAULT '{}'::jsonb,
  ALTER COLUMN weapons SET DEFAULT '{}'::jsonb,
  ALTER COLUMN armor SET DEFAULT '',
  ALTER COLUMN adventuring_gear SET DEFAULT '{}'::jsonb,
  ALTER COLUMN money SET DEFAULT '{}'::jsonb,
  ALTER COLUMN magic_items SET DEFAULT '{}'::jsonb,
  ALTER COLUMN skills SET DEFAULT '{}'::jsonb;



-- Drop the existing JSONB columns
ALTER TABLE profiles
    DROP COLUMN attack_rolls,
    DROP COLUMN spellcasting,
    DROP COLUMN proficiencies,
    DROP COLUMN equipment,
    DROP COLUMN weapons,
    DROP COLUMN adventuring_gear,
    DROP COLUMN money,
    DROP COLUMN magic_items,
    DROP COLUMN skills;

-- Re-add the columns as TEXT[] with default '{}'
ALTER TABLE profiles
    ADD COLUMN attack_rolls TEXT[] DEFAULT '{}',
    ADD COLUMN spellcasting TEXT[] DEFAULT '{}',
    ADD COLUMN proficiencies TEXT[] DEFAULT '{}',
    ADD COLUMN equipment TEXT[] DEFAULT '{}',
    ADD COLUMN weapons TEXT[] DEFAULT '{}',
    ADD COLUMN adventuring_gear TEXT[] DEFAULT '{}',
    ADD COLUMN money TEXT[] DEFAULT '{}',
    ADD COLUMN magic_items TEXT[] DEFAULT '{}',
    ADD COLUMN skills TEXT[] DEFAULT '{}';



## Create table: gm_view profiles
CREATE TABLE gm_profiles (
  id SERIAL PRIMARY KEY,
  campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
  discoveries TEXT[] DEFAULT '{}',  -- Array to store Discoveries
  battles TEXT[] DEFAULT '{}',      -- Array to store Battles
  notes TEXT[] DEFAULT '{}'        -- Array to store Notes
);  
