import HomePage from './components/Home';
import Username from './components/username';
import Wait from './components/wait';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {io} from "socket.io-client";
import "./index.css"
const socket = io('http://localhost:3001',{ transports: ["websocket"] });
socket.connect()

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path = "/" element = {<Username socket = {socket}/>}/>
          <Route path = "/wait" element = {<Wait socket = {socket}/>}/>
          <Route path="/homepage" element={<HomePage socket={socket} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
