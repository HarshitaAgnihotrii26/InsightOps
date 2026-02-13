import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

const FullScreenToggle: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <button
      onClick={toggleFullScreen}
      className="fixed top-4 right-4 z-50 p-2.5 bg-white text-saffron-600 rounded-xl shadow-lg border border-saffron-200 hover:bg-saffron-50 transition-all duration-300 group"
      title={isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
    >
      {isFullScreen ? (
        <Minimize2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
      ) : (
        <Maximize2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
      )}
    </button>
  );
};

export default FullScreenToggle;