import { motion } from 'framer-motion';
import StartButton from './startbutton';

interface PlayerSetupProps {
  playerName: string;
  setPlayerName: (name: string) => void;
  playerCount: number;
  setPlayerCount: (count: number) => void;
  onStartGame: () => void;
}

export default function PlayerSetup({
  playerName,
  setPlayerName,
  playerCount,
  setPlayerCount,
  onStartGame,
}: PlayerSetupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6 bg-uno-black bg-opacity-50 p-6 rounded-lg shadow-lg backdrop-blur-md"
    >
      <div className="space-y-2">
        <label
          htmlFor="playerName"
          className="block text-uno-white text-sm font-medium mb-1"
        >
          Your Name
        </label>
        <input
          type="text"
          id="playerName"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-3 py-2 bg-uno-white bg-opacity-20 text-uno-white border border-uno-white border-opacity-30 rounded-md placeholder-uno-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-uno-yellow"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-uno-white text-sm font-medium mb-1">
          Number of Players
        </label>
        <div className="flex justify-between items-center">
          {[2, 3, 4].map((count) => (
            <motion.button
              key={count}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPlayerCount(count)}
              className={`w-16 h-16 rounded-full text-2xl font-bold ${
                playerCount === count
                  ? 'bg-uno-yellow text-uno-black'
                  : 'bg-uno-white bg-opacity-20 text-uno-white'
              } transition-colors duration-200`}
            >
              {count}
            </motion.button>
          ))}
        </div>
      </div>
      <StartButton onClick={onStartGame} disabled={!playerName} />
    </motion.div>
  );
}
