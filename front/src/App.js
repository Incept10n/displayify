import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [activeStream, setActiveStream] = useState('incept1on');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);

  const streams = {
    eclipse: {
      name: 'eclipse Stream',
      url: 'https://displayify.inceptech.ru:8889/live/eclipse_stream'
    },
    incept1on: {
      name: 'Incept1on Stream',
      url: 'https://displayify.inceptech.ru:8889/live/incept1on_stream'
    },
    viox: {
      name: 'Viox Stream',
      url: 'https://displayify.inceptech.ru:8889/live/viox_stream'
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  // Слушаем изменения полноэкранного режима
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const openInNewTab = () => {
    window.open(streams[activeStream].url, '_blank');
  };

  return (
    <div className={`App ${isFullscreen ? 'fullscreen-mode' : ''}`}>
      {!isFullscreen && (
        <header className="App-header">
          <h1>Displayify - Video Streaming</h1>
        </header>
      )}

      {!isFullscreen && (
        <div className="buttons-container">
          {Object.entries(streams).map(([key, stream]) => (
            <button
              key={key}
              className={`stream-button ${activeStream === key ? 'active' : ''}`}
              onClick={() => setActiveStream(key)}
            >
              {stream.name}
            </button>
          ))}
        </div>
      )}

      <div className={`iframe-container ${isFullscreen ? 'fullscreen' : ''}`}>
        <div className="video-controls">
          <div className="stream-title">
            {!isFullscreen && streams[activeStream].name}
          </div>
          <div className="control-buttons">
            <button 
              className="control-btn new-tab-btn"
              onClick={openInNewTab}
              title="Открыть в новой вкладке"
            >
              📺
            </button>
            <button 
              className="control-btn fullscreen-btn"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Выйти из полноэкранного режима" : "Полноэкранный режим"}
            >
              {isFullscreen ? '🗗' : '🗖'}
            </button>
          </div>
        </div>
        <iframe
          ref={iframeRef}
          src={streams[activeStream].url}
          title={streams[activeStream].name}
          className="stream-iframe"
          allow="camera; microphone; display-capture; autoplay; fullscreen"
        />
      </div>
    </div>
  );
}

export default App;