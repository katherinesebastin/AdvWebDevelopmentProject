# Project phase 2 - Basic structure and main functionalities

In this phase, we focused on creating the main structure, features and functionalities of the TTRPG project.  

## 1. Environment

Add something

## 2. Backend

The backend of the application is built using **Node.js** and **Express.js**. Express is a framework that helps us handle requests from the frontend. It allows us to create routes for different tasks like managing campaigns, player profiles, and game logs.  
We organized the backend into:  
- **Routes**: These are like paths for handling different requests, such as adding or deleting campaigns.  
- **Controllers**: These handle the logic for what happens when a route is called, like saving or getting data from the database.  
- **Models**: These define how data is structured and stored in the database.  
- **Database Connection**: The backend connects to PostgreSQL, a database where we store data like campaign details and player profiles.  
The backend talks to the frontend through API calls. These calls allow the frontend to get and send data to the backend.  

## 3. Frontend

The frontend is made with **React.js**. React is great for creating interactive websites. It uses components to build the UI, where each part of the website is a separate piece of code that can be reused.  
For example:  
- The App Component is the main part of the website that shows the other components.  
- The CampaignList shows all the campaigns and allows users to interact with them (like adding or deleting campaigns).  
- The PlayerProfile lets players view and update their profile.  
- The GameLog shows all the logs for a campaign.  
React also uses state to manage the data and update the UI when something changes, making sure everything is up-to-date.  

## 4. Database

We chose PostgreSQL to store data. It's a relational database, meaning we store related data in different tables. For example, we have:  
- **Campaigns**: Stores information about each campaign, like the name and description.  
- **PlayerProfiles**: Stores details about players, such as their stats, health, and equipment.  
- **GameLogs**: Stores the game logs for campaigns.  
The backend talks to the database and uses queries to get and store data.  

## 5. Basic structure and architecture

The structure of the app separates the code into three parts:  
- **Model**: Manages the data and how it's stored in the database.  
- **View**: The frontend React components that users interact with.  
- **Controller**: Handles the logic and connects the model and view.  
The app makes sure that things like loading data from the backend happens smoothly. The code is organized in a way that makes it easy to find and fix things.  

## 6. Functionalities

Here’s what the app can do:  
- **Campaign Management**: Users can see a list of campaigns, and each campaign can be modified or deleted. New campaigns can also be added.
- **Player Profile Management**: Players can see and update their profiles, including stats like health and stamina. They can also add game log entries.  
- **Game Log Entrie**s: Both players and Game Masters can add logs to track the campaign's progress.  
We made sure all the main features were well-defined and worked correctly.  

## 7. Code quality and documentation

The code is written in a clean and organized way:    
- The backend is split into models, controllers, and routes, which makes it easy to maintain.  
- React components are made so they’re easy to work with and update.  
- We made sure to document everything properly, with comments explaining what each part of the code does.  

## 8. Testing and error handling

We made sure to test the app thoroughly:  
- **Unit Tests**: We tested individual backend functions to make sure they work as expected.  
- **Integration Tests**: We checked that the backend and database work well together.  
- **End-to-End Tests**: We tested the whole app, from creating campaigns to adding game logs, to make sure everything works smoothly.  
We also added error handling throughout the app. If something goes wrong, the user gets a clear message instead of the app crashing. On the backend, we use try-catch to catch errors, and on the frontend, we show helpful error messages.

## 9. User interface and interaction

The user interface is clean and easy to use. We designed it so that:  
- The layout is simple and each section is easy to find.   
- The app works well on desktop and laptop.  
- Interactive features like inline editing make the app more engaging.  
We used CSS to make the design look nice and consistent. Buttons, forms, and lists are styled in a way that makes the app pleasant to use.  
