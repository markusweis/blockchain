import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [chain, setChain] = useState({});

  useEffect(() => {
    fetch('/chain').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>The whole chain looks like this:</p>
        {for(var i in chain)}
      </header>
    </div>
  );
}

export default App;
