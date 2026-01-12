import { motion } from 'framer-motion';

interface StartButtonProps {
  onClick: () => void;
  disabled: boolean;
}

function StartButton({ onClick, disabled }: StartButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`start-button ${disabled ? 'disabled' : ''}`}
    >
      Create/Join Game Lobby
    </motion.button>
  );
}

export default StartButton;
