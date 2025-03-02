import { motion } from 'framer-motion';

interface PlayerFormProps {
  playerName: string;
  setPlayerName: (name: string) => void;
  playerCount: number;
  setPlayerCount: (count: number) => void;
}

function PlayerForm({
  playerName,
  setPlayerName,
  playerCount,
  setPlayerCount,
}: PlayerFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="player-form"
    >
      <div className="form-group">
        <label htmlFor="playerName" className="form-label">
          Your Name
        </label>
        <input
          type="text"
          id="playerName"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="form-input"
          placeholder="Enter your name"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Number of Players: {playerCount}</label>
        <div className="player-count-buttons">
          {[2, 3, 4].map((count) => (
            <motion.button
              key={count}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPlayerCount(count)}
              className={`player-count-button ${playerCount === count ? 'selected' : ''}`}
            >
              {count}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default PlayerForm;
