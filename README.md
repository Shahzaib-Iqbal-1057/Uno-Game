# 🎮 UNO Multiplayer Game

Welcome to the **UNO Multiplayer Game**, a real-time card game built using **React**, **TypeScript**, **Socket.io**, **Express**, and **MongoDB**. I built this game from the rules which I knew, so it can differ from the original version. Just try to match the color or number with the card on deck. If you use a skip card, or a plus card, it will skip the turn of the next person. The game can support multiple games simultaneously with 2-player, 3-player and 4-player options. 

Live Demo 👉 [Uno](https://uno-frontend-production.up.railway.app)  


## 🛠️ Tech Stack

| Component        | Technology            |
|------------------|-----------------------|
| **Frontend**     | React + TypeScript, Vite, Tailwind CSS|
| **Backend**      |Node.js + TypeScript, Express  |
| **Database**     | MongoDB |
| **Deployment**   | Railway|

## ⚙️ How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/uno-game.git
cd uno-game
```
### 2. Setup Backend
Move to backend directory and install all required dependencies.
```bash
cd backend
npm install
```

Create a .env file in /backend with the following:
```
MONG_URI
ORIGIN
PORT
```
The ORIGIN variable is the link to the frontend, if you don't define it, it will default to "http://localhost:5173". Similarly, the port variable defines the port at which the backend runs, if you don't define it, it will default to port 3001.

Run Backend Dev server
```
npm run dev
```

### 2. Setup Frontend
Move to frontend directory and install all required dependencies.
```bash
cd frontend
npm install
```

Create a .env file in /frontend with the following:
```
VITE_BACKEND_URL
```
The VITE_BACKEND_URL variable is the link to the backend, if you don't define it, it will default to 'http://localhost:3001'.
Run frontend server
```
npm run dev
```

This will start the game at localhost:5173, open is browser and check it out!
