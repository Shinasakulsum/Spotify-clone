import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebaar from './components/Sidebaar';
import Navbar from './components/Navbar';
import Player from './components/Player';
import Display from './components/Display';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { PlayerContext } from './context/PlayerContext';

function App() {
  const { audioRef, track, songData } = useContext(PlayerContext);

  useEffect(() => {
    if (track && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [track, audioRef]);

  return (
    <div className="h-screen bg-black">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route
          path="/"
          element={
            songData.length !== 0 ? (
              <>
                <Navbar />
                <div className="h-[95%] flex">
                  <Sidebaar />
                  <Display />
                </div>
                <Player />
                <audio ref={audioRef} src={track ? track.audioUrl : ""} preload="auto"></audio>
              </>
            ) : null
          }
        />
      </Routes>
    </div>
  );
}

export default App;
