Task List:
Epic: Discover & Match
User Story: As a dog owner, I want to browse other dogs nearby so that I can find compatible play partners.  
Task: Implement a matching feature that uses geolocation and compatibility filters to display nearby dogs.  
Acceptance Criteria:
User can enable or deny location access on first use.
The app displays nearby dog profiles filtered by distance and energy level.
Match cards show dog name, photo, and summary.
User can swipe or tap to view a full profile or skip a match.
Epic: Profile & Setup
User Story: As a dog owner, I want to create a dog profile so that I can introduce my pet to potential playmates.  
Task: Build a profile creation form that saves user input to the database and displays it on their public profile.  
Acceptance Criteria:
 Form includes name, breed, age, size, and energy level fields.
 Profile data saves successfully to Firestore/Supabase and reloads after login.
 User can update or delete their profile at any time.
 Profile image upload and preview functionality work correctly.
Epic: Playdate Scheduling
User Story: As a user, I want to chat with another owner to schedule a playdate so that we can coordinate easily.  
Task: Develop an in-app chat system that supports real-time messaging between matched users.  
Acceptance Criteria:
 Messages appear in real time without refreshing.
 Each chat includes timestamps and sender indicators.
 Users can send text messages and see “message sent” confirmation.
 Users can access previous chat history.
User Story: As a user, I want to confirm or decline playdate requests so that I can manage my schedule.  
Task: Add playdate request and confirmation features integrated with chat.  
Acceptance Criteria:
Users can send playdate requests with a date and location.
Recipients can confirm or decline the request.
Confirmed playdates appear in a simple “My Schedule” view.
Notifications are sent when a request is confirmed or declined.
Epic: Reviews & Ratings
User Story:As a user, I want to view ratings on profiles so that I can identify trustworthy owners.  
Task: Display star ratings and written reviews on each profile page.  
Acceptance Criteria:
Average rating calculated automatically from all reviews.
Profile page shows a list of recent reviews (newest first).
Star icons correctly represent numerical ratings.

User Story: As a user, I want to leave a review after a playdate so that I can share feedback about the experience.  
Task: Create a post-playdate review form.  
Acceptance Criteria:
User can submit one review per completed playdate.
Review includes star rating and comment text.
Review data saves to Firestore/Supabase and updates the average rating immediately.
Epic: Account Management
User Story: As a user, I want to log in securely so that my data and messages are protected.  
Task: Implement Firebase or Supabase Authentication for secure account access.  
Acceptance Criteria:
Login and signup use encrypted credentials.
Invalid credentials show a user-friendly error message.
Users remain logged in until they choose to log out.
Session tokens refresh automatically for returning users.
Epic: Contacting & Messaging
User Story: As a user, I want to contact matches so that I can communicate with them later.  
Task: Enable users to start new conversations directly from the match screen.  
Acceptance Criteria:
Each match card includes a “Message” button.
Tapping “Message” opens a chat thread with that user.
Conversation history persists across sessions.
Users can delete or clear old messages.
