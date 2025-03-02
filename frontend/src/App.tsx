import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homepage';
import Game from './pages/game';
import './App.css';
import initializeSocket from './websocket';
const socket = initializeSocket();


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/game" element={<Game socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;
