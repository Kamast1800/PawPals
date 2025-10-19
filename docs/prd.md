
Product Requirements Document (PRD)
Project Title: Paw Pals
Description:
PawPals is a mobile application designed to help dog owners find safe, compatible playmates for their pets. The app allows users to create detailed dog profiles, browse nearby matches, and coordinate playdates with other owners. It focuses on fostering friendly, responsible connections between owners while ensuring ease of use and privacy. The app prioritizes matching, chatting/scheduling and reviews, while upholding verification for integrity.
Based on client discussions and feedback, PawPals will be developed as a mobile-only application. It emphasizes simple navigation, matching algorithms based on breed, energy level, and size, and post-playdate review functionality to promote trust and accountability.PawPals will stand as a companion finder for those wanting to expand their horizons with their pet, within a verified and safe application.
Scope:
Based on the analysts level 1 specification, paw pals will include:
The PawPals mobile application will include the following features and functionality:
User Accounts & Profiles- Users can create an account, log in securely, and build a detailed dog profile (including breed, age, size, and energy level).
Matching System- The app will use geolocation and profile data to suggest compatible playmates nearby.
Chat & Playdate Scheduling- Users can message other owners directly through the app to coordinate playdates and confirm or decline requests.
Ratings & Reviews- After a playdate, users can leave feedback and rate other owners to promote trust and accountability.
Verification & Privacy- Basic verification steps will be implemented to maintain user safety and data privacy.
Mobile-Only Access-The app will be optimized for Android and iOS mobile devices, using responsive design for smaller screens.
Out of Scope:
Desktop or web version of the app  
In-app payments or premium subscriptions 
Offline functionality (internet connection required) 
 Integration with third-party social media or calendar apps  
Advanced analytics or AI-based recommendations  
Technical Architecture:
Frontend (Client):
React (PWA, mobile-first design)
React Router for navigation
Deployed via AWS Amplify
Backend (API Layer):
Express.js REST API (Node.js)
Serves as a single gateway for all data operations
Handles authentication, validation, and routing
Organizes CRUD endpoints by feature area (e.g., /Dog Profiles, /Reviews & Ratings, /Messaging) 
Middleware for logging, error handling, and request validation
All CRUD operations go through the API - students must not call supabase directly from the frontend
	Database and Authentication:
Supabase (postgres-based) for:
Data persistence
Authentication (email/password)
API connects to Supabase using Supabase client or pg driver under the hood
	Deployment Strategy:
Frontend: AWS Amplify (continuous deployment from GitHub)
API layer: Deployed as serverless function
AWS Lambda (preferred) - Express wrapped with serverless-http
Database: Managed directly in Supabase cloud instance
Development Tools: 
GitHub for version control and collaboration
Windsurf IDE for coding environment
Trello for task management
Slack for team communication
	Key Considerations:
Separation of concerns: Clear distinction between frontend (UI), API (business logic), and DB (persistence). 
Environmental Variables: API keys stored in .env (never committed).
Scalability: Architecture is overkill for a class project, but reflects industry practices. 
