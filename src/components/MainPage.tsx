import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, Volume2, SkipForward } from 'lucide-react';

interface MainPageProps {
  onBack: () => void;
}

interface Theme {
  id: string;
  name: string;
  background: string;
  cardBg: string;
  accent: string;
  playerBg: string;
}

interface Photo {
  id: string;
  url: string;
  title: string;
  song: {
    title: string;
    artist: string;
    url: string;
    albumCover: string;
  };
  theme: Theme;
}

const themes: Theme[] = [
  {
    id: 'orange',
    name: 'Laranja',
    background: 'from-orange-400 via-amber-500 to-yellow-500',
    cardBg: 'bg-orange-100/10',
    accent: 'text-orange-200',
    playerBg: 'bg-orange-900/20'
  },
  {
    id: 'gray',
    name: 'Cinza',
    background: 'from-gray-400 via-slate-500 to-gray-600',
    cardBg: 'bg-gray-100/10',
    accent: 'text-gray-200',
    playerBg: 'bg-gray-900/20'
  },
  {
    id: 'brown',
    name: 'Marrom',
    background: 'from-amber-600 via-orange-700 to-red-800',
    cardBg: 'bg-amber-100/10',
    accent: 'text-amber-200',
    playerBg: 'bg-amber-900/20'
  },
  {
    id: 'red',
    name: 'Vermelho',
    background: 'from-red-500 via-rose-600 to-pink-700',
    cardBg: 'bg-red-100/10',
    accent: 'text-red-200',
    playerBg: 'bg-red-900/20'
  },
  {
    id: 'pink',
    name: 'Rosa',
    background: 'from-green-400 via-rose-500 to-purple-600',
    cardBg: 'bg-pink-100/10',
    accent: 'text-pink-200',
    playerBg: 'bg-pink-900/20'
  }
];

const photoSets: Photo[] = [
  {
    id: '1',
    url: '/photos/foto1.jpg',
    title: 'Melhor Dia',
    song: {
      title: 'Little Freak',
      artist: 'Harry Styles',
      url: '/songs/harry.m4a',
      albumCover: '/photos/covers/harry.png'
    },
    theme: themes[0] // Laranja
  },
  {
    id: '2',
    url: '/photos/foto-junina.jpg',
    title: 'Crescendo Juntos',
    song: {
      title: 'Look up at the stars',
      artist: 'Shawn Mendes',
      url: '/songs/shawn.m4a',
      albumCover: 'photos/covers/Wonder.png'
    },
    theme: themes[1] // Cinza
  },
  {
    id: '3',
    url: '/photos/foto3.jpg',
    title: 'Amor sempre nos momentos simples',
    song: {
      title: 'Angels Fly',
      artist: 'Louis Tomlinson',
      url: '/songs/louis.m4a',
      albumCover: '/photos/covers/louis.jpg'
    },
    theme: themes[2] // Marrom
  },
  {
    id: '4',
    url: '/photos/foto-top.jpg',
    title: 'Gravado pra sempre na nossa História',
    song: {
      title: 'Oldies Station',
      artist: 'Twenty One Pilots',
      url: '/songs/oldies.m4a',
      albumCover: '/photos/covers/clancy.jpg'
    },
    theme: themes[3] // Vermelho
  },
  {
    id: '5',
    url: '/photos/foto-atual.jpg',
    title: 'Always, My lov',
    song: {
      title: 'Zombie Lady',
      artist: 'Damiano David',
      url: '/songs/damiano.m4a',
      albumCover: '/photos/covers/damiano.jpg'
    },
    theme: themes[4] // Rosa
  }
];

const MainPage: React.FC<MainPageProps> = ({ onBack }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentPhotoSet = photoSets[currentPhoto];
  const theme = currentPhotoSet.theme;
  const song = currentPhotoSet.song;

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentPhoto]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextPhotoAndSong = () => {
    setCurrentPhoto((prev) => (prev + 1) % photoSets.length);
    setIsPlaying(true);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} relative overflow-hidden transition-all duration-1000`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
          
          <div className="text-white/80 text-sm">
            {currentPhoto + 1} / {photoSets.length}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-8">
        {/* Photo */}
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <img
              src={currentPhotoSet.url}
              alt={currentPhotoSet.title}
              className="w-80 h-80 md:w-96 md:h-96 object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              style={{
                boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.3)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
          </div>
          
          {/* Photo title */}
          <div className={`${theme.cardBg} backdrop-blur-md rounded-xl p-4 border border-white/20 inline-block mb-6`}>
            <h2 className="text-white text-xl font-semibold">{currentPhotoSet.title}</h2>
          </div>

          {/* Next Photo Button */}
          <button
            onClick={nextPhotoAndSong}
            className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center space-x-2 mx-auto"
          >
            <SkipForward className="w-5 h-5" />
            <span>Próxima Foto</span>
          </button>
        </div>

        {/* Spotify-style Music Player */}
        <div className={`${theme.playerBg} backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full max-w-md shadow-2xl`}>
          <div className="flex items-center space-x-4">
            {/* Album Cover */}
            <div className="flex-shrink-0">
              <img
                src={song.albumCover}
                alt={`${song.title} album cover`}
                className="w-16 h-16 rounded-lg shadow-lg object-cover"
              />
            </div>
            
            {/* Song Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-lg truncate">{song.title}</h3>
              <p className={`${theme.accent} text-sm truncate`}>{song.artist}</p>
            </div>
            
            {/* Controls */}
            <div className="flex items-center space-x-3">
              <button
                onClick={togglePlayPause}
                className="bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
              </button>
              
              <Volume2 className="w-5 h-5 text-white/60" />
            </div>
          </div>

          {/* Progress Bar (Visual only) */}
          <div className="mt-4">
            <div className="w-full bg-white/20 rounded-full h-1">
              <div 
                className="bg-white h-1 rounded-full transition-all duration-1000"
                style={{ width: isPlaying ? '60%' : '0%' }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-white/60 mt-1">
              <span>1:23</span>
              <span>3:45</span>
            </div>
          </div>

          <audio
            ref={audioRef}
            src={song.url}
            loop
            onEnded={() => setIsPlaying(false)}
          />
        </div>

        {/* Love Message */}
        <div className="text-center max-w-2xl">
          <p className="text-white text-lg md:text-xl font-light leading-relaxed">
            "3 anos juntos, e cada dia ao seu lado é uma nova razão para sorrir. 
            Você é meu presente mais precioso, minha companheira de aventuras, 
            e meu amor para sempre. ❤️"
          </p>
        </div>
      </div>

      {/* Floating hearts animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/20 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            ❤️
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;