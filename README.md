# Expense Tracker Backend

## Project Overview
This project implements the backend for an Expense Tracker Website using Node.js with Express.js, MongoDB as the database, and Firebase Authentication for secure user management. It provides essential REST API endpoints for user authentication, expense management, and report generation. The backend has been tested via Postman and is designed for easy integration with frontend clients.

## Tech Stack
- Language: JavaScript (Node.js)
- Framework: Express.js
- Database: MongoDB with Mongoose ODM
- Authentication: Firebase Authentication (Email/Password)

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running locally or accessible remotely
- Firebase project with service account credentials

### Installation
1. Clone this repo:
git clone https://github.com/its-zuhaib/ExpenseTrackerBackend_Zuhaib
cd ExpenseTrackerBackend

2. Install dependencies:
npm install

3. Create a `.env` file in the root folder with the following:

PORT=5000
MONGODB_URI="mongodb://localhost:27017/koni_db"
FIREBASE_PROJECT_ID=zu-firebase
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-fbsvc@zu-firebase.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n<your_key>\n-----END PRIVATE KEY-----\n"
FIREBASE_WEB_API_KEY=<your_firebase_web_api_key>

text

## How to Run the Server

- To start the server:
npm start

- For development with auto-restart on changes:
npx nodemon

Server will run on `http://localhost:<PORT>`.

## Environment Variables

- `PORT`: Port to run your Express server (default 5000)
- `MONGODB_URI`: MongoDB connection string
- `FIREBASE_PROJECT_ID`: Firebase project ID
- `FIREBASE_CLIENT_EMAIL`: Firebase service account client email
- `FIREBASE_PRIVATE_KEY`: Firebase private key (newline escaped with `\n`)
- `FIREBASE_WEB_API_KEY`: Firebase Web API key for REST calls

## Example API Endpoints

### Expenses
- `GET /api/expenses`: Fetch all expenses for logged-in user
- `GET /api/expenses/:id`: Fetch single expense by ID
- `POST /api/expenses`: Add new expense  
{
"title": "Lunch",
"amount": 200,
"category": "Food",
"date": "2025-10-21"
}

text
- `PUT /api/expenses/:id`: Update expense by ID with any fields in request body
- `DELETE /api/expenses/:id`: Delete expense by ID

### Reports
- `GET /api/reports/monthly?month=10&year=2025`: Get monthly summary with category-wise totals
- `GET /api/reports/category?category=Food`: Get all expenses filtered by category

## Notes
- All endpoints require user authentication via Firebase ID token in headers.
- API is tested using Postman; ensure you include `Authorization: Bearer <token>` header.
- Date fields should be ISO formatted strings (YYYY-MM-DD).
