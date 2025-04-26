import ReactDOM from 'react-dom/client'; // Note the change here
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement); // Ensure the element is not null
root.render(<App />);
