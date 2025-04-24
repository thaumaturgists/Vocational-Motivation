import { useState } from 'react';
import './App.css';

// Import `debug` outside the component to prevent unnecessary re-imports
import("debug").then((debugModule) => {
  const debug = debugModule.default("quiz-app");
  debug("Debugging mode enabled!");
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count + 1)}>
          Count: {count}
        </button>
        <p>Edit <code>src/App.jsx</code> and save to test HMR.</p>
      </div>
    </div>
  );
}

export default App;