import './App.css';                     // ✅ STEP 1: Import App.css once
import React from "react";
import VideoPlayer from "./VideoPlayer";

function App() {
  return (
    <div className="container">        {/* ✅ STEP 2: Wrap in container */}
      <VideoPlayer />
    </div>
  );
}

export default App;
