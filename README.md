# 🏌️‍♂️ Golf League Tracker
A full-stack web application for managing players, tracking golf rounds, calculating handicaps, and visualizing performance — all in one simple dashboard.

## 📌 Overview
Golf League Tracker is a complete CRUD-based system built with Node.js, Express, MongoDB, and EJS. The application allows golf league administrators or casual players to: 
- Manage player profiles
- Record and edit golf rounds
- Calculate handicap indexes automatically
- View statistics such as best score, average score, and total rounds
- Browse a clean, responsive homepage with a golf-course image carousel
- Enjoy an intuitive, mobile-friendly interface
- The system is lightweight, fast, and easy to deploy on any Node.js server

## 🚀 Features
### 👤 Player Management
- Add, edit, and delete players
- Store name and email
- View each player's complete history and stats

### 📝 Round Tracking
- Add rounds with: Score, Date, Course, Holes played (9 or 18), Course par, Notes
- Edit and delete rounds
- All rounds linked to a specific player

### 📊 Handicap & Stats
- Automatic handicap calculation
- Automatically computed metrics: Average score, Best score, Total rounds, Net score per round (color-coded for over/under par)

### 🖥 Responsive UI
- Custom styling with Bootstrap + custom CSS
- Navigation bar across all pages
- Clean card-based layout for readability
- Mobile-friendly tables and forms
- Homepage carousel with scenic golf images

## 🛠️ Tech Stack
**Front End:** EJS (HTML templating), CSS + Bootstrap 5, JavaScript, Fully responsive layout  
**Back End:** Node.js, Express.js, Method Override (PUT/DELETE support)  
**Database:** MongoDB Atlas or local MongoDB, Mongoose ORM

## ⚙️ Installation & Setup
1. Clone the repository: `git clone https://github.com/yourusername/golf-league-tracker.git && cd golf-league-tracker`  
2. Install dependencies: `npm install`  
3. Add environment variables in `.env`: `MONGO_URI=your_mongodb_connection_string` `PORT=3000`  
4. Run the server: `node app.js`  
Visit the app at: [http://localhost:3000](http://localhost:3000)

## 📐 Handicap Calculation (Simple Version)
- Handicap = Average Score – Average Course Par  
- Net score per round: Net = Score – Par  
- Color coding: Green → Under par (negative net), Red → Over par (positive net), “E” → Even

## 🧪 Optional Enhancements
- Authentication + login system
- Real golf handicap formula (USGA)
- League standings
- Export to CSV
- Graphs for player improvement

## 📄 License
This project is for educational use under CIS-435 at the University of Michigan–Dearborn. You may modify and expand it freely.

## 🙌 Acknowledgements
- Bootstrap 5 for UI components  
- MongoDB / Mongoose  
- Express.js  
- University of Michigan–Dearborn CIS-435 web development curriculum


