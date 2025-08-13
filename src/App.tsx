import React, { useState } from 'react';
import HomePage from './components/HomePage';
import MainPage from './components/MainPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'main'>('home');

  return (
    <div className="min-h-screen">
      {currentPage === 'home' ? (
        <HomePage onEnter={() => setCurrentPage('main')} />
      ) : (
        <MainPage onBack={() => setCurrentPage('home')} />
      )}
    </div>
  );
}

export default App;