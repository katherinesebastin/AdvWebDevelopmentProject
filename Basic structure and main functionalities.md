# Project phase 2 - Basic structure and main functionalities

In this phase, we focused on creating the main structure, features and functionalities of the TTRPG project.  

## 1. Environment

We set up the project environment using a local virtual machine (VM) running Linux.  

## 2. Backend

For the backend, we used Node.js and Express.js. Express is a framework that helps handle requests from the frontend. It allows us to create routes for different actions, like adding or deleting campaigns, managing player profiles, and keeping track of game logs. The backend is divided into several parts to make it easy to manage:  
- **Routes:** These are the paths the app uses to perform different tasks. For example, when we want to get a list of campaigns, we use a route like /campaigns. If we want to update or delete a campaign, there are specific routes for that too.  
- **Controllers:** They handle the logic behind each route. For example, when a route is triggered (like deleting a campaign), the controller manages what should happen, like removing the campaign from the database.  
- **Models:** These define how the data is stored in the PostgreSQL database. For example, we have a Campaign model that defines the campaign’s name and description. The PlayerProfile model holds information about players like health, stamina, and equipment.  
- **Database Connection:** We used PostgreSQL to store all the app’s data. PostgreSQL is a relational database, which means it uses tables to store related data. We store campaigns, player profiles, and game logs in separate tables, and the backend uses queries to interact with the database.  
The frontend and backend communicate through API calls. The frontend sends requests to the backend (like adding a new campaign), and the backend responds with the requested data or confirms the action.  

## 3. Frontend

The frontend is built with React.js. React helps create interactive UIs by breaking down the interface into smaller, reusable components. The key components are:  
- **App Component:** This is the main part of the app that holds everything together. It displays other components, such as the campaign list, player profiles, and game logs.  
- **CampaignList:** This component shows all the campaigns available. Users can interact with it to add, update, or delete campaigns.  
- **PlayerProfile:** This is where players can view and edit their profiles. They can update their health, stamina, and equipment.  
- **GameLog:** This shows the game log for each campaign. Both players and Game Masters can add entries to keep track of the campaign’s progress.  
In React, we use state to manage data. When something changes (for example, adding a new campaign), React automatically updates the UI so everything stays without reloading the page.  

## 4. Database

We used PostgreSQL as our database because it is reliable and works well for storing related data in different tables.  
- **Campaigns Table:** This table stores all the information about the campaigns, like the name, description, and ID of each campaign.  
- **PlayerProfiles Table:** This stores details about players, such as their health, stamina, stats, and equipment.  
- **GameLogs Table:** This table keeps track of the game logs for each campaign, noting down the events that happen during the game.   
The backend uses SQL queries to interact with the database. This allows us to add, retrieve, update, and delete data as needed.   

## 5. Basic structure and architecture

The app is separated into three main parts:  
- **Model:** This handles the data and how it is stored in the database. Each model defines the structure of the data, like how a campaign or player profile should look.  
- **View:** The view is made up of the React components, which are the parts of the app that users interact with, such as the campaign list or player profiles.  
- **Controller:** The controller handles the logic of the app. It connects the model (data) to the view (UI) and makes sure everything works correctly.  
The structure helps organize the app and makes it easier to update or fix things when needed.  

## 6. Functionalities

The main features the app are:  
- **Campaign Management:** Users can see all the campaigns, and they can also add, edit, or delete campaigns. This helps Game Masters keep track of their different campaigns.  
- **Player Profile Management:** Players can view and update their profiles. They can change their stats (like health or stamina) and keep track of their equipment.  
- **Game Log Entries:** Both players and Game Masters can add log entries to keep track of the game’s progress. These logs are important to record events during the campaign.    
We made sure all these features were properly defined and work as expected.   

## 7. Code quality and documentation

- **Backend:** The backend is split into routes, controllers, and models, which makes it easy to manage and update in the future.  
- **Frontend:** The React components are organized so it’s easy to add new features or make changes.  
- **Documentation:** We added comments in the code to explain how each part works. This makes it easier for anyone working on the project to understand the code.  
By organizing the code this way, we make sure it’s simple to work with and maintain.    

## 8. Testing and error handling

We made sure the app works properly by doing different types of testing and adding error handling:  
- **Unit Tests:** We tested individual backend functions to make sure each one works correctly. For example, we tested adding a campaign to ensure the backend processes it properly.  
- **Integration Tests:** These tests check that the backend and database work well together. For example, we made sure that when a new campaign is added, it’s correctly saved to the database.  
- **End-to-End Tests:** These tests check the entire app, from start to finish, to make sure everything works together as expected.  
- **Error Handling:** We added error handling to prevent the app from crashing. If something goes wrong, the user will see an error message instead of the app just stopping. On the backend, we use try-catch blocks to handle errors, and on the frontend, we show helpful error messages to the user.  

## 9. User interface and interaction

The user interface is simple and easy to use:  
- The design is clean, with sections clearly separated so users can easily find what they’re looking for.  
- The app works well on desktop and laptop screens.  
- Interactive features, like inline editing, let users change campaign names and player details without refreshing the page.  
- We used CSS to style the app and make it look nice. The design is consistent throughout, and everything is easy to read and navigate.  
The goal was to make sure the app is user-friendly and works well for everyone, whether they’re adding a new campaign or updating their player profile.   
