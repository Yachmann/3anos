import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface HomePageProps {
  onEnter: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onEnter }) => {
  const [timeElapsed, setTimeElapsed] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Data de início do namoro - substitua pela data real
    const startDate = new Date('2022-08-13'); // Exemplo: 15 de janeiro de 2022
    
    const updateTime = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeElapsed({ days, hours, minutes, seconds });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            <Sparkles className="w-4 h-4 text-white/30" />
          </div>
        ))}
      </div>

      <div className="text-center z-10 max-w-2xl mx-auto px-6">
        {/* Animated heart */}
        <div className="mb-8 relative">
          <Heart 
            className="w-24 h-24 text-red-400 mx-auto animate-bounce drop-shadow-2xl" 
            fill="currentColor"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-red-400/20 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg animate-fade-in">
          3 Anos
        </h1>
        <p className="text-2xl md:text-3xl text-white/90 mb-8 font-light">
          Te amo, minha Bebeu❤️
        </p>

        {/* Time counter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="text-3xl font-bold text-white">{timeElapsed.days}</div>
            <div className="text-white/80 text-sm">Dias</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="text-3xl font-bold text-white">{timeElapsed.hours}</div>
            <div className="text-white/80 text-sm">Horas</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="text-3xl font-bold text-white">{timeElapsed.minutes}</div>
            <div className="text-white/80 text-sm">Minutos</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="text-3xl font-bold text-white">{timeElapsed.seconds}</div>
            <div className="text-white/80 text-sm">Segundos</div>
          </div>
        </div>

        {/* Enter button */}
        <button
          onClick={onEnter}
          className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-100 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
        >
          Entrar na Nossa História ✨
        </button>
      </div>
    </div>
  );
};

export default HomePage;