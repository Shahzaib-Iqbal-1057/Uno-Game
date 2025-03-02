import { motion } from 'framer-motion';

interface UnoCardProps {
  color: 'red' | 'blue' | 'green' | 'yellow';
  number: number;
}

export default function UnoCard({ color, number }: UnoCardProps) {
  const bgColor = `bg-uno-${color}`;

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      className={`w-20 h-32 ${bgColor} rounded-lg shadow-lg flex items-center justify-center`}
    >
      <span className="text-4xl font-bold text-uno-white">{number}</span>
    </motion.div>
  );
}
