import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import CakeScene from './components/CakeScene';
import MessageCard from './components/MessageCard';
import { generateBirthdayWish } from './services/geminiService';

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Firework effect function
  const triggerFireworks = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  }, []);

  const handleGenerateWish = async () => {
    if (loading) return;
    setLoading(true);
    
    // Small delay to simulate "thinking" visually if API is too fast, 
    // and to start music context if we had audio (browser policy require user interaction)
    
    try {
      const wish = await generateBirthdayWish();
      setMessage(wish);
      triggerFireworks();
    } catch (e) {
      setMessage("Happy 29th Birthday, Lao Li! May your day be filled with joy and cake! 🎂");
      triggerFireworks();
    } finally {
      setLoading(false);
    }
  };

  // Trigger a small confetti burst on load
  useEffect(() => {
    const timer = setTimeout(() => {
       confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
       });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200">
      {/* 3D Background */}
      <CakeScene />

      {/* UI Overlay */}
      <MessageCard 
        message={message} 
        loading={loading} 
        onGenerate={handleGenerateWish} 
      />
    </div>
  );
};

export default App;