import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface HomePageProps {
  onEnter: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onEnter }) => {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [musicStarted, setMusicStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const startDate = new Date(2022, 7, 13); // 13 de agosto (mês é 0-indexado)
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

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        console.log("Usuário precisa interagir primeiro");
      });
    }
    setMusicStarted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-400 via-white-500 to-orange-600 flex flex-col items-center justify-center relative overflow-hidden text-center">
      {/* Música */}
      <audio ref={audioRef} src="/musica.m4a" loop />

      {/* Botão de play se a música não começou */}
      {!musicStarted && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <button
            onClick={startMusic}
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-100 transform hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            ▶️ Tocar Música
          </button>
        </div>
      )}

      {/* Efeitos de fundo */}
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

      {/* Foto */}
      <img
        src="/foto.jpeg"
        alt="Nossa foto"
        className="w-64 h-64 object-cover rounded-full shadow-2xl border-4 border-white mb-6 z-10"
      />

      {/* Coração */}
      <div className="mb-8 relative z-10">
        <Heart className="w-24 h-24 text-red-400 mx-auto animate-bounce drop-shadow-2xl" fill="currentColor" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-red-400/20 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Texto */}
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">3 Anos</h1>
      <p className="text-2xl md:text-3xl text-white/90 mb-8 font-light">Te amo, minha Bebeu❤️</p>

      {/* Contador */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 z-10">
        {Object.entries(timeElapsed).map(([key, value]) => (
          <div key={key} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="text-3xl font-bold text-white">{value}</div>
            <div className="text-white/80 text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
          </div>
        ))}
      </div>

      {/* Botão entrar */}
      <button
        onClick={() => {
          startMusic(); // também garante música ao entrar
          onEnter();
        }}
        className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-100 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
      >
        Entrar na Nossa História ✨
      </button>
    </div>
  );
};

export default HomePage;
