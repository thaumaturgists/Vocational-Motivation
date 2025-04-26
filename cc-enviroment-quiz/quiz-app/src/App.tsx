import React from 'react';
import ErrorBoundary from './ErrorBoundary'; // Import the ErrorBoundary

const BuggyComponent = () => {
  // This will throw an error when rendered
  throw new Error("I crashed!");
  return <div>This will not render</div>;
};

const App: React.FC = () => {
  return (
    <div>
      <header>
        <h1>Hello, and Welcome to the Quiz App using Vite with TypeScript and TSX!</h1>
      </header>
      <main>
        <p>This is a simple quiz application built with React and Vite.</p>
        <ErrorBoundary>
          <BuggyComponent /> {/* This component will throw an error */}
        </ErrorBoundary>
        {/* You can add more components or functionality here */}
      </main>
      <footer>
        <p>&copy; 2025 Quiz App</p>
      </footer>
    </div>
  );
};

export default App;