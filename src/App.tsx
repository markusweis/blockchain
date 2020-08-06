import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [currtentTime, setCurrentTime] = useState({});

  useEffect(() => {
    fetch('/chain').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>The whole chain looks like this{currtentTime}:</p>
        {printHtml}
      </header>
    </div>
  );
}

function printHtml() {
  return (
    <p>
      Help
    </p>
  )
}

export default App;
