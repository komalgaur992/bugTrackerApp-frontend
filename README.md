# Frontend - Bug Tracker

This is the frontend service for the Bug Tracker application. It is built using React, Vite, and TailwindCSS.

## 🚀 Features

- **Dashboard**: View and manage bugs with search and filter functionality.
- **Bug Reporting**: Submit bugs with title, description, severity, and status.
- **Responsive Design**: Minimal, professional UI that works on all devices.

## 🛠 Tech Stack

- **React** - UI library.
- **Vite** - Build tool.
- **TailwindCSS** - Styling.
- **Axios** - HTTP client.

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd BugTrackerApp/frontend
```

### 2. Install Dependencies
```bash
yarn install
```

### 3. Configure Environment Variables
Create a `.env` file and add the following:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start the Development Server
```bash
yarn dev
```
➡ Frontend will run on: [http://localhost:5173](http://localhost:5173)

## ☁️ Deployment

- **Hosting**: Vercel/Netlify.
- **Environment Variables**: Ensure `VITE_API_URL` is set to the backend API URL.

## 🤖 AI Usage Notes

- **Where**: For generating the frontend UI skeleton and integrating Axios.
- **Why**: To save time and ensure best practices.
- **What I learned**: How to structure a frontend with React and integrate it with a backend API.