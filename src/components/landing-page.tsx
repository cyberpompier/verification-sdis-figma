import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export function LandingPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1; // Increment progress
      });
    }, 50); // Update every 50ms for 5 seconds (100 increments * 50ms = 5000ms)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800 text-white z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-6xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
          Bienvenue
        </h1>
        <p className="text-2xl font-light mb-8">
          Votre expérience commence ici
        </p>
      </motion.div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.05, ease: "linear" }}
        className="h-2 bg-white rounded-full w-64 mb-4"
        style={{ width: `${progress}%` }}
      />
      <Loader2 className="h-8 w-8 animate-spin text-white" />
    </div>
  );
}
