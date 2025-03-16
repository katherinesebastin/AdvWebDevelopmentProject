# Project phase 1 - Definition and planning

## 1. User Personas

### 1: Game Master (GM) Alex
Age: 32  
Role: Game Master (GM)  
Experience Level: Experienced player and GM  
Goals:    
- Ensure smooth and balanced gameplay for all players.  
- Track and adjust player stats discreetly when necessary.  
- Maintain a dynamic and immersive game world with hidden clues and narrative twists.  
- Manage various game mechanics, including player abilities, NPC stats, and environmental conditions, in real-time.  
- Avoid gameplay disruptions caused by players losing track of their character stats or abilities.  

Frustrations:  
- Players often lose their character sheets, making it hard to track progress and stats.  
- Having to manually calculate or remember player stats or hidden information (e.g., NPC stats, secret clues).  
- Keeping track of complex, changing scenarios, like damage dealt over multiple rounds or long-term player conditions (poison, curses, etc.).    
- Losing narrative flow due to delays in gathering information.  

Needs:  
- A tool to override player stats quickly, without disrupting the game.  
- A system that allows adding hidden notes or clues that only the GM can view.  
- A game log that provides an easy access to history of events, changes to stats, and updates on character status.  
- Organized data for tracking multiple players' stats, abilities, and progress during the game.  
- A customizable interface to accommodate different styles of gameplay and house rules.    

### 2: Player Sam
Age: 25  
Role: Player  
Experience Level: Moderate experience, plays regularly but is not always familiar with every rule or detail.  
Goals:  
- Keep track of character stats (health, skills, inventory, etc.) accurately throughout the session.  
- Quickly update equipment, abilities, or any other changes as they occur during the game.  
- Ensure their character progress is well-documented and easy to access.  
- Focus on roleplaying without worrying about the technical side of the game.  

Frustrations:  
- Forgetting to update stats after gaining new items, spells, or abilities during the session.  
- Losing character progress due to updates not being logged correctly.  
- Difficulty navigating complex character sheets that require a lot of scrolling and manual input.  

Needs:  
- Editable stats with an intuitive interface for quick changes.  
- A simple UI that allows them to update stats during the game (e.g., adding equipment or changing health).  
- A shared game log to reference past decisions or changes.  
- A clear and organized character profile that doesn’t require excessive searching or management.     

### 3: New Player Jamie
Age: 18  
Role: Beginner Player  
Experience Level: New to TTRPGs, learning the rules and systems of the game.  
Goals:  
- Learn the mechanics of the game without feeling overwhelmed.  
- Keep track of their character's stats and progress in an easy-to-understand manner.  
- Focus on learning and participating without worrying about complicated calculations or sheet management.  
- Enjoy a seamless, fun experience where they can interact with others without frustration.  

Frustrations:  
- Feeling overwhelmed by the complexity of character sheets and game mechanics.  
- Difficulty understanding where to update certain stats or when to make changes.  
- Getting lost in rules or forgetfulness about which stats need to be tracked.  
- Confusion around navigating the digital tool, especially when things are not immediately clear.  

Needs:  
- A user-friendly interface that explains things step-by-step and provides clear guidance.  
- Easy-to-edit character profiles with large text and organized sections.  
- Tooltips or explanations for certain stats and features to help them learn as they play.  
- Prompted updates to remind them when to update specific stats (e.g., HP after damage).  
- Pre-made templates for character creation to streamline the learning process.    

### 4: Veteran Player Riley
Age: 29  
Role: Veteran Player  
Experience Level: Highly experienced, has played multiple systems, and often creates their own campaigns.  
Goals:  
- Track complex character builds and abilities that evolve over time.  
- Maintain a detailed record of their character's achievements, skills, and growth.  
- Customize and optimize their character’s stats during gameplay.
- Seamlessly integrate their personal character development with the larger game narrative.  
- Ensure quick, easy access to complex character information without clutter.  

Frustrations:  
- Standard character sheets do not provide enough flexibility for custom abilities or complex character builds.  
- Difficulty tracking detailed long-term progressions or changes (e.g., multi-stage quests, evolving abilities).  
- Overwhelmed by poorly organized digital tools that do not allow for customization.  
- Wants tools that support advanced features, but are not overly complicated to use during gameplay.  

Needs:  
- Customizable stats that allow for the inclusion of unique abilities, talents, or modifiers.  
- A complex character profile that can handle long-term development (e.g., evolving skills, personal goals).
- Advanced filters for tracking character progression across different campaigns.  
- A clean, minimalist interface that can handle detailed data without being overwhelming.  
- Quick access to important stats, abilities, or items in a streamlined format during gameplay.  

### 5: Supportive Sidekick Taylor
Age: 26  
Role: Support Character (NPC or Temporary Player)  
Experience Level: Beginner to intermediate, mostly plays supporting roles in campaigns.  
Goals:  
- Track support stats for NPC characters or temporary players who assist the main party.  
- Help other players by providing healing, buffs, or additional gameplay mechanics without managing their own full character sheet.  
- Maintain an overview of their role and resources in a collaborative manner without deep complexity.  
- Ensure the supporting character’s abilities and resources are accessible but not overly complex.  

Frustrations:  
- Support roles often feel neglected or underrepresented in traditional character sheets.  
- Difficulty in tracking limited-use abilities (e.g., spells, items) that regenerate over time.  
- Finds it hard to keep up with the main players, especially when managing multiple NPCs or temporary roles.  

Needs:  
- Simplified NPC character profiles that allow for easy tracking of support abilities and resources.  
- Quick update system for limited-use abilities, such as healing potions, spells, or buffs.  
- A way to easily switch between NPCs or side characters in a single campaign, keeping the primary characters at the forefront without confusion.  
- Collaborative features, allowing the GM to quickly update NPC stats or abilities when necessary.  
- Minimalistic stat tracking that doesn’t require detailed input but still provides accurate gameplay results.    

## 2. Use Cases and User Flows

### 1: Create a Player Profile
User: Any player (New Player Jamie, Player Sam, or Veteran Player Riley)  
Trigger: User clicks the "Create Profile" button.  
Process:  
- The user is prompted with a form that requests the following details: character name, health points (HP), skills, abilities, items, and any other relevant attributes for the character.  
- The tool auto-generates default values for missing information where applicable (e.g., default HP or skill levels).  
- The user can customize these values based on their character concept.  
- Once the form is filled, the player clicks "Save," and the profile is stored in the system, ready for gameplay.  

Outcome:  
- The player’s character profile is saved and accessible at any time for updates or gameplay.  
- The character’s profile is properly organized and ready for the next game session.  

### 2: Edit Player Stats
User: Any player (Player Sam, New Player Jamie, or Veteran Player Riley)  
Trigger: User clicks the "Edit Stats" button.  
Process:  
- The player clicks the "Edit Stats" button on their character profile.  
- A form appears that allows them to modify key stats, including HP, equipment, skills, abilities, and inventory.  
- The player adjusts values as needed (e.g., updating HP after a battle, adding new items, or changing the level of a skill).  
- Once the edits are made, the player clicks "Save," and the changes are automatically logged in the game log.  

Outcome:  
- The player’s stats are updated in real-time, reflecting changes made during the session.  
- The game log captures the updates, providing a history of changes.  

### 3: Override Stats (GM Control)
User: Game Master (GM Alex)  
Trigger: GM clicks the "Override Stats" button.  
Process:  
- The GM selects the player or NPC whose stats they want to modify.  
- The GM clicks the "Override Stats" button, which brings up a special override menu that allows them to modify any aspect of the selected character’s stats, including HP, skills, and abilities.  
- The GM can enter new values or make temporary changes (e.g., for a narrative reason, such as a character being cursed or blessed).  
- Once the changes are made, the GM clicks "Save," and the changes are applied instantly.  
- The tool logs these changes as an "override" and marks them as visible only to the GM or permitted users.  

Outcome:  
- The GM has full control over player and NPC stats for narrative or gameplay purposes.  
- Changes are recorded with a clear log of what was modified, ensuring transparency for future reference.  

### 4: Game Log Update
User: Any player or GM  
Trigger: User adds a note to the game log.  
Process:  
- The user (either a player or GM) clicks the "Add Note" button in the game log section.  
- A text field appears, allowing the user to enter a note about the game session (e.g., "Sam’s character gained a new skill," "Alex’s NPC gave a cryptic clue").  
- The user submits the note, and it is automatically logged with a timestamp.  
- The note is visible to all users who have access to the game log (players and/or the GM, depending on permissions).  

Outcome:  
- The game log is updated, with notes serving as an organized record of the game’s progress and important events.  
- All players and the GM have easy access to a detailed game history for reference.  

### 5: View Character Profiles (Multiplayer Mode - Optional)
User: Any player (Player Sam, Veteran Player Riley)  
Trigger: User selects a character profile to view in multiplayer mode.  
Process:  
- The user navigates to the "Player Profiles" section.  
- The user selects another player’s profile to view (if permissions allow).  
- The system displays the profile with visible details such as HP, skills, and inventory, but without edit permissions (unless the user is the GM).  
- The user can view any public notes or log entries associated with that character, but cannot modify the profile.  

Outcome:  
- Players can view each other’s character progress and important stats.  
- The system ensures that profiles are read-only unless the GM grants additional permissions.  

### Summary of Use Cases and Scenarios:
- Create a Player Profile: Players create their character profiles, inputting vital stats and abilities.  
- Edit Player Stats: Players update their stats during gameplay, keeping their profiles up-to-date.  
- Override Stats (GM Control): GMs adjust player or NPC stats for narrative reasons, with clear log tracking.  
- Game Log Update: Any player or GM adds events or changes to the game log, capturing key moments of the session.  
- View Character Profiles (Multiplayer Mode - Optional): Players can view the profiles of others (read-only), enhancing multiplayer cooperation and strategy.  

## 3. UI Prototypes

Add something

## 4. Information Architecture and Technical Design

Add something

## 5. Project Management and User Testing

Add something
