# Project phase 1 - Definition and planning

## 1. User Personas

### 1: Game Master (GM) Alex
Age: 32  
Role: Game Master (GM)  
Experience Level: Experienced player and GM  
Goals:    
- Ensure smooth and balanced gameplay for all players.  
- Track and adjust player stats discreetly when necessary.  
- Create an engaging game world with clues and plot twists.  
- Manage various game mechanics, including player abilities, NPC stats, and environmental conditions, in real-time.  
- Avoid gameplay disruptions caused by players losing track of their character stats or abilities.  

Frustrations:  
- Players often lose their character sheets, making it hard to track progress and stats.  
- Having to manually calculate or remember player stats or hidden information (e.g., NPC stats, secret clues).  
- Keeping track of complex, changing scenarios over long periods.  
- Losing narrative flow due to delays in gathering information.  

Needs:  
- A tool to override player stats quickly, without disrupting the game.  
- A system that allows adding hidden notes or clues that only the GM can view.  
- A game log that provides an easy access to history of events, changes to stats, and updates on character status.  
- Organized data for tracking multiple player's stats, abilities, and progress during the game.  
- A customizable interface for different game styles.     

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
- An organized character profile that’s easy to navigate.       

### 3: New Player Jamie
Age: 18  
Role: Beginner Player  
Experience Level: New to TTRPGs, learning the rules and systems of the game.  
Goals:  
- Learn the mechanics of the game without feeling overwhelmed.  
- Keep track of their character's stats and progress in an easy-to-understand manner.  
- Focus on learning and participating without worrying about complicated calculations or sheet management.  
- Enjoy a fun experience where they can interact with others without frustration.    

Frustrations:  
- Feeling overwhelmed by the complexity of character sheets and game mechanics.  
- Difficulty understanding where to update certain stats or when to make changes.  
- Getting lost in rules or forgetfulness about which stats need to be tracked.  
- Confusion around navigating the digital tool, especially when things are not immediately clear.  

Needs:  
- A user-friendly interface that explains things step-by-step and provides clear guidance.  
- Easy-to-edit character profiles with large text and organized sections.  
- Tooltips or explanations for certain stats and features to help them learn as they play.  
- Prompted updates to remind them when to update specifi c stats (e.g., HP after damage).  
- Ready-made templates for character creation to streamline the learning process.    

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
- Difficulty tracking detailed long-term progressions or changes (e.g., evolving abilities).  
- Overwhelmed by poorly organized digital tools that do not allow for customization.  
- Wants tools that support advanced features, but are not overly complicated to use during gameplay.  

Needs:  
- Customizable stats for unique abilities, talents, or modifiers.  
- A complex character profile that can handle long-term development (e.g., evolving skills, personal goals).
- Advanced filters for tracking character progression across different campaigns.  
- A clean, minimalist interface that can handle detailed data without being overwhelming.  
- Quick access to important stats, abilities, or items in a streamlined format during gameplay.  

### 5: Supportive Sidekick Taylor
Age: 26  
Role: Support Character (NPC or Temporary Player)  
Experience Level: Beginner to intermediate, mostly plays supporting roles in campaigns.  
Goals:  
- Track support stats for NPC characters or temporary players.  
- Help other players by providing healing, buffs, or additional gameplay mechanics without managing their own full character sheet.  
- Keep their role simple and clear.  
- Ensure the supporting character’s abilities and resources are accessible but not overly complex.  

Frustrations:  
- Support roles often feel neglected or underrepresented in traditional character sheets.  
- Difficulty in tracking limited-use abilities (e.g., spells, items) that refresh over time.  
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
- A form appears asking for details like character name, health points (HP), skills, abilities, items, etc.  
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
- Changes are recorded with a clear log of what was modified for future reference.  

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

### 5: View Character Profiles
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

## 3. UI Prototypes

Add something

## 4. Information Architecture and Technical Design

### Information Architecture

#### 1. Hierarchical Structure
1.	**Dashboard (Home Screen):**  
- Overview of active game session  
- Quick access to Player Profiles, Game Logs, and Inventory  
- Recent Game Activity

2.	**Player Profile:**  
- Character Stats (HP, Skills, Abilities, Equipment)
- Edit Stats  
- Activity Log (updates on stats changes)  

3.	**Game Log:**  
- Game Log Entries  
- Add new notes (visible to GM or all players)  
- Log History with timestamps  

#### 2. Information Flow & Relationships
1.	**Player Profile Creation:**  
- Create Profile Screen: New players enter basic details (name, HP, skills, items).  
- Save Profile: Data is stored in the database, accessible through the user’s dashboard.  

2.	**Updating Player Stats:**  
- Edit Stats Screen: Players can modify their stats in real-time, updating the database.
- Save Changes: Each change triggers an automatic log entry.  

3.	**Game Log Interaction:**  
- Players and GMs can add notes to the Game Log.  
- Notes are timestamped and logged in a dedicated section.  

#### 3. User Permissions and Access Control
1.	**Game Master (GM):**  
- Full control over Player Profiles: Ability to view, edit, and override stats.
- Can view and edit all Game Log Entries.  
- Can modify Game Settings to control gameplay rules.  

2.	**Player:**  
- Can view and edit their own Player Profile.  
- Can view their Game Log.  
- Cannot override stats or change other players' profiles.  

### Technical Design

#### 1. System Architecture
**Frontend:**  
- Framework: React.js for the user interface.  
- Styling: CSS (SCSS) with a CSS-in-JS approach using Styled Components.  
- State Management: Redux or React Context API for managing application state, especially for user data, profile, and game state.  
**Backend:**  
- Server: Node.js with Express for handling HTTP requests.  
- Database: PostgreSQL for storing user profiles, game logs, and session data.  
**API:**  
1.	RESTful API for client-server communication. The API will allow the frontend to:  
- Create and update profiles  
- Add and view game logs  

#### 2. Security Considerations
- Authorization: Ensure role-based access control (RBAC) where only the GM can override stats or change game settings.  
- Data Validation: Sanitize and validate all input data to avoid malicious attacks like SQL injection or XSS.  

#### 3. Scalability and Performance Considerations
- Database Optimization: Use indexes in PostgreSQL for quick access to frequently queried data (e.g., player profiles, game logs).  
- Caching: Use Redis to cache frequently requested data (e.g., player profiles) to reduce database load.  
- Load Balancing: Implement horizontal scaling for the backend API to handle a large number of concurrent users.  

#### 4. Testing Strategy
- Unit Testing: Use Jest for unit testing the backend logic (game log creation, stat updates).
- End-to-End (E2E) Testing: Use Cypress for testing the user interface and flow, ensuring that profile creation, stat updates, and sharing functions work correctly.  
- Load Testing: Use tools like Artillery or JMeter to simulate multiple users interacting with the game simultaneously.  

## 5. Project Management and User Testing

### Project Management

#### 1. Project Scope
The Digital Score & Stat Keeper is designed to help players and Game Masters (GMs) manage character stats, game logs, and player profiles for tabletop role-playing games (TTRPGs). The core features of the application include:  
-	Player Profile Management (creation, editing, viewing)  
-	Game Log Updates (timestamped entries, visibility settings)  
-	Player Stats (tracking HP, skills, items)  
-	GM Tools (ability to override player stats and manage game settings)  

#### 2. Timeline and Phases
The project will be developed over a period of  7 weeks, divided into 4 sprints. Each sprint will be 1.5 weeks long, with a 1-week buffer for final adjustments, bug fixes, and user testing. The following is a breakdown of key activities and deliverables:  
**Phase 1: Planning & Design (Week 1 - Week 1.5)**  
-	Requirements Gathering: Understand user needs through personas and use cases.  
-	Information Architecture: Define the tool’s structure and data flow.  
-	UI/UX Design: Develop wireframes, mockups, and prototypes for the app.  
-	Technical Design: Set up the database schema and API structure.  
**Phase 2: Development - Core Features (Week 1.5 - Week 3)**  
-	Frontend Development: Build the React-based interface.  
-	Backend Development: Set up the Node.js with Express backend and PostgreSQL database.  
-	Game Log & Stats: Implement the ability to update and view player stats and game logs.  
-	Profile Creation: Implement profile creation, and editing.  
**Phase 3: Development - Advanced Features (Week 3 - Week 4.5)**  
-	GM Tools: Implement GM’s ability to override player stats and manage game settings.  
**Phase 4: Testing & Refinement (Week 4.5 - Week 7)**  
-	User Testing: Conduct usability tests with real users.  
-	Bug Fixes and Optimization: Address bugs, improve performance, and optimize code.  
-	Final Deliverables: Prepare for deployment, final user feedback, and documentation.  

#### 3. Task Management and Team Collaboration
The project will involve regular meetings to review progress and discuss obstacles, either in person or via WhatsApp.  
**Roles & Responsibilities (Shared by Two People):**  
-	Project Manager: Oversees project timelines, budget, and task allocation.  
-	Frontend Developer: Builds the user interface using React.  
-	Backend Developer: Sets up the Node.js server and manages the database.  
-	Designer: Designs UI/UX, wireframes, and prototypes.  
-	QA Tester: Ensures the application meets quality standards through testing.  
-	Game Master & Player Testers: Provide feedback on the tool’s usability.  
**Sprint Reviews:**  
-	At the end of each sprint, the team will review the work done and discuss adjustments based on feedback after testing.  

#### 4. Risk Management
Key risks identified and mitigation strategies:  
-	Risk: Feature Creep (Additional features requested during development)  
  - Mitigation: Define the core features clearly in the project scope and focus on delivering them first.  
-	Risk: Technical Challenges (Backend issues or integrations not working as expected)  
  - Mitigation: Early prototyping and testing to identify issues early in the development.  
-	Risk: Delays in Testing (Limited time for testing before the release)  
  - Mitigation: Allocate time for iterative testing during each sprint, with final user testing in Phase 4.  

### User Testing 

#### 1. Testing Goals
-	Usability Testing: Ensure the user interface is intuitive and easy to navigate.  
-	Functionality Testing: Confirm that all features (profile creation, stat updates, game log entries) work as intended.  
-	Performance Testing: Ensure the tool works smoothly with multiple players and game logs.  

#### 2. Testing Methods
**Usability Testing:**  
-	Objective: Evaluate the ease of use and intuitiveness of the interface.  
-	Testers: Players (including new and experienced) and GMs.  
-	Method: Observational testing where users complete common tasks (e.g., creating a profile, editing stats, viewing game logs).  
-	Success Metrics: Time to complete tasks, number of errors, user satisfaction ratings.  
**Functionality Testing:**  
-	Objective: Ensure core features work as expected (profile management, stat updates, game log additions).  
-	Testers: Developers and QA.  
-	Method: Test cases covering all features (e.g., editing player stats, adding notes to game logs).  
-	Success Metrics: All features should function without crashes or errors, and data should be stored accurately.  
**Performance Testing:**  
-	Objective: Validate that the application works smoothly under load.  
-	Testers: Simulated users (using tools like JMeter).  
-	Method: Simulate multiple users accessing and updating profiles and game logs simultaneously.  
-	Success Metrics: No performance degradation, response times within acceptable ranges.  
**Security Testing:**  
-	Objective: Ensure the application is secure, with no vulnerabilities.  
-	Testers: Security specialists or penetration testers.  
-	Method: Conduct common security tests such as SQL injection, cross-site scripting (XSS), and data encryption checks.  
-	Success Metrics: No vulnerabilities or exploits found, user data remains secure.  

### 3. Test Scenarios
**Scenario 1: Player Profile Creation and Editing**  
-	Test Objective: Verify that a user can create a profile, edit it, and the changes are saved correctly.  
-	Steps:  
 1.	User clicks "Create Profile".  
 2.	User inputs character details and saves.  
 3.	User later edits the profile and updates the stats.  
 4.	Verify changes are reflected in the profile.  
-	Expected Outcome: The profile is created, and edits are saved successfully without errors.

**Scenario 2: Game Log Updates**  
-	Test Objective: Ensure that users can add and view game logs accurately.  
-	Steps:  
 1.	User adds a new log entry.  
 2.	Log is timestamped and saved.  
 3.	Verify that the log is visible in the game log section.  
-	Expected Outcome: Logs are correctly saved and displayed to all relevant users.  

**Scenario 3: GM Overrides Player Stats**  
-	Test Objective: Validate that the GM can override player stats and the changes are logged.  
-	Steps:  
 1.	GM clicks "Override Stats" for a player.  
 2.	GM modifies stats (e.g., HP, skills).  
 3.	Verify the new stats are reflected and visible to the player.  
-	Expected Outcome: Stats are successfully overridden, and the action is logged.  

### 4. User Feedback and Iteration  
After each round of testing, feedback will be collected. This feedback will guide further refinement of the tool. User satisfaction and usability scores will be tracked to identify pain points or areas of improvement.  

### 5. Reporting and Documentation  
A final User Testing Report will be generated that includes:  
-	Test Results: Summary of test cases, results, and success metrics.  
-	Issues Identified: List of bugs, usability issues, and security vulnerabilities.  
-	Recommendations: Suggested changes based on feedback and test results.  
-	Action Plan: Outline of next steps to address issues and optimize the product.  
